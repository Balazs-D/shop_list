export const truncateText = (text: string) => {
  if (text.length > 140) {
    return text.slice(0, 136) + "...";
  } else {
    return text;
  }
};
