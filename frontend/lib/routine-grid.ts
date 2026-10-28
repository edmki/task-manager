export function getBorderClass(startTime: Date) {
  const minutes = startTime.getMinutes();

  if (minutes % 60 === 0) return "border-zinc-800";
  if (minutes % 30 === 0) return "border-zinc-900";
  return "border-transparent";
}
