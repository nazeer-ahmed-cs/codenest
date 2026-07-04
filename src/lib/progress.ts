export function calcStreak(
  existingStreak: { count: number; lastActivityDate: string } | null | undefined
) {
  const today = new Date().toISOString().slice(0, 10);
  if (!existingStreak) return { count: 1, lastActivityDate: today };

  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .slice(0, 10);
  if (existingStreak.lastActivityDate === today)
    return { count: existingStreak.count, lastActivityDate: today };
  if (existingStreak.lastActivityDate === yesterday)
    return { count: existingStreak.count + 1, lastActivityDate: today };
  return { count: 1, lastActivityDate: today };
}
