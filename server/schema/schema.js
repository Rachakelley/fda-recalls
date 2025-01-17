const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Recall {
    product_description: String
    reason_for_recall: String
    recall_initiation_date: String
    recall_number: String
    status: String
    recalling_firm: String
    distribution_pattern: String
    classification: String
  }

  type RecallResponse {
    total_results: Int
    results: [Recall]
  }

  type Query {
    recalls(startDate: String, endDate: String, limit: Int): RecallResponse
  }
`);

module.exports = schema;
