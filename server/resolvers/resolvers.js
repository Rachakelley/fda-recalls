const { ApolloError } = require("apollo-server");

const FDA_API_URL =
  process.env.FDA_API_URL || "https://api.fda.gov/food/enforcement.json";
const US_STATE_BOUNDS_URL = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/us-state-boundaries/records?limit=56"

const formatCoordinates = (coordinates, type) => {
  if (!coordinates || !Array.isArray(coordinates)) {
    return null;
  }

  if (type === "MultiPolygon") {
    return coordinates;
  } else if (type === "Polygon") {
    return [coordinates];
  }

  return null;
};

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
    stateBounds: async () => {
      try {
        const response = await fetch(US_STATE_BOUNDS_URL);
        const data = await response.json();

        console.log('State Bounds API Request:', data.results);

        if (!data || !data.results) {
          throw new ApolloError("Invalid API response format", "API_ERROR");
        }

        return data.results.map(item => {
          return {
            state: item.basename,
            coordinates: () => {
              try {
                const geometry = item.st_asgeojson.geometry;
                if (!geometry || !geometry.coordinates) {
                  console.warn(`Missing coordinates data for state: ${item.basename}`);
                  return null;
                }
                return formatCoordinates(geometry.coordinates, geometry.type);
              } catch (error) {
                console.error(`Error formatting coordinates for state ${item.basename}:`, error);
                return null;
              }
            }
          };
        })
      } catch (error) {
        console.error("State Bounds API Error:", error);
        throw new ApolloError(
          "Failed to fetch state bounds data",
          "API_ERROR",
          { originalError: error }
        );
      }
    }
  }
};

module.exports = resolvers;
