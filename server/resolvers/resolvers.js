import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloError } from 'apollo-server';
import { promises as fs } from 'fs';
import GraphQLJSON from 'graphql-type-json';
import {
	getStatesFromDistribution,
	loadGeoJSON,
	validateGeoData,
	validateGeoFile,
} from './helpers.js';
import { FDA_API_URL } from './constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolvers = {
	JSON: GraphQLJSON,

	Feature: {
		type: (parent) => parent.type,
		properties: (parent) => parent.properties,
		geometry: (parent) => parent.geometry,
	},

	Geometry: {
		__resolveType(geometry) {
			if (geometry.type === 'Polygon') return 'Polygon';
			if (geometry.type === 'MultiPolygon') return 'MultiPolygon';
			return null;
		},
	},
	Query: {
		recalls: async (_, { startDate, endDate, limit = 10 }) => {
			if (!startDate || !endDate) {
				throw new ApolloError(
					'Missing required date parameters',
					'BAD_REQUEST'
				);
			}

			// Format the query properly with encoded parameters
			const searchQuery = encodeURIComponent(
				`report_date:[${startDate} TO ${endDate}] AND country:"United States"`
			);
			const FDA_API_QUERY = `search=${searchQuery}&limit=${limit}`;

			// console.log('FDA API Request:', `${FDA_API_URL}?${FDA_API_QUERY}`);

			try {
				const response = await fetch(`${FDA_API_URL}?${FDA_API_QUERY}`);
				const data = await response.json();

				if (!data.results) {
					throw new ApolloError('No results found', 'NOT_FOUND');
				}

				const results = data?.results || [];

				// console.log(`Fetched ${results.length} recalls with limit ${limit}`);

				const stateGroups = results.reduce((acc, recall) => {
					try {
						const states = getStatesFromDistribution(
							recall.distribution_pattern
						);
						// console.log(`Processing recall states:`, states);

						states?.forEach((state) => {
							if (!acc[state]) {
								acc[state] = {
									'Class I': [],
									'Class II': [],
									'Class III': [],
								};
							}
							if (!acc[state][recall.classification]) {
								acc[state][recall.classification] = [];
							}
							acc[state][recall.classification].push(recall);
						});
						return acc;
					} catch (error) {
						console.error('Error processing recall:', error);
						return acc;
					}
				}, {});

				// console.log('Processing recall states:', stateGroups);

				// Alphabetize the stateGroups with proper locale sorting
				const sortedStateGroups = Object.fromEntries(
					Object.entries(stateGroups).sort(([a], [b]) =>
						a.localeCompare(b, 'en-US', { sensitivity: 'base' })
					)
				);

				return {
					total_results: data.meta?.results?.total || 0,
					results: data.results || [],
					stateGroups: sortedStateGroups,
				};
			} catch (error) {
				throw new ApolloError('Failed to fetch FDA recall data', 'API_ERROR');
			}
		},
		stateBounds: async () => {
			try {
				const dataPath = path.join(
					__dirname,
					'../data/georef-united-states-of-america-state.json'
				);

				await validateGeoFile(dataPath);
				const geoData = await loadGeoJSON(dataPath);
				validateGeoData(geoData);

				return {
					type: 'FeatureCollection',
					features: geoData.features.map((feature) => ({
						type: feature.type,
						properties: feature.properties,
						geometry: {
							type: feature.geometry.type,
							coordinates: feature.geometry.coordinates,
						},
					})),
				};
			} catch (error) {
				console.error('Error processing state bounds:', error);
				throw error;
			}
		},
	},
};

export default resolvers;
