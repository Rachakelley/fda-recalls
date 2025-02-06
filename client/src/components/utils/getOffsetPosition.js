export const getOffsetPosition = (baseCoords, index, total) => {
	const lat = Array.isArray(baseCoords) ? baseCoords[0] : baseCoords.lat;
	const lng = Array.isArray(baseCoords) ? baseCoords[1] : baseCoords.lng;

	if (total === 1) return [lat, lng];

	const radius = 0.25;
	// Calculate angle based on index and total classifications
	const angle = (2 * Math.PI * index) / total;

	return [lat + radius * Math.cos(angle), lng + radius * Math.sin(angle)];
};
