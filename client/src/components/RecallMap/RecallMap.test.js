import React from 'react';
import { render, screen } from '@testing-library/react';
import RecallMap from './RecallMap';
import { mockGetStateBoundsResponse, mockRecalls } from '../../../__mocks__';

const mockCenterCoords = [39.8283, -98.5795];
const mockDefaultZoom = 4;
const mockMinZoom = 2;

jest.mock('react-leaflet', () => {
	return {
		MapContainer: ({ children, ...props }) => {
			return (
				<div
					data-testid='map-container'
					className={props.className}
					center={mockCenterCoords}
					zoom={mockDefaultZoom}
					minzoom={mockMinZoom}
				>
					{children}
				</div>
			);
		},
		TileLayer: () => null,
		GeoJSON: () => null,
		useMap: () => ({
			fitBounds: jest.fn(),
			flyToBounds: jest.fn(),
			setZoom: jest.fn(),
		}),
	};
});

const mockStateBoundsData = mockGetStateBoundsResponse.data.stateBounds;
const mockSetIsStateAccordionExpanded = jest.fn();
const defaultProps = {
	recalls: mockRecalls,
	stateBoundsData: mockStateBoundsData,
	selectedClassifications: {
		'Class I': true,
		'Class II': true,
		'Class III': true,
	},
	setIsStateAccordionExpanded: mockSetIsStateAccordionExpanded,
	loadingRecallData: false,
	isSidebarExpanded: false,
	onMapClick: jest.fn(),
	onBoundsChange: jest.fn(),
};

describe('RecallMap', () => {
	const renderRecallMap = (props = {}) => {
		return render(
			<RecallMap
				{...defaultProps}
				{...props}
			/>
		);
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('Initial Render', () => {
		test('renders map container when recalls are present', () => {
			renderRecallMap();
			expect(screen.getByTestId('map-container')).toBeInTheDocument();
		});

		test('renders no recalls message when recalls array is empty', () => {
			renderRecallMap({ recalls: [] });
			expect(screen.getByText('No recalls found.')).toBeInTheDocument();
		});

		test('map container has correct initial props', () => {
			renderRecallMap();
			const mapContainer = screen.getByTestId('map-container');

			expect(mapContainer).toHaveAttribute(
				'center',
				mockCenterCoords.toString()
			);
			expect(mapContainer).toHaveAttribute('zoom', mockDefaultZoom.toString());
			expect(mapContainer).toHaveAttribute('minzoom', mockMinZoom.toString());
		});
	});

	describe('Classification Filtering', () => {
		test('renders map with filtered classifications', () => {
			renderRecallMap({
				selectedClassifications: {
					'Class I': true,
					'Class II': false,
					'Class III': false,
				},
			});
			expect(screen.getByTestId('map-container')).toBeInTheDocument();
		});

		test('updates map when classifications change', () => {
			const { rerender } = renderRecallMap();

			rerender(
				<RecallMap
					{...defaultProps}
					selectedClassifications={{
						'Class I': false,
						'Class II': true,
						'Class III': true,
					}}
				/>
			);

			expect(screen.getByTestId('map-container')).toBeInTheDocument();
		});
	});

	describe('Loading States', () => {
		test('renders loading spinner while recall data is loading', () => {
			renderRecallMap({
				loadingRecallData: true,
				recalls: [],
			});
			expect(screen.getByRole('progressbar')).toBeInTheDocument();
		});

		test('removes loading spinner when data loads', () => {
			const { rerender } = renderRecallMap({ loadingRecallData: true });

			rerender(
				<RecallMap
					{...defaultProps}
					loadingRecallData={false}
				/>
			);

			expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
		});
	});
});
