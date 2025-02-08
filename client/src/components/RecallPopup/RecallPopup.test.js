import React from 'react';
import { render, screen } from '@testing-library/react';
import RecallPopup from './RecallPopup';
import { mockRecalls } from '../../../__mocks__';

jest.mock('react-leaflet', () => ({
	Popup: jest.fn(({ children }) => (
		<div data-testid='mock-popup'>{children}</div>
	)),
}));

describe('RecallPopup', () => {
	const mockProps = {
		state: 'Texas',
		classification: 'Class I',
		recalls: mockRecalls,
	};

	it('renders with mock recall data', () => {
		render(<RecallPopup {...mockProps} />);
		expect(screen.getByText('HARDIES FRESH FOODS')).toBeInTheDocument();
		expect(
			screen.getByText(
				'14019 Cucumber Select 6 CT, 01034 Cucumber Select 5# packaged in polybags Dairyland Produce, LLC'
			)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				/Cucumbers have the potential to be contaminated with Salmonella/
			)
		).toBeInTheDocument();
	});

	it('renders mock popup component', () => {
		render(<RecallPopup {...mockProps} />);
		expect(screen.getByTestId('mock-popup')).toBeInTheDocument();
	});

	it('displays correct header for Texas recalls', () => {
		render(<RecallPopup {...mockProps} />);
		expect(screen.getByText('Texas - Class I')).toBeInTheDocument();
	});

	it('shows correct total number of mock recalls', () => {
		render(<RecallPopup {...mockProps} />);
		expect(screen.getByText('Total Recalls: 2')).toBeInTheDocument();
	});

	it('renders recall items with company name, description and reason', () => {
		render(<RecallPopup {...mockProps} />);
		expect(screen.getByText('Test Firm')).toBeInTheDocument();
		expect(screen.getByText('Test Product')).toBeInTheDocument();
		expect(screen.getByText(/Test Reason/)).toBeInTheDocument();
	});

	it('shows "more recalls" message when recalls length > 5', () => {
		const manyRecalls = {
			...mockProps,
			recalls: Array(8).fill(mockProps.recalls[0]),
		};
		render(<RecallPopup {...manyRecalls} />);
		expect(screen.getByText('+ 3 more recalls...')).toBeInTheDocument();
	});

	it('does not show "more recalls" message when recalls length <= 5', () => {
		render(<RecallPopup {...mockProps} />);
		expect(screen.queryByText(/more recalls/)).not.toBeInTheDocument();
	});
});
