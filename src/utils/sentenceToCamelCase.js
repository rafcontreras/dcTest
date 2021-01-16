const sentencetoCamelCase = string =>
  string
    .replace(/(?:^.|[A-Z]|\b.)/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, "");

export default sentencetoCamelCase;
