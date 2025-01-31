export const getInitials = (name?: string) => {
  if (!name) {
    return "";
  }
  return name
    .split(" ")
    .map((na) => na[0])
    .join("");
};
