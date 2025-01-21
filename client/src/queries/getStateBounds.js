import { gql } from "@apollo/client";

export const getStateBounds = gql`
  query GetStateBounds {
    stateBounds {
        state
        coordinates
    }
  }
`;
