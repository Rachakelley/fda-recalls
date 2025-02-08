import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MapFilters from './MapFilters';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

describe('MapFilters', () => {
	const mockDebouncedLimitUpdate = jest.fn();
	const mockDebouncedDateUpdate = jest.fn();
	const mockSetSelectedClassifications = jest.fn();
	const mockSetEndDate = jest.fn();

	const renderMapFilters = (props = {}) => {
		const defaultProps = {
			limit: 10,
			debouncedLimitUpdate: mockDebouncedLimitUpdate,
			startDate: null,
			endDate: null,
			debouncedDateUpdate: mockDebouncedDateUpdate,
			selectedClassifications: [],
			setSelectedClassifications: mockSetSelectedClassifications,
			setEndDate: mockSetEndDate,
		};

		return render(
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<MapFilters
					{...defaultProps}
					{...props}
				/>
			</LocalizationProvider>
		);
	};

	beforeEach(() => {
		cleanup();
		jest.clearAllMocks();
	});

	test('renders Filters title', () => {
		renderMapFilters();
		expect(screen.getByText('Filters')).toBeInTheDocument();
	});

	test('renders LimitSelector component', () => {
		renderMapFilters();
		expect(screen.getByLabelText(/results/i)).toBeInTheDocument();
	});

	test('renders DateRangePicker component', () => {
		renderMapFilters();
		expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
	});

	test('renders ClassificationFilter component', () => {
		renderMapFilters();

		const legendWrapper = document.querySelector('.legend-wrapper');
		expect(legendWrapper).toBeInTheDocument();
	});

	test('calls debouncedDateUpdate when start date changes', async () => {
		renderMapFilters();
		const startDatePicker = screen.getByLabelText(/start date/i);
		await userEvent.click(startDatePicker);
		await userEvent.type(startDatePicker, '01012025');
		await userEvent.keyboard('{Enter}');
		expect(mockDebouncedDateUpdate).toHaveBeenCalled();
	});

	test('calls debouncedDateUpdate when end date changes', async () => {
		renderMapFilters();
		const endDatePicker = screen.getByLabelText(/end date/i);
		await userEvent.click(endDatePicker);
		await userEvent.type(endDatePicker, '12312025');
		await userEvent.keyboard('{Enter}');
		expect(mockDebouncedDateUpdate).toHaveBeenCalled();
	});

	test('displays selected dates', () => {
		renderMapFilters({
			startDate: dayjs('2025-01-01'),
			endDate: dayjs('2025-12-31'),
		});

		expect(screen.getByLabelText(/start date/i)).toHaveValue('01/01/2025');
		expect(screen.getByLabelText(/end date/i)).toHaveValue('12/31/2025');
	});
});
