import { promises as fs } from 'fs';
import { stateAbbreviations } from './constants.js';

export const getStatesFromDistribution = (distributionPattern) => {
	try {
		// console.log('Processing distribution:', distributionPattern);

		const states = new Set();

		if (!distributionPattern) {
			console.log('No distribution pattern provided');
			return [];
		}

		// console.log('Starting state extraction from:', distributionPattern);

		// Process distribution pattern
		Object.entries(stateAbbreviations).forEach(([abbr, fullName]) => {
			if (
				distributionPattern.includes(abbr) ||
				distributionPattern.includes(fullName)
			) {
				states.add(abbr);
				// console.log(`Added state: ${abbr}`);
			}
		});

		// Validate final states set
		const statesArray = Array.from(states);
		// console.log('Final states:', statesArray);

		if (statesArray.length === 0) {
			console.warn('No states found in distribution pattern');
		}

		// Verify each state is valid
		statesArray.forEach((state) => {
			if (!stateAbbreviations[state]) {
				console.error(`Invalid state found: ${state}`);
			}
		});

		return statesArray;
	} catch (error) {
		console.error('Error processing distribution:', error);
		return [];
	}
};

export const validateGeoFile = async (filePath) => {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		throw new Error(`GeoJSON file not found at: ${filePath}`);
	}
};

export const validateGeoData = (data) => {
	if (!data?.features?.length || !Array.isArray(data.features)) {
		throw new Error('Invalid GeoJSON: missing or invalid features array');
	}
	return true;
};

export const loadGeoJSON = async (filePath) => {
	const rawData = await fs.readFile(filePath, 'utf8');
	return JSON.parse(rawData);
};
