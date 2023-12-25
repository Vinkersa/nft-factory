const textToWithDots = (
  text: string | undefined | null,
  letters: number = 4,
) => {
  if (!text) return "";
  if (text.length < letters * 2) return text;
  const start = text.slice(0, 4);
  const end = text.slice(text.length - 4, text.length);
  return start + "..." + end;
};

export default textToWithDots;
