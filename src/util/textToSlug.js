function textToSlug(text = "") {
  let slug = "";

  slug = text
    .toLowerCase()
    .replace(/ & /g, "-n-")
    .replace(/&/g, "-n-")
    .replace(/\\/g, "-or-")
    .replace(/\//g, "-or-")
    .replace(/ /g, "-")
    .replace(/'/g, "");

  return slug.trim();
}

export default textToSlug;
