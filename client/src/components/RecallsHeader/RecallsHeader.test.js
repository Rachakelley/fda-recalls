import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecallsHeader from './RecallsHeader';
import dayjs from 'dayjs';

const defaultProps = {
	loadingRecallData: false,
	limit: 10,
	totalResults: 20,
	startDate: dayjs('2025-01-01'),
	endDate: dayjs('2025-12-31'),
	isFilterTabExpanded: false,
	setIsFilterTabExpanded: jest.fn(),
};

describe('RecallsHeader', () => {
	const renderRecallsHeader = (props = {}) => {
		return render(
			<RecallsHeader
				{...defaultProps}
				{...props}
			/>
		);
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('RecallsHeader', () => {
		test('renders loading state when loadingRecallData is true', () => {
			renderRecallsHeader({ loadingRecallData: true });
			expect(screen.getByText('Loading results...')).toBeInTheDocument();
		});

		test('renders results count and date range when not loading', () => {
			renderRecallsHeader();
			expect(
				screen.getAllByText(
					(content, element) =>
						element.textContent ===
						'Showing 10 of 20 recalls from 01/01/2025 to 12/31/2025'
				)[0]
			).toBeInTheDocument();
		});

		test('displays correct count when limit exceeds totalResults', () => {
			renderRecallsHeader({ limit: 30, totalResults: 20 });
			expect(
				screen.getAllByText(
					(content, element) =>
						element.textContent ===
						'Showing 20 of 20 recalls from 01/01/2025 to 12/31/2025'
				)[0]
			).toBeInTheDocument();
		});

		test('renders filter icon', () => {
			renderRecallsHeader();
			expect(screen.getByTestId('FilterListIcon')).toBeInTheDocument();
		});

		test('toggles filter tab expansion on click', () => {
			renderRecallsHeader();
			const filterTab = screen
				.getByTestId('FilterListIcon')
				.closest('.map-filters-tab');

			fireEvent.click(filterTab);
			expect(defaultProps.setIsFilterTabExpanded).toHaveBeenCalledWith(true);
		});

		test('applies expanded class when isFilterTabExpanded is true', () => {
			renderRecallsHeader({ isFilterTabExpanded: true });
			expect(
				screen.getByTestId('FilterListIcon').closest('.map-filters-tab')
			).toHaveClass('expanded');
		});
	});
});
