import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './DateRangePicker.css';

const DateRangePicker = ({ endDate, setEndDate, setStartDate, startDate }) => {
	return (
		<div className='date-range-picker'>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					label='Start Date'
					value={startDate}
					onChange={(selectedDate) => setStartDate(selectedDate)}
				/>
				<DatePicker
					label='End Date'
					value={endDate}
					onChange={(selectedDate) => setEndDate(selectedDate)}
				/>
			</LocalizationProvider>
		</div>
	);
};

export default DateRangePicker;
