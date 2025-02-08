import { renderHook, act } from '@testing-library/react-hooks';
import dayjs from 'dayjs';
import useUIData from '../useUIData';

describe('useUIData', () => {
	it('should initialize with default values', () => {
		const { result } = renderHook(() => useUIData());
		const today = dayjs();
		const lastMonth = today.subtract(30, 'day');

		expect(result.current.startDate.format('YYYY-MM-DD')).toBe(
			lastMonth.format('YYYY-MM-DD')
		);
		expect(result.current.endDate.format('YYYY-MM-DD')).toBe(
			today.format('YYYY-MM-DD')
		);
		expect(result.current.limit).toBe(10);
		expect(result.current.isFilterTabExpanded).toBe(false);
		expect(result.current.isStateAccordionExpanded).toBe(null);
		expect(result.current.isSidebarExpanded).toBe(true);
		expect(result.current.selectedClassifications).toEqual({
			'Class I': true,
			'Class II': true,
			'Class III': true,
		});
	});

	it('should update startDate when setStartDate is called', () => {
		const { result } = renderHook(() => useUIData());
		const newDate = dayjs('2024-01-01');

		act(() => {
			result.current.setStartDate(newDate);
		});

		expect(result.current.startDate).toBe(newDate);
	});

	it('should update endDate when setEndDate is called', () => {
		const { result } = renderHook(() => useUIData());
		const newDate = dayjs('2024-01-31');

		act(() => {
			result.current.setEndDate(newDate);
		});

		expect(result.current.endDate).toBe(newDate);
	});

	it('should update limit when setLimit is called', () => {
		const { result } = renderHook(() => useUIData());

		act(() => {
			result.current.setLimit(20);
		});

		expect(result.current.limit).toBe(20);
	});

	it('should toggle filter tab expansion', () => {
		const { result } = renderHook(() => useUIData());

		act(() => {
			result.current.setIsFilterTabExpanded(true);
		});

		expect(result.current.isFilterTabExpanded).toBe(true);
	});

	it('should update state accordion expansion', () => {
		const { result } = renderHook(() => useUIData());

		act(() => {
			result.current.setIsStateAccordionExpanded('CA');
		});

		expect(result.current.isStateAccordionExpanded).toBe('CA');
	});

	it('should toggle sidebar expansion', () => {
		const { result } = renderHook(() => useUIData());

		act(() => {
			result.current.setIsSidebarExpanded(false);
		});

		expect(result.current.isSidebarExpanded).toBe(false);
	});

	it('should update selected classifications', () => {
		const { result } = renderHook(() => useUIData());
		const newClassifications = {
			'Class I': false,
			'Class II': true,
			'Class III': false,
		};

		act(() => {
			result.current.setSelectedClassifications(newClassifications);
		});

		expect(result.current.selectedClassifications).toEqual(newClassifications);
	});
});
