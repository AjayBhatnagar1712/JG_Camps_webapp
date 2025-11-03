// lib/slugify.ts
export default function slugify(s: string) {
  const map: Record<string, string> = {
    "Jammu & Kashmir": "jammu-and-kashmir",
    "Leh & Ladakh": "leh-ladakh",
  };
  if (map[s]) return map[s];
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}
