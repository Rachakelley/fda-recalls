import React from 'react';
import { render, screen } from '@testing-library/react';
import MapContent from './MapContent';
import { mockGetStateBoundsResponse, mockRecalls } from '../../../__mocks__';

jest.mock('react-leaflet', () => ({
	TileLayer: () => null,
	GeoJSON: ({ children }) => <div data-testid='geojson'>{children}</div>,
	Marker: ({ children }) => <div data-testid='map-marker'>{children}</div>,
	useMap: () => ({ flyToBounds: jest.fn() }),
}));
const mockStateBoundsData = mockGetStateBoundsResponse.data.stateBounds;

describe('MapContent', () => {
	const mockSetIsStateAccordionExpanded = jest.fn();

	const renderMapContent = (props = {}) => {
		const defaultProps = {
			recalls: mockRecalls,
			stateBoundsData: mockStateBoundsData,
			selectedClassifications: {
				'Class I': true,
				'Class II': true,
				'Class III': true,
			},
			setIsStateAccordionExpanded: mockSetIsStateAccordionExpanded,
			isSidebarExpanded: false,
		};

		return render(
			<MapContent
				{...defaultProps}
				{...props}
			/>
		);
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders GeoJSON when stateBoundsData is provided', () => {
		renderMapContent();
		expect(screen.getByTestId('geojson')).toBeInTheDocument();
	});
});
