import parseStates from "./parseStates";

const groupRecallsByStateAndClassification = (recalls) => {
  const groups = {};
  recalls?.forEach((recall) => {
    const states = parseStates(recall.distribution_pattern);
    states.forEach((state) => {
      if (!groups[state]) {
        groups[state] = {
          "Class I": [],
          "Class II": [],
          "Class III": [],
        };
      }
      groups[state][recall.classification].push(recall);
    });
  });
  return groups;
};

export default groupRecallsByStateAndClassification;
