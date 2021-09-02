export const smoothenizename = (
  n,
  currentStorageBucket = "mallorar.appspot.com"
) => {
  let s = "";
  let extension = n
    .split(".")
    [n.split(".").length - 1].replace("?alt=media", "");
  s = n
    .replace(
      `https://firebasestorage.googleapis.com/v0/b/${currentStorageBucket}/o/`,
      ""
    )
    .replace("?alt=media", "")
    .replace(/-/g, " ");
  s = s.substring(0, s.indexOf("MI"));
  return s + "." + extension;
};
