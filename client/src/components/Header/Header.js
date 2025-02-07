import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Header.css';

const Header = () => {
	return (
		<header className='App-header'>
			<img
				src='https://open.fda.gov/img/gov-fda-new-white.svg'
				alt='FDA Logo'
				className='fda-logo'
			/>
			<ThemeToggle />
		</header>
	);
};

export default Header;
