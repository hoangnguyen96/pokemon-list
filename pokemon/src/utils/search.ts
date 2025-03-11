export const generateSearchQuery = (keywords: string[]): string => {
  if (keywords.length === 0) return "";

  const query = keywords.map((word) => `name:*${word}*`).join(" OR ");
  return `q=${encodeURIComponent(query)}`;
};
