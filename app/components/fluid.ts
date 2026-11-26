// A fluid simulation that trails the pointer as coloured smoke.
// Ported from WebGL-Fluid-Simulation, Copyright (c) 2017 Pavel Dobryakov,
// MIT License: https://github.com/PavelDoGreat/WebGL-Fluid-Simulation

const config = {
  simResolution: 128,
  dyeResolution: 1440,
  densityDissipation: 0.5,
  velocityDissipation: 3,
  pressure: 0.1,
  pressureIterations: 20,
  curl: 3,
  splatRadius: 0.2,
  splatForce: 6000,
  colorUpdateSpeed: 10,
};
// The loop stops this long after the last pointer event, once the smoke has
// faded, and starts again on the next one.
const IDLE_MS = 10_000;

const vertexSource = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const header = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
`;

const sources = {
  clear: `${header}
    uniform sampler2D uTexture;
    uniform float value;
    void main () {
      gl_FragColor = value * texture2D(uTexture, vUv);
    }
  `,
  splat: `${header}
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;
    void main () {
      vec2 p = vUv - point.xy;
      p.x *= aspectRatio;
      vec3 splat = exp(-dot(p, p) / radius) * color;
      vec3 base = texture2D(uTarget, vUv).xyz;
      gl_FragColor = vec4(base + splat, 1.0);
    }
  `,
  advection: `${header}
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float dissipation;
    void main () {
      vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
      gl_FragColor = texture2D(uSource, coord) / (1.0 + dissipation * dt);
    }
  `,
  divergence: `${header}
    uniform sampler2D uVelocity;
    void main () {
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;
      vec2 C = texture2D(uVelocity, vUv).xy;
      if (vL.x < 0.0) { L = -C.x; }
      if (vR.x > 1.0) { R = -C.x; }
      if (vT.y > 1.0) { T = -C.y; }
      if (vB.y < 0.0) { B = -C.y; }
      gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
    }
  `,
  curl: `${header}
    uniform sampler2D uVelocity;
    void main () {
      float L = texture2D(uVelocity, vL).y;
      float R = texture2D(uVelocity, vR).y;
      float T = texture2D(uVelocity, vT).x;
      float B = texture2D(uVelocity, vB).x;
      gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
    }
  `,
  vorticity: `${header}
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;
    void main () {
      float L = texture2D(uCurl, vL).x;
      float R = texture2D(uCurl, vR).x;
      float T = texture2D(uCurl, vT).x;
      float B = texture2D(uCurl, vB).x;
      float C = texture2D(uCurl, vUv).x;
      vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
      force /= length(force) + 0.0001;
      force *= curl * C;
      force.y *= -1.0;
      vec2 velocity = texture2D(uVelocity, vUv).xy + force * dt;
      gl_FragColor = vec4(min(max(velocity, -1000.0), 1000.0), 0.0, 1.0);
    }
  `,
  pressure: `${header}
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      float divergence = texture2D(uDivergence, vUv).x;
      gl_FragColor = vec4((L + R + B + T - divergence) * 0.25, 0.0, 0.0, 1.0);
    }
  `,
  gradientSubtract: `${header}
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      vec2 velocity = texture2D(uVelocity, vUv).xy - vec2(R - L, T - B);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `,
  // Draws the dye, shaded as if it had depth. Alpha follows brightness so the
  // page shows through where there is no smoke.
  display: `${header}
    uniform sampler2D uTexture;
    uniform vec2 texelSize;
    void main () {
      vec3 c = texture2D(uTexture, vUv).rgb;
      float dx = length(texture2D(uTexture, vR).rgb) - length(texture2D(uTexture, vL).rgb);
      float dy = length(texture2D(uTexture, vT).rgb) - length(texture2D(uTexture, vB).rgb);
      vec3 n = normalize(vec3(dx, dy, length(texelSize)));
      c *= clamp(n.z + 0.7, 0.7, 1.0);
      gl_FragColor = vec4(c, max(c.r, max(c.g, c.b)));
    }
  `,
};

type Target = {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
};
type DoubleTarget = { read: Target; write: Target };
type Color = [number, number, number];

// A random fully saturated hue, dimmed so overlapping splats don't blow out.
function randomColor(): Color {
  const hue = Math.random() * 6;
  const rise = hue % 1;
  const [r, g, b] = [
    [1, rise, 0],
    [1 - rise, 1, 0],
    [0, 1, rise],
    [0, 1 - rise, 1],
    [rise, 0, 1],
    [1, 0, 1 - rise],
  ][Math.floor(hue)];
  return [r * 0.15, g * 0.15, b * 0.15];
}

// Returns a function that stops the simulation, or nothing if the browser
// can't run it.
export function createFluid(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
  });
  if (!gl || !gl.getExtension("EXT_color_buffer_float")) return;

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };
  const vertexShader = compile(gl.VERTEX_SHADER, vertexSource);
  const programs = Object.fromEntries(
    Object.entries(sources).map(([name, source]) => {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, source));
      gl.bindAttribLocation(program, 0, "aPosition");
      gl.linkProgram(program);
      return [name, program];
    }),
  ) as Record<keyof typeof sources, WebGLProgram>;

  let current: WebGLProgram;
  const bind = (name: keyof typeof sources) => {
    current = programs[name];
    gl.useProgram(current);
  };
  const location = (name: string) => gl.getUniformLocation(current, name);

  // One quad covers the whole target for every pass.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
    gl.STATIC_DRAW,
  );
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([0, 1, 2, 0, 2, 3]),
    gl.STATIC_DRAW,
  );
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  const blit = (target: Target | null) => {
    gl.viewport(
      0,
      0,
      target?.width ?? gl.drawingBufferWidth,
      target?.height ?? gl.drawingBufferHeight,
    );
    gl.bindFramebuffer(gl.FRAMEBUFFER, target?.fbo ?? null);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };
  const attach = (target: Target, unit: number) => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, target.texture);
    return unit;
  };
  const swap = (target: DoubleTarget) => {
    [target.read, target.write] = [target.write, target.read];
  };

  const createTarget = (
    width: number,
    height: number,
    internalFormat: number,
    format: number,
    filter: number,
  ): Target => {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      internalFormat,
      width,
      height,
      0,
      format,
      gl.HALF_FLOAT,
      null,
    );
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0,
    );
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { texture, fbo, width, height };
  };
  const createDouble = (...args: Parameters<typeof createTarget>) => ({
    read: createTarget(...args),
    write: createTarget(...args),
  });

  let dye: DoubleTarget;
  let velocity: DoubleTarget;
  let pressure: DoubleTarget;
  let divergence: Target;
  let curl: Target;
  let aspect = 1;

  // Sizes the canvas to the screen and, when that changes, starts the fluid
  // again at the new size. The short side gets the configured resolution.
  const resize = () => {
    const scale = Math.min(devicePixelRatio, 2);
    const width = Math.floor(canvas.clientWidth * scale);
    const height = Math.floor(canvas.clientHeight * scale);
    if (canvas.width === width && canvas.height === height) return;
    canvas.width = width;
    canvas.height = height;
    aspect = width / height;

    const size = (resolution: number): [number, number] => {
      const long = Math.round(resolution * Math.max(aspect, 1 / aspect));
      return aspect > 1 ? [long, resolution] : [resolution, long];
    };
    const sim = size(config.simResolution);
    gl.disable(gl.BLEND);
    dye = createDouble(
      ...size(config.dyeResolution),
      gl.RGBA16F,
      gl.RGBA,
      gl.LINEAR,
    );
    velocity = createDouble(...sim, gl.RG16F, gl.RG, gl.LINEAR);
    pressure = createDouble(...sim, gl.R16F, gl.RED, gl.NEAREST);
    divergence = createTarget(...sim, gl.R16F, gl.RED, gl.NEAREST);
    curl = createTarget(...sim, gl.R16F, gl.RED, gl.NEAREST);
  };

  // Pushes the fluid at a point and drops dye there.
  const splat = (
    x: number,
    y: number,
    dx: number,
    dy: number,
    color: Color,
  ) => {
    bind("splat");
    gl.uniform1i(location("uTarget"), attach(velocity.read, 0));
    gl.uniform1f(location("aspectRatio"), aspect);
    gl.uniform2f(location("point"), x, y);
    gl.uniform3f(location("color"), dx, dy, 0);
    gl.uniform1f(
      location("radius"),
      (config.splatRadius / 100) * Math.max(aspect, 1),
    );
    blit(velocity.write);
    swap(velocity);

    gl.uniform1i(location("uTarget"), attach(dye.read, 0));
    gl.uniform3f(location("color"), ...color);
    blit(dye.write);
    swap(dye);
  };

  const step = (dt: number) => {
    const texel = () =>
      gl.uniform2f(
        location("texelSize"),
        1 / velocity.read.width,
        1 / velocity.read.height,
      );
    gl.disable(gl.BLEND);

    bind("curl");
    texel();
    gl.uniform1i(location("uVelocity"), attach(velocity.read, 0));
    blit(curl);

    bind("vorticity");
    texel();
    gl.uniform1i(location("uVelocity"), attach(velocity.read, 0));
    gl.uniform1i(location("uCurl"), attach(curl, 1));
    gl.uniform1f(location("curl"), config.curl);
    gl.uniform1f(location("dt"), dt);
    blit(velocity.write);
    swap(velocity);

    bind("divergence");
    texel();
    gl.uniform1i(location("uVelocity"), attach(velocity.read, 0));
    blit(divergence);

    bind("clear");
    gl.uniform1i(location("uTexture"), attach(pressure.read, 0));
    gl.uniform1f(location("value"), config.pressure);
    blit(pressure.write);
    swap(pressure);

    bind("pressure");
    texel();
    gl.uniform1i(location("uDivergence"), attach(divergence, 0));
    for (let i = 0; i < config.pressureIterations; i++) {
      gl.uniform1i(location("uPressure"), attach(pressure.read, 1));
      blit(pressure.write);
      swap(pressure);
    }

    bind("gradientSubtract");
    texel();
    gl.uniform1i(location("uPressure"), attach(pressure.read, 0));
    gl.uniform1i(location("uVelocity"), attach(velocity.read, 1));
    blit(velocity.write);
    swap(velocity);

    bind("advection");
    texel();
    gl.uniform1f(location("dt"), dt);
    gl.uniform1i(location("uVelocity"), attach(velocity.read, 0));
    gl.uniform1i(location("uSource"), 0);
    gl.uniform1f(location("dissipation"), config.velocityDissipation);
    blit(velocity.write);
    swap(velocity);

    gl.uniform1i(location("uVelocity"), attach(velocity.read, 0));
    gl.uniform1i(location("uSource"), attach(dye.read, 1));
    gl.uniform1f(location("dissipation"), config.densityDissipation);
    blit(dye.write);
    swap(dye);
  };

  const render = () => {
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    bind("display");
    gl.uniform2f(location("texelSize"), 1 / canvas.width, 1 / canvas.height);
    gl.uniform1i(location("uTexture"), attach(dye.read, 0));
    blit(null);
  };

  const pointer = { x: 0, y: 0, dx: 0, dy: 0, moved: false, seen: false };
  let color = randomColor();
  let colorTimer = 0;
  let frame = 0;
  let last = 0;
  let lastInput = 0;

  const tick = (now: number) => {
    const dt = Math.min((now - last) / 1000, 1 / 60);
    last = now;
    resize();

    colorTimer += dt * config.colorUpdateSpeed;
    if (colorTimer >= 1) {
      colorTimer %= 1;
      color = randomColor();
    }
    if (pointer.moved) {
      pointer.moved = false;
      splat(
        pointer.x,
        pointer.y,
        pointer.dx * config.splatForce,
        pointer.dy * config.splatForce,
        color,
      );
    }
    step(dt);
    render();
    frame = now - lastInput > IDLE_MS ? 0 : requestAnimationFrame(tick);
  };
  const wake = () => {
    lastInput = performance.now();
    if (frame) return;
    last = lastInput;
    frame = requestAnimationFrame(tick);
  };

  const locate = (event: MouseEvent) => {
    pointer.x = event.clientX / canvas.clientWidth;
    pointer.y = 1 - event.clientY / canvas.clientHeight;
  };
  const onMove = (event: MouseEvent) => {
    const { x, y, seen } = pointer;
    locate(event);
    pointer.seen = true;
    // The first event only records where the pointer is.
    if (seen) {
      pointer.dx = (pointer.x - x) * Math.min(aspect, 1);
      pointer.dy = (pointer.y - y) / Math.max(aspect, 1);
      pointer.moved = pointer.dx !== 0 || pointer.dy !== 0;
    }
    wake();
  };
  // A click bursts a brighter puff in a random direction.
  const onDown = (event: MouseEvent) => {
    locate(event);
    pointer.seen = true;
    wake();
    const [r, g, b] = randomColor();
    splat(
      pointer.x,
      pointer.y,
      10 * (Math.random() - 0.5),
      30 * (Math.random() - 0.5),
      [r * 10, g * 10, b * 10],
    );
  };

  resize();
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mousedown", onDown);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mousedown", onDown);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };
}
