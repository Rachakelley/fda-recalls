import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ClassificationFilter from './ClassificationFilter';

describe('ClassificationFilter', () => {
	const mockSetSelectedClassifications = jest.fn();
	const classifications = {
		'Class I': { text: 'Class I (Low Risk)', class: 'class-i' },
		'Class II': { text: 'Class II (Medium Risk)', class: 'class-ii' },
		'Class III': { text: 'Class III (High Risk)', class: 'class-iii' },
	};

	const getCheckbox = (classification) =>
		screen.getByRole('checkbox', {
			name: classifications[classification].text,
		});

	const defaultProps = {
		selectedClassifications: {
			'Class I': true,
			'Class II': true,
			'Class III': true,
		},
		setSelectedClassifications: mockSetSelectedClassifications,
	};

	const renderClassificationFilter = (props = {}) => {
		return render(
			<ClassificationFilter
				{...defaultProps}
				{...props}
			/>
		);
	};

	beforeEach(() => {
		cleanup();
		jest.clearAllMocks();
	});

	test('renders all classification checkboxes', () => {
		renderClassificationFilter();

		Object.values(classifications).forEach(({ text }) => {
			expect(screen.getByText(text)).toBeInTheDocument();
		});
	});

	test('displays correct initial checkbox states', () => {
		const initialState = {
			'Class I': true,
			'Class II': false,
			'Class III': true,
		};

		renderClassificationFilter({ selectedClassifications: initialState });

		Object.entries(initialState).forEach(([classification, isChecked]) => {
			expect(getCheckbox(classification)).toHaveProperty('checked', isChecked);
		});
	});

	test('calls setSelectedClassifications when checkbox is clicked', async () => {
		renderClassificationFilter();
		await userEvent.click(getCheckbox('Class I'));
		expect(mockSetSelectedClassifications).toHaveBeenCalled();
	});

	test('renders correct color boxes for each classification', () => {
		renderClassificationFilter();

		const colorBoxes = document.querySelectorAll('.color-box');
		expect(colorBoxes).toHaveLength(Object.keys(classifications).length);

		Object.values(classifications).forEach(({ class: className }, index) => {
			expect(colorBoxes[index]).toHaveClass(className);
		});
	});

	test('toggles classification when checkbox is clicked', async () => {
		renderClassificationFilter();
		await userEvent.click(getCheckbox('Class II'));
		expect(mockSetSelectedClassifications).toHaveBeenCalledWith(
			expect.any(Function)
		);
	});
});
