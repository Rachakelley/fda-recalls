require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const schema = require("./schema/schema");
const resolvers = require("./resolvers/resolvers");

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const PORT = process.env.PORT || 5000;

async function startApolloServer() {
  const app = express();

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // CORS configuration
  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
    formatError: (error) => {
      console.error("GraphQL Error:", error);
      return error;
    },
    playground: {
      endpoint: "/graphql",
      settings: {
        "request.credentials": "include",
      },
    },
    introspection: true,
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: false, // Disable Apollo CORS - using Express CORS
    path: "/graphql",
  });

  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(`🚀 Playground available at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
