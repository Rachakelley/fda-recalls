import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './LimitSelector.css';

const LimitSelector = ({ limit, setLimit }) => {
	const limits = [5, 10, 25, 50, 100];

	return (
		<FormControl className='limit-selector-root'>
			<InputLabel>Results</InputLabel>
			<Select
				value={limit}
				onChange={(e) => setLimit(e.target.value)}
				label='Results'
				className='limit-selector-select'
				MenuProps={{
					disableScrollLock: true,
					PaperProps: {
						style: {
							paddingRight: 0,
							overflow: 'visible',
						},
					},
				}}
			>
				{limits.map((value) => (
					<MenuItem
						key={value}
						value={value}
					>
						{value}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default LimitSelector;
