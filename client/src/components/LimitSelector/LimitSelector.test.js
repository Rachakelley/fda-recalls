import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LimitSelector from './LimitSelector';

describe('LimitSelector', () => {
	const mockSetLimit = jest.fn();

	const renderLimitSelector = (props = {}) => {
		const defaultProps = {
			limit: 10,
			setLimit: mockSetLimit,
		};

		return render(
			<LimitSelector
				{...defaultProps}
				{...props}
			/>
		);
	};

	beforeEach(() => {
		cleanup();
		jest.clearAllMocks();
	});

	test('renders limit selector', () => {
		renderLimitSelector();
		expect(screen.getByLabelText(/results/i)).toBeInTheDocument();
	});

	test('displays current limit value', () => {
		renderLimitSelector({ limit: 25 });
		expect(screen.getByRole('combobox')).toHaveTextContent('25');
	});

	test('renders all limit options', () => {
		renderLimitSelector();
		const select = screen.getByRole('combobox');
		userEvent.click(select);

		const options = [5, 10, 25, 50, 100];
		options.forEach((value) => {
			expect(
				screen.getByRole('option', { name: value.toString() })
			).toHaveAttribute('data-value', value.toString());
		});
	});

	test('calls setLimit when new value is selected', async () => {
		renderLimitSelector();
		const select = screen.getByRole('combobox');
		await userEvent.click(select);
		await userEvent.click(screen.getByText('25'));

		expect(mockSetLimit).toHaveBeenCalledWith(25);
	});
});
