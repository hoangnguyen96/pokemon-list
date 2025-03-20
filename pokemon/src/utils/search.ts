export const generateSearchQuery = (keywords: string[]): string => {
  if (keywords.length === 0 || undefined) return "";

  const query = keywords.map((word) => `name:*${word}*`).join(" OR ");
  return `q=${encodeURIComponent(query)}&`;
};
