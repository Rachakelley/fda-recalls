import { gql } from '@apollo/client';

export const getStateBounds = gql`
	query GetStateBounds {
		stateBounds {
			type
			features {
				type
				properties
				geometry {
					type
					coordinates
				}
			}
		}
	}
`;
