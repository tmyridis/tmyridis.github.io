export default function Cursor({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`animate-blink ${className}`}>
      ▍
    </span>
  );
}
