const parseStates = (distribution) => {
  if (!distribution) return [];
  const statePattern = /\b([A-Z]{2})\b/g;
  return distribution.match(statePattern) || [];
};

export default parseStates;
