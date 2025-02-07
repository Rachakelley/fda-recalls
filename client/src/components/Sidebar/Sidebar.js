import React from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecallsAccordion from './RecallsAccordion';
import './Sidebar.css';

const Sidebar = ({
	recalls,
	isStateAccordionExpanded,
	setIsStateAccordionExpanded,
	isSidebarExpanded,
	onSidebarToggle,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				position: 'relative',
			}}
		>
			<IconButton
				className='sidebar-tab'
				onClick={() => onSidebarToggle()}
			>
				{isSidebarExpanded ? <ChevronRightIcon /> : <MenuIcon />}
			</IconButton>
			<div className={`sidebar ${isSidebarExpanded ? 'open' : ''}`}>
				<Box
					className='sidebar-content'
					sx={{
						width: isSidebarExpanded ? 'fit-content' : 0,
					}}
				>
					<RecallsAccordion
						{...{
							recalls,
							isStateAccordionExpanded,
							setIsStateAccordionExpanded,
							isSidebarExpanded,
						}}
					/>
				</Box>
			</div>
		</Box>
	);
};

export default Sidebar;
