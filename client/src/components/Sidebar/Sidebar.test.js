import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';
import { mockRecalls } from '../../../__mocks__';

const mockSetIsStateAccordionExpanded = jest.fn();
const mockOnSidebarToggle = jest.fn();

const defaultProps = {
	recalls: mockRecalls,
	isStateAccordionExpanded: false,
	setIsStateAccordionExpanded: mockSetIsStateAccordionExpanded,
	isSidebarExpanded: false,
	onSidebarToggle: mockOnSidebarToggle,
};

describe('Sidebar', () => {
	const renderSidebar = (props = {}) => {
		return render(
			<Sidebar
				{...defaultProps}
				{...props}
			/>
		);
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('Sidebar', () => {
		test('renders sidebar with toggle button', () => {
			renderSidebar();
			const toggleButton = screen.getByRole('button');
			expect(toggleButton).toBeInTheDocument();
			expect(toggleButton).toHaveClass('sidebar-tab');
			expect(toggleButton).toBeVisible();
		});

		test('renders MenuIcon when sidebar is collapsed', () => {
			renderSidebar();
			const MenuIcon = screen.getByTestId('MenuIcon');
			expect(MenuIcon).toBeInTheDocument();
			expect(MenuIcon).toBeVisible();
		});

		test('renders ChevronRightIcon when sidebar is expanded', () => {
			renderSidebar({ isSidebarExpanded: true });
			const ChevronRightIcon = screen.getByTestId('ChevronRightIcon');
			expect(ChevronRightIcon).toBeInTheDocument();
			expect(ChevronRightIcon).toBeVisible();
		});
	});

	test('calls onSidebarToggle when toggle button is clicked', () => {
		renderSidebar();
		fireEvent.click(screen.getByRole('button'));
		expect(mockOnSidebarToggle).toHaveBeenCalledTimes(1);
	});

	test('applies open class when sidebar is expanded', () => {
		renderSidebar({ isSidebarExpanded: true });
		expect(
			screen.getByRole('button').parentElement.querySelector('.sidebar')
		).toHaveClass('open');
	});

	test('does not apply open class when sidebar is collapsed', () => {
		renderSidebar({ isSidebarExpanded: false });
		expect(
			screen.getByRole('button').parentElement.querySelector('.sidebar')
		).not.toHaveClass('open');
	});

	test('passes correct props to RecallsAccordion', () => {
		renderSidebar();
		const sidebarContent = screen
			.getByRole('button')
			.parentElement.querySelector('.sidebar-content');
		expect(sidebarContent).toBeInTheDocument();
		expect(sidebarContent).toHaveStyle({ width: 0 });
	});

	test('sets correct width when sidebar is expanded', () => {
		renderSidebar({ isSidebarExpanded: true });
		const sidebarContent = screen
			.getByRole('button')
			.parentElement.querySelector('.sidebar-content');
		expect(sidebarContent).toHaveStyle({ width: 'fit-content' });
	});
});
