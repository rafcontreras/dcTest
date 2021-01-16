const camelToSentenceCase = key => {
  const firstUpperCase = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
  const replaced = firstUpperCase.replace(/([A-Z])/g, " $1");
  return replaced.trim();
};

export default camelToSentenceCase;
