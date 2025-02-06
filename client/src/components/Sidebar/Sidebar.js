import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RecallsAccordion from './RecallsAccordion';
import './Sidebar.css';

const Sidebar = ({ recalls, expandedState, setExpandedState }) => {
	const [open, setOpen] = useState(true);

	return (
		<Box sx={{ display: 'flex', position: 'relative' }}>
			<IconButton
				className='sidebar-tab'
				onClick={() => setOpen(!open)}
			>
				{open ? <ChevronLeftIcon /> : <MenuIcon />}
			</IconButton>
			<div className={`sidebar ${open ? 'open' : ''}`}>
				<Box
					className='sidebar-content'
					sx={{
						width: open ? 'fit-content' : 0,
					}}
				>
					<RecallsAccordion
						{...{
							recalls,
							expandedState,
							setExpandedState,
						}}
					/>
				</Box>
			</div>
		</Box>
	);
};

export default Sidebar;
