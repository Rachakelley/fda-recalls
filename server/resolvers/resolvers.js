const { ApolloError } = require("apollo-server");

const FDA_API_URL =
  process.env.FDA_API_URL || "https://api.fda.gov/food/enforcement.json";

/**
 * GraphQL resolvers for FDA recalls
 * @typedef {Object} Resolvers
 * @property {Object} Query - Query resolvers
 * @property {Function} Query.recalls - Fetches FDA recalls within a date range
 * @param {Object} args - Query arguments
 * @param {string} args.startDate - Start date for recall search (required)
 * @param {string} args.endDate - End date for recall search (required)
 * @param {number} [args.limit=10] - Maximum number of results to return
 * @throws {ApolloError} When startDate or endDate is missing
 * @throws {ApolloError} When API response format is invalid
 * @throws {ApolloError} When API request fails
 * @returns {Promise<Object>} Object containing total_results count and results array
 * @returns {number} returns.total_results - Total number of recalls found
 * @returns {Array} returns.results - Array of recall objects
 */
const resolvers = {
  Query: {
    recalls: async (_, { startDate, endDate, limit = 10 }) => {
      if (!startDate) {
        throw new ApolloError(
          "Missing required startDate parameter",
          "BAD_REQUEST"
        );
      }
      if (!endDate) {
        throw new ApolloError(
          "Missing required endDate parameter",
          "BAD_REQUEST"
        );
      }

      // Format the query properly with encoded parameters
      const searchQuery = encodeURIComponent(
        `report_date:[${startDate} TO ${endDate}] AND country:"United States"`
      );
      const FDA_API_QUERY = `search=${searchQuery}&limit=${limit}`;

      console.log("FDA API Request:", `${FDA_API_URL}?${FDA_API_QUERY}`);

      try {
        const response = await fetch(`${FDA_API_URL}?${FDA_API_QUERY}`);
        const data = await response.json();

        if (!data || !data.results) {
          throw new ApolloError("Invalid API response format", "API_ERROR");
        }

        return {
          total_results: data.meta.results.total || 0,
          results: data.results || [],
        };
      } catch (error) {
        console.error("FDA API Error:", error);
        throw new ApolloError(
          `Failed to fetch recalls: ${error.message}`,
          "API_ERROR",
          { originalError: error }
        );
      }
    },
  },
};

module.exports = resolvers;
