import React from 'react';
import './Header.css';

const Header = () => {
	return (
		<header className='App-header'>
			<img
				src='https://open.fda.gov/img/gov-fda-new-white.svg'
				alt='FDA Logo'
				className='fda-logo'
			/>
		</header>
	);
};

export default Header;
