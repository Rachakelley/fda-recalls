import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecallsAccordion from './RecallsAccordion';
import { mockRecalls } from '../../../__mocks__';

const mockGroupedRecalls = {
	stateGroups: {
		TX: {
			'Class I': [mockRecalls[0]],
			'Class II': [mockRecalls[1]],
		},
	},
};

const defaultProps = {
	recalls: mockGroupedRecalls,
	isStateAccordionExpanded: false,
	setIsStateAccordionExpanded: jest.fn(),
	isSidebarExpanded: true,
};

describe('RecallsAccordion', () => {
	const renderRecallsAccordion = (props = {}) => {
		return render(
			<RecallsAccordion
				{...defaultProps}
				{...props}
			/>
		);
	};

	let scrollIntoViewMock;
	let originalScrollIntoView;

	beforeEach(() => {
		jest.clearAllMocks();
		scrollIntoViewMock = jest.fn();
		originalScrollIntoView = Element.prototype.scrollIntoView;
		Element.prototype.scrollIntoView = scrollIntoViewMock;
	});

	afterEach(() => {
		Element.prototype.scrollIntoView = originalScrollIntoView;
	});

	describe('RecallsAccordion', () => {
		test('renders state accordion when recalls are present', () => {
			renderRecallsAccordion();
			expect(screen.getByText('Texas')).toBeInTheDocument();
		});

		test('displays correct recall count for state', () => {
			renderRecallsAccordion();
			expect(screen.getByText('2')).toBeInTheDocument();
		});

		test('renders nothing when recalls are empty', () => {
			renderRecallsAccordion({ recalls: { stateGroups: {} } });
			expect(screen.queryByText('Texas')).not.toBeInTheDocument();
		});

		test('calls setIsStateAccordionExpanded when accordion is clicked', () => {
			renderRecallsAccordion();
			fireEvent.click(screen.getByText('Texas'));
			expect(defaultProps.setIsStateAccordionExpanded).toHaveBeenCalledWith(
				'Texas'
			);
		});

		test('closes accordion when clicking an expanded state', () => {
			renderRecallsAccordion({ isStateAccordionExpanded: 'Texas' });
			fireEvent.click(screen.getByText('Texas'));
			expect(defaultProps.setIsStateAccordionExpanded).toHaveBeenCalledWith(
				false
			);
		});

		test('sorts states alphabetically', () => {
			const multiStateRecalls = {
				stateGroups: {
					TX: { 'Class I': [mockRecalls[0]] },
					CA: { 'Class II': [mockRecalls[1]] },
				},
			};
			renderRecallsAccordion({ recalls: multiStateRecalls });

			const stateElements = screen.getAllByRole('button');
			expect(stateElements[0]).toHaveTextContent('California');
			expect(stateElements[1]).toHaveTextContent('Texas');
		});

		test('scrolls to expanded state when sidebar is expanded', () => {
			const scrollIntoViewMock = jest.fn();
			window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

			renderRecallsAccordion({ isStateAccordionExpanded: 'Texas' });
			expect(scrollIntoViewMock).toHaveBeenCalledWith({
				behavior: 'smooth',
				block: 'start',
			});
		});

		test('does not scroll when sidebar is collapsed', () => {
			const scrollIntoViewMock = jest.fn();
			window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

			renderRecallsAccordion({
				isStateAccordionExpanded: 'Texas',
				isSidebarExpanded: false,
			});
			expect(scrollIntoViewMock).not.toHaveBeenCalled();
		});
	});
});
