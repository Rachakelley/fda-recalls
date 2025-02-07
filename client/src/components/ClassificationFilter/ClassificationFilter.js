import React from 'react';
import { Box, Typography } from '@mui/material';
import './ClassificationFilter.css';

const ClassificationFilter = ({
	selectedClassifications,
	setSelectedClassifications,
}) => {
	const handleCheckboxChange = (classification) => {
		setSelectedClassifications((prev) => ({
			...prev,
			[classification]: !prev[classification],
		}));
	};

	const getLegendItem = (classification) => {
		if (classification === 'Class I') {
			return (
				<div className='legend-item'>
					<div className='color-box class-i'></div>
					<Typography variant='body2'>Class I (Low Risk)</Typography>
				</div>
			);
		} else if (classification === 'Class II') {
			return (
				<div className='legend-item'>
					<div className='color-box class-ii'></div>
					<Typography variant='body2'>Class II (Medium Risk)</Typography>
				</div>
			);
		} else if (classification === 'Class III') {
			return (
				<div className='legend-item'>
					<div className='color-box class-iii'></div>
					<Typography variant='body2'>Class III (High Risk)</Typography>
				</div>
			);
		}
	};

	return (
		<Box className='legend-wrapper'>
			{Object.keys(selectedClassifications).map((classification) => (
				<label key={classification}>
					<input
						type='checkbox'
						checked={selectedClassifications[classification]}
						onChange={() => handleCheckboxChange(classification)}
					/>
					{getLegendItem(classification)}
				</label>
			))}
		</Box>
	);
};

export default ClassificationFilter;
