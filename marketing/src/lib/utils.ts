export function cn(...parts: Array<string | false | null | undefined>) {
  const classes = parts.filter(Boolean).join(" ").split(/\s+/).filter(Boolean);
  // Dernière utility display gagne (évite inline-flex vs hidden sans tailwind-merge).
  const display = /^(hidden|block|inline|inline-block|flex|inline-flex|grid|contents|table.*)$/;
  let lastDisplay: string | null = null;
  const rest: string[] = [];
  for (const c of classes) {
    const base = c.includes(":") ? c.slice(c.lastIndexOf(":") + 1) : c;
    if (display.test(base) && !c.includes(":")) {
      lastDisplay = c;
    } else {
      rest.push(c);
    }
  }
  return [...rest, lastDisplay].filter(Boolean).join(" ");
}
