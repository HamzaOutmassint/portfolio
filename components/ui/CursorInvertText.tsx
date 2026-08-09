type CursorInvertTextProps = {
  children: string;
};

export function CursorInvertText({ children }: CursorInvertTextProps) {
  return (
    <span className="cursor-invert-text" data-cursor-invert>
      <span className="cursor-invert-text-base">{children}</span>
      <span className="cursor-invert-text-overlay" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
