import { gql } from "@apollo/client";

export const getRecalls = gql`
  query GetRecalls($startDate: String!, $endDate: String!, $limit: Int) {
    recalls(startDate: $startDate, endDate: $endDate, limit: $limit) {
      total_results
      results {
        classification
        distribution_pattern
        recalling_firm
        product_description
        reason_for_recall
        recall_initiation_date
        recall_number
        status
      }
    }
  }
`;
