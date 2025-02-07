import React from 'react';
import { Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import HoverPopover from '../Popover/HoverPopover';
import './RecallsHeader.css';

const RecallsHeader = ({
	loadingRecallData,
	limit,
	totalResults,
	startDate,
	endDate,
	isFilterTabExpanded,
	setIsFilterTabExpanded,
}) => {
	const displayedResults = Math.min(limit, totalResults || 0);

	return (
		<div className='recalls-header'>
			<div
				className={`map-filters-tab ${isFilterTabExpanded ? 'expanded' : ''}`}
				onClick={() => setIsFilterTabExpanded(!isFilterTabExpanded)}
			>
				<HoverPopover
					component={<FilterListIcon />}
					text='Filters'
				/>
			</div>
			<div className='recalls-date-text'>
				{loadingRecallData ? (
					<Typography variant='body2'>Loading results...</Typography>
				) : (
					<Typography variant='body2'>
						Showing <strong>{displayedResults}</strong> of{' '}
						<strong>{totalResults || 0}</strong> recalls from{' '}
						{startDate.format('MM/DD/YYYY')} to {endDate.format('MM/DD/YYYY')}
					</Typography>
				)}
			</div>
		</div>
	);
};

export default RecallsHeader;
