import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import dayjs from 'dayjs';
import { getRecalls, getStateBounds } from '../../queries';
import useFDARecallData from '../useFDARecallData';
import { mockGetRecallsResponse } from '../../../__mocks__';

describe('useFDARecallData', () => {
	const startDate = dayjs('2024-11-27');
	const endDate = dayjs('2024-11-27');
	const limit = 10;

	const mockRecalls = mockGetRecallsResponse.data.recalls;
	const mocks = [
		{
			request: {
				query: getRecalls,
				variables: {
					startDate: '20241127',
					endDate: '20241127',
					limit: 10,
				},
			},
			result: {
				data: { recalls: mockRecalls },
			},
		},
		{
			request: {
				query: getStateBounds,
			},
			result: {
				data: {
					stateBounds: {
						type: 'FeatureCollection',
						features: [],
					},
				},
			},
		},
	];

	const renderFDARecallHook = () => {
		return renderHook(() => useFDARecallData(startDate, endDate, limit), {
			wrapper: ({ children }) => (
				<MockedProvider
					mocks={mocks}
					addTypename={false}
				>
					{children}
				</MockedProvider>
			),
		});
	};

	it('should initialize with loading states', () => {
		const { result } = renderFDARecallHook();

		expect(result.current.loadingRecallData).toBe(true);
		expect(result.current.stateBoundsLoading).toBe(true);
		expect(result.current.data).toBeUndefined();
		expect(result.current.stateBoundsData).toBeUndefined();
	});

	it('should return recall data and state bounds after loading', async () => {
		const { result, waitForNextUpdate } = renderFDARecallHook();

		await waitForNextUpdate();

		expect(result.current.loadingRecallData).toBe(false);
		expect(result.current.stateBoundsLoading).toBe(false);
		expect(result.current.data.recalls).toEqual(mockRecalls);
		expect(result.current.stateBoundsData).toEqual({
			type: 'FeatureCollection',
			features: [],
		});
	});

	it('should handle string limit parameter', async () => {
		const stringLimit = '10';
		const { result, waitForNextUpdate } = renderHook(
			() => useFDARecallData(startDate, endDate, stringLimit),
			{
				wrapper: ({ children }) => (
					<MockedProvider
						mocks={mocks}
						addTypename={false}
					>
						{children}
					</MockedProvider>
				),
			}
		);

		await waitForNextUpdate();
		expect(result.current.loadingRecallData).toBe(false);
		expect(result.current.data.recalls).toEqual(mockRecalls);
	});

	it('should format dates correctly', () => {
		renderFDARecallHook();

		expect(mocks[0].request.variables.startDate).toBe('20241127');
		expect(mocks[0].request.variables.endDate).toBe('20241127');
	});

	it('should handle query errors', async () => {
		const errorMocks = [
			{
				request: {
					query: getRecalls,
					variables: {
						startDate: '20241127',
						endDate: '20241127',
						limit: 10,
					},
				},
				error: new Error('Failed to fetch recalls'),
			},
			{
				request: {
					query: getStateBounds,
				},
				error: new Error('Failed to fetch state bounds'),
			},
		];

		const { result, waitForNextUpdate } = renderHook(
			() => useFDARecallData(startDate, endDate, limit),
			{
				wrapper: ({ children }) => (
					<MockedProvider
						mocks={errorMocks}
						addTypename={false}
					>
						{children}
					</MockedProvider>
				),
			}
		);

		await waitForNextUpdate();

		expect(result.current.loadingRecallData).toBe(false);
		expect(result.current.data).toBeUndefined();
	});
});
