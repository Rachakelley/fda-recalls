import React from 'react';
import { Typography } from '@mui/material';
import LimitSelector from '../LimitSelector/LimitSelector';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import ClassificationFilter from '../ClassificationFilter/ClassificationFilter';
import './MapFilters.css';

const MapFilters = ({
	limit,
	debouncedLimitUpdate,
	startDate,
	endDate,
	debouncedDateUpdate,
	selectedClassifications,
	setSelectedClassifications,
	setEndDate,
}) => {
	return (
		<div className='map-filters'>
			<Typography variant='subtitle2'>Filters</Typography>
			<LimitSelector
				limit={limit}
				setLimit={debouncedLimitUpdate}
			/>
			<DateRangePicker
				startDate={startDate}
				endDate={endDate}
				setStartDate={(date) => debouncedDateUpdate(date, endDate)}
				setEndDate={(date) => debouncedDateUpdate(startDate, date)}
				popoverProps={{
					slotProps: {
						paper: {
							'aria-modal': true,
							role: 'dialog',
							inert: true,
							onKeyDown: (e) => {
								if (e.key === 'Escape') {
									setEndDate(null);
								}
							},
						},
					},
				}}
			/>
			<ClassificationFilter
				selectedClassifications={selectedClassifications}
				setSelectedClassifications={setSelectedClassifications}
			/>
		</div>
	);
};

export default MapFilters;
