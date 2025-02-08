import { buildSchema } from 'graphql';

const schema = buildSchema(`
  scalar JSON
  
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
    stateGroups: JSON
  }

  type Properties {
    name: String!
    density: Float!
  }

  # Base Geometry interface
  interface Geometry {
    type: String!
    coordinates: JSON!
  }

  # GeoJSON Feature
  type Feature {
    type: String!
    geometry: Geometry!
    properties: JSON
  }

  # GeoJSON FeatureCollection
  type FeatureCollection {
    type: String!
    features: [Feature!]!
  }

  # Polygon implementation
  type Polygon implements Geometry {
    type: String!
    coordinates: JSON!
  }

  # MultiPolygon implementation
  type MultiPolygon implements Geometry {
    type: String!
    coordinates: JSON!
  }

  type Query {
    recalls(startDate: String, endDate: String, limit: Int): RecallResponse
    stateBounds: FeatureCollection
  }
`);

export default schema;
