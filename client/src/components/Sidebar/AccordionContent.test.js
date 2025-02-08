import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AccordionContent from './AccordionContent';
import { mockRecalls } from '../../../__mocks__';

const groupedMockRecalls = [
	['Class I', [mockRecalls[0]]],
	['Class II', [mockRecalls[1]]],
];

const defaultProps = {
	recalls: groupedMockRecalls,
	recallsDisplayCount: 5,
	state: 'Texas',
};

describe('AccordionContent', () => {
	const renderAccordionContent = (props = {}) => {
		return render(
			<AccordionContent
				{...defaultProps}
				{...props}
			/>
		);
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('Initial Render', () => {
		test('renders all classification sections', () => {
			renderAccordionContent();
			expect(screen.getByText('Class I Recalls')).toBeInTheDocument();
			expect(screen.getByText('Class II Recalls')).toBeInTheDocument();
		});

		test('renders recall firm names', () => {
			renderAccordionContent();
			expect(screen.getByText('HARDIES FRESH FOODS')).toBeInTheDocument();
			expect(screen.getByText('Test Firm')).toBeInTheDocument();
		});

		test('renders recall details', () => {
			renderAccordionContent();

			// Product details
			const productTexts = screen.getAllByText((content, element) => {
				return (
					element.textContent.includes('Product:') &&
					element.textContent.includes('14019 Cucumber Select')
				);
			});
			expect(productTexts[0]).toBeInTheDocument();

			// Recall number details
			const recallNumberTexts = screen.getAllByText((content, element) => {
				return (
					element.textContent.includes('Recall Number:') &&
					element.textContent.includes('F-0399-2025')
				);
			});
			expect(recallNumberTexts[0]).toBeInTheDocument();

			// Status details
			const statusTexts = screen.getAllByText((content, element) => {
				return (
					element.textContent.includes('Status:') &&
					element.textContent.includes('Ongoing')
				);
			});
			expect(statusTexts[0]).toBeInTheDocument();

			// Reason details
			const reasonTexts = screen.getAllByText((content, element) => {
				return (
					element.textContent.includes('Reason:') &&
					element.textContent.includes(
						'Cucumbers have the potential to be contaminated with Salmonella'
					)
				);
			});
			expect(reasonTexts[0]).toBeInTheDocument();
		});

		test('renders color boxes for classifications', () => {
			renderAccordionContent();
			expect(screen.getByTestId('class-i-box')).toHaveClass('class-i');
			expect(screen.getByTestId('class-ii-box')).toHaveClass('class-ii');
		});
	});

	describe('Show More Functionality', () => {
		test('show more button appears when there are more recalls than initial display count', () => {
			const manyRecalls = [['Class I', Array(6).fill(mockRecalls[0])]];
			renderAccordionContent({ recalls: manyRecalls });
			expect(screen.getByText('Show More')).toBeInTheDocument();
		});

		test('clicking show more increases visible recalls', () => {
			const manyRecalls = [['Class I', Array(6).fill(mockRecalls[0])]];
			renderAccordionContent({ recalls: manyRecalls });

			const showMoreButton = screen.getByText('Show More');
			fireEvent.click(showMoreButton);

			const recallingFirms = screen.getAllByText('HARDIES FRESH FOODS');
			expect(recallingFirms).toHaveLength(6);
		});

		test('show more button is not rendered when all recalls are visible', () => {
			renderAccordionContent();
			expect(screen.queryByText('Show More')).not.toBeInTheDocument();
		});
	});

	describe('Sorting', () => {
		test('recalls are sorted alphabetically by recalling firm', () => {
			const unsortedRecalls = [
				[
					'Class I',
					[
						{ ...mockRecalls[0], recalling_firm: 'Z Company' },
						{ ...mockRecalls[0], recalling_firm: 'A Company' },
					],
				],
			];
			renderAccordionContent({ recalls: unsortedRecalls });

			const firms = screen.getAllByText(/Company/);
			expect(firms[0]).toHaveTextContent('A Company');
			expect(firms[1]).toHaveTextContent('Z Company');
		});
	});
});
