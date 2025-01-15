export const getClassificationColor = (classification) => {
  switch (classification) {
    case 'Class I':
      return '#FFD700'; // yellow
    case 'Class II':
      return '#FFA500'; // orange
    default:
      return '#FF0000'; // red for Class III and higher
  }
};
