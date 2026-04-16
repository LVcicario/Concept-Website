interface TypewriterProps {
  text: string;
  displayed: string;
  isTyping: boolean;
  prefix?: string;
  className?: string;
}

export function Typewriter({
  displayed,
  isTyping,
  prefix = ">",
  className = "",
}: TypewriterProps) {
  return (
    <div className={`font-mono ${className}`}>
      <span className="text-terminal-green">{prefix}</span>{" "}
      <span className="text-terminal-text">{displayed}</span>
      {isTyping && (
        <span className="inline-block w-2 h-4 ml-0.5 bg-terminal-green animate-pulse" />
      )}
    </div>
  );
}
