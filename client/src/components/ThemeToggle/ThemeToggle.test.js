import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../../context/ThemeContext';

describe('ThemeToggle', () => {
	const mockToggleTheme = jest.fn();

	const renderWithContext = (mode) => {
		return render(
			<ThemeContext.Provider value={{ mode, toggleTheme: mockToggleTheme }}>
				<ThemeToggle />
			</ThemeContext.Provider>
		);
	};

	beforeEach(() => {
		mockToggleTheme.mockClear();
	});

	test('renders light mode emoji when theme is dark', () => {
		renderWithContext('dark');
		expect(screen.getByText('☀️')).toBeInTheDocument();
	});

	test('renders dark mode emoji when theme is light', () => {
		renderWithContext('light');
		expect(screen.getByText('🌙')).toBeInTheDocument();
	});

	test('calls toggleTheme when button is clicked', () => {
		renderWithContext('light');
		fireEvent.click(screen.getByRole('button'));
		expect(mockToggleTheme).toHaveBeenCalledTimes(1);
	});

	test('button has correct styling', () => {
		renderWithContext('light');
		const button = screen.getByRole('button');
		expect(button).toHaveStyle({ border: '1px solid #fefefe' });
	});
});
