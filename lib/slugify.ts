// lib/slugify.ts
export default function slugify(s: string) {
  return s
    .toLowerCase()
    // convert "&" or " & " to nothing (we'll drop 'and' to keep slugs compact)
    .replace(/\b&\b/g, "")
    .replace(/\band\b/g, "")
    // remove remaining punctuation except spaces and hyphens
    .replace(/[^\w\s-]/g, "")
    .trim()
    // collapse multiple spaces to single
    .replace(/\s+/g, "-")
    // collapse multiple hyphens to single
    .replace(/-+/g, "-");
}
