const axios = require("axios");

const resolvers = {
  recalls: async ({ limit = 5 }) => {
    const FDA_API_URL = "https://api.fda.gov/food/enforcement.json";
    const FDA_API_QUERY = `search=report_date:[20250101+TO+20250114]+AND+country.exact:"United+States"&limit=${limit}`;

    try {
      const response = await axios.get(`${FDA_API_URL}?${FDA_API_QUERY}`);
      return response.data.results;
    } catch (error) {
      throw new Error("Error fetching FDA data: " + error.message);
    }
  },
};

module.exports = resolvers;
