import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import compression from 'compression';
import schema from './schema/schema.js';
import resolvers from './resolvers/resolvers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
const PORT = process.env.PORT || 8000;

async function startApolloServer() {
	const app = express();

	const clientDistPath = path.resolve(__dirname, '../client/dist');

	// Request logging middleware
	app.use((req, res, next) => {
		console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
		next();
	});

	// CORS configuration
	app.use(
		cors({
			origin:
				process.env.NODE_ENV === 'production'
					? process.env.VERCEL_URL
					: CORS_ORIGIN,
			credentials: true,
			methods: ['GET', 'POST', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization'],
		})
	);

	// Add response compression
	app.use(compression());

	// Add caching headers middleware
	app.use((req, res, next) => {
		if (req.method === 'GET') {
			res.set('Cache-Control', 'public, max-age=300'); // 5 minute cache
		}
		next();
	});

	const server = new ApolloServer({
		typeDefs: schema,
		resolvers,
		cache: 'bounded',
		context: ({ req, res }) => ({ req, res }),
		formatError: (error) => {
			console.error('GraphQL Error:', error);
			return error;
		},
		introspection: process.env.NODE_ENV !== 'production',
		playground:
			process.env.NODE_ENV !== 'production'
				? {
						endpoint: '/api/graphql',
						settings: {
							'request.credentials': 'include',
						},
				  }
				: false,
	});

	await server.start();

	server.applyMiddleware({
		app,
		cors: false,
		path: '/api/graphql',
	});

	// Serve static files after API routes
	app.use(express.static(clientDistPath));
	app.get('*', (req, res) => {
		res.sendFile(path.join(clientDistPath, 'index.html'));
	});

	// For local development
	if (process.env.NODE_ENV !== 'production') {
		server.listen().then(({ url }) => {
			console.log(`🚀 Server ready at ${url}`);
		});
	}

	return app;
}

const server = await startApolloServer().catch((error) => {
	console.error('Failed to start server:', error);
	process.exit(1);
});

export default server;
