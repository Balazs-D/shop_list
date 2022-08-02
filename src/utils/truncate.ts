export const truncateText = (text: string): string => {
  if (text.length > 140) {
    return text.slice(0, 136) + "...";
  } else {
    return text;
  }
};
