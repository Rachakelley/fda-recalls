const groupRecallsByState = (recalls) => {
	const groupedByState = {};
	recalls.forEach((recall) => {
		const state = recall.state;
		const classification = recall.classification;

		if (!groupedByState[state]) {
			groupedByState[state] = {};
		}
		if (!groupedByState[state][classification]) {
			groupedByState[state][classification] = [];
		}
		groupedByState[state][classification].push(recall);
	});

	return groupedByState;
};

export default groupRecallsByState;
