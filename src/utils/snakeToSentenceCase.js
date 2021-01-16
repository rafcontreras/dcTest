const snakeToSentenceCase = key =>
  key
    .split("_")
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ")
    .trim();

export default snakeToSentenceCase;
