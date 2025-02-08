import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateRangePicker from './DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

describe('DateRangePicker', () => {
	const mockSetStartDate = jest.fn();
	const mockSetEndDate = jest.fn();

	const renderDateRangePicker = (props = {}) => {
		const defaultProps = {
			startDate: null,
			endDate: null,
			setStartDate: mockSetStartDate,
			setEndDate: mockSetEndDate,
		};

		return render(
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateRangePicker
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

	test('renders start date picker', () => {
		renderDateRangePicker();

		expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
	});

	test('renders end date picker', () => {
		renderDateRangePicker();

		expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
	});

	test('calls setStartDate on start date change', async () => {
		renderDateRangePicker();

		const startDatePicker = screen.getByLabelText(/start date/i);
		await userEvent.click(startDatePicker);
		await userEvent.type(startDatePicker, '01012025');
		await userEvent.keyboard('{Enter}');
		expect(mockSetStartDate).toHaveBeenCalled();
	});

	test('calls setEndDate on end date change', async () => {
		renderDateRangePicker();

		const endDatePicker = screen.getByLabelText(/end date/i);
		await userEvent.click(endDatePicker);
		await userEvent.type(endDatePicker, '12312025');
		await userEvent.keyboard('{Enter}');
		expect(mockSetEndDate).toHaveBeenCalled();
	});

	test('displays selected start date', () => {
		renderDateRangePicker({ startDate: dayjs('2025-01-01') });

		const datePicker = screen.getByLabelText(/start date/i);
		expect(datePicker).toHaveValue('01/01/2025');
	});

	test('displays selected end date', () => {
		renderDateRangePicker({ endDate: dayjs('2025-12-31') });

		const datePicker = screen.getByLabelText(/end date/i);
		expect(datePicker).toHaveValue('12/31/2025');
	});
});
