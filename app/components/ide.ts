import {
  CanvasTexture,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  SRGBColorSpace,
} from "three";

// What he types. A \b is a backspace, so a typo gets typed and then fixed.
const FILES = [
  {
    name: "frontend.tsx",
    language: "TypeScript JSX",
    code: `// intuitive interfaces
export function Reports() {
  const { data } = useQeu\b\buery(reportsQuery);

  return (
    <Layout title="Reports">
      <Filters onChange={setFilters} />
      <DataTabel\b\ble rows={data.rows} />
    </Layout>
  );
}`,
  },
  {
    name: "backend.ts",
    language: "TypeScript",
    code: `// robust services
app.get("/reports", async (request) => {
  const filters = schema.pra\b\barse(request.query);
  const rows = awiat\b\b\bait db
    .select()
    .from(reports)
    .where(matching(filters));

  return { rows };
});`,
  },
];

type Editor = { file: number; lines: string[] };

// One step per keystroke, forever: type a file out, read it over, delete it
// line by line from the bottom and move on to the next file.
function* keystrokes(editor: Editor) {
  for (;;) {
    for (const line of FILES[editor.file].code.split("\n")) {
      const text = line.trimStart();
      // The editor indents a new line by itself.
      editor.lines.push(line.slice(0, line.length - text.length));
      yield;
      for (const key of text) {
        const last = editor.lines.length - 1;
        editor.lines[last] =
          key === "\b"
            ? editor.lines[last].slice(0, -1)
            : editor.lines[last] + key;
        yield;
      }
    }
    for (let pause = 0; pause < 20; pause++) yield;
    while (editor.lines.length) {
      editor.lines.pop();
      yield;
      yield;
    }
    editor.file = (editor.file + 1) % FILES.length;
  }
}

const WIDTH = 1200;
const HEIGHT = 1040;
const INK = "#ecebf5";
const MUTED = "#a3a1b8";
const VIOLET = "#a78bfa";
const PINK = "#ff7ad9";
// The window is glass: the page shows through all of it.
const GLASS = "rgb(167 139 250 / 0.06)";
// Comment, string, keyword, then a component or a function being called.
const TOKEN =
  /(\/\/.*)|("[^"]*"?)|\b(export|function|const|return|async|await)\b|([A-Z]\w*|\w+(?=\())/g;
const TOKEN_COLORS = ["#77758f", PINK, VIOLET, "#c8bfff"];

function draw(context: CanvasRenderingContext2D, font: string, editor: Editor) {
  const file = FILES[editor.file];
  const [left, top, width, height] = [16, 16, WIDTH - 32, HEIGHT - 32];
  const right = left + width;
  const bottom = top + height;
  const text = (
    value: string,
    x: number,
    y: number,
    color: string,
    size = 18,
    align: CanvasTextAlign = "left",
  ) => {
    context.font = `${size}px ${font}`;
    context.fillStyle = color;
    context.textAlign = align;
    context.fillText(value, x, y);
  };
  const fill = (
    color: string,
    x: number,
    y: number,
    w: number,
    h: number,
    radius = 0,
  ) => {
    context.fillStyle = color;
    context.beginPath();
    context.roundRect(x, y, w, h, radius);
    context.fill();
  };

  context.clearRect(0, 0, WIDTH, HEIGHT);
  context.textBaseline = "middle";
  context.save();

  // The pane, with a glowing edge and everything else clipped to it.
  fill(GLASS, left, top, width, height, 16);
  context.shadowColor = VIOLET;
  context.shadowBlur = 14;
  context.strokeStyle = "rgb(167 139 250 / 0.7)";
  context.lineWidth = 2;
  context.stroke();
  context.shadowBlur = 0;
  context.clip();

  // Title bar.
  fill(GLASS, left, top, width, 44);
  [PINK, VIOLET, MUTED].forEach((color, i) =>
    fill(color, left + 18 + i * 24, top + 15, 14, 14, 7),
  );
  text(`${file.name} — portfolio`, WIDTH / 2, top + 23, MUTED, 18, "center");

  // Activity bar.
  fill(GLASS, left, top + 44, 52, height - 78);
  for (let i = 0; i < 4; i++) {
    fill(i ? "#4a4868" : VIOLET, left + 15, top + 62 + i * 42, 22, 22, 5);
  }

  // Tabs.
  fill(GLASS, left + 52, top + 44, width - 52, 44);
  let tab = left + 52;
  FILES.forEach(({ name }, i) => {
    context.font = `19px ${font}`;
    const tabWidth = context.measureText(name).width + 40;
    if (i === editor.file) {
      fill("rgb(167 139 250 / 0.14)", tab, top + 44, tabWidth, 44);
      fill(VIOLET, tab, top + 44, tabWidth, 3);
    }
    text(name, tab + 20, top + 67, i === editor.file ? INK : MUTED, 19);
    tab += tabWidth;
  });

  // Code, with the cursor at the end of the last line.
  context.font = `26px ${font}`;
  const column = context.measureText("M").width;
  const code = left + 52 + 64;
  const last = editor.lines.length - 1;
  editor.lines.forEach((line, n) => {
    const y = top + 88 + 12 + (n + 0.5) * 40;
    if (n === last) fill(GLASS, left + 52, y - 20, width, 40);
    text(`${n + 1}`, code - 22, y, n === last ? INK : "#5d5b78", 20, "right");
    text(line, code, y, INK, 26);
    for (const match of line.matchAll(TOKEN)) {
      const color = TOKEN_COLORS[match.slice(1).findIndex(Boolean)];
      text(match[0], code + match.index * column, y, color, 26);
    }
    if (n === last)
      fill(VIOLET, code + line.length * column + 1, y - 15, 3, 30);
  });

  // Status bar.
  fill("rgb(124 58 237 / 0.55)", left, bottom - 34, width, 34);
  text("main", left + 18, bottom - 16, INK);
  text(
    `Ln ${Math.max(last, 0) + 1}, Col ${(editor.lines[last] ?? "").length + 1}    ${file.language}`,
    right - 18,
    bottom - 16,
    INK,
    18,
    "right",
  );

  context.restore();
}

// His screen as a glass pane: a code editor standing behind the whole desk,
// facing the camera, with him and the furniture in front of it. It starts
// invisible; fade its material in to show it. Once it is fully shown it types
// whenever `update` is told he is typing.
export function buildIde(font: string) {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext("2d")!;
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;

  const editor: Editor = { file: 0, lines: [] };
  const typist = keystrokes(editor);
  draw(context, font, editor);

  const screen = new Mesh(
    // Anchored at its bottom edge, so it can unfold upwards.
    new PlaneGeometry(7.6, 6.6).translate(0, 3.3, 0),
    new MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  // Behind the chair as the camera sees it, and turned by the angle the
  // camera ends up at (see the About -> What I do timeline).
  screen.position.set(-2.17, -1.3, -1.28);
  screen.rotation.y = 0.92;
  // Drawn before the rest of the transparent things, all of them nearer.
  screen.renderOrder = -1;

  let lastKey = 0;
  const update = (time: number, typing: boolean) => {
    const shown = screen.material.opacity === 1;
    if (!typing || !shown || time - lastKey < 0.07) return;
    lastKey = time;
    typist.next();
    draw(context, font, editor);
    texture.needsUpdate = true;
  };

  return { screen, update };
}
