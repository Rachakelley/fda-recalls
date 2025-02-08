import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:8000/graphql',
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					stateBounds: {
						// Keep state bounds cached
						maxAge: Infinity,
					},
					recalls: {
						keyArgs: ['startDate', 'endDate', 'limit'],
						merge(existing, incoming) {
							return incoming;
						},
					},
				},
			},
			Recall: {
				keyFields: ['recall_number'],
			},
		},
	}),
	defaultOptions: {
		watchQuery: {
			// Use cache-and-network to show cached data while fetching
			fetchPolicy: 'cache-and-network',
			// Keep using cached data after update
			nextFetchPolicy: 'cache-first',
		},
		query: {
			// For stateBounds specifically
			fetchPolicy: 'cache-first',
			// Optional: Refresh cache in background
			nextFetchPolicy: 'cache-and-network',
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
