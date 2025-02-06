import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const HoverPopover = ({ component, text }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<>
			<Typography
				aria-owns={open ? 'mouse-over-popover' : undefined}
				aria-haspopup='true'
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			>
				{component}
			</Typography>
			<Popover
				id='mouse-over-popover'
				sx={{ pointerEvents: 'none' }}
				open={open}
				anchorEl={anchorEl}
				disableScrollLock={true}
				hideBackdrop={true}
				style={{ overflowY: 'visible' }}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				onClose={handlePopoverClose}
			>
				<Typography sx={{ p: 1 }}>{text}</Typography>
			</Popover>
		</>
	);
};

export default HoverPopover;
