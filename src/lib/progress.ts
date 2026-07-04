function toDateStr(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calcStreak(
  existingStreak: { count: number; lastActivityDate: string } | null | undefined
) {
  const today = toDateStr(new Date());
  if (!existingStreak) return { count: 1, lastActivityDate: today };

  const d = new Date();
  d.setDate(d.getDate() - 1);
  const yesterday = toDateStr(d);
  if (existingStreak.lastActivityDate === today)
    return { count: existingStreak.count, lastActivityDate: today };
  if (existingStreak.lastActivityDate === yesterday)
    return { count: existingStreak.count + 1, lastActivityDate: today };
  return { count: 1, lastActivityDate: today };
}
