const textToWithDots = (
  text: string | undefined | null,
  letters: number = 6,
) => {
  if (!text) return "";
  if (text.length < letters * 2) return text;
  const start = text.slice(0, letters);
  const end = text.slice(text.length - letters, text.length);
  return start + "..." + end;
};

export default textToWithDots;
