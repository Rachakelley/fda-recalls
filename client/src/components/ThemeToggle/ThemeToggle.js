import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { ThemeContext } from '../../context/ThemeContext';

const ThemeToggle = () => {
	const { mode, toggleTheme } = useContext(ThemeContext);
	return (
		<Button
			sx={{
				border: '1px solid #fefefe',
			}}
			onClick={toggleTheme}
		>
			{mode === 'light' ? '🌙' : '☀️'}
		</Button>
	);
};

export default ThemeToggle;
