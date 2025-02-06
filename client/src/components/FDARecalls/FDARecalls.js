import React, { useState, useMemo, Suspense, lazy } from 'react';
import { useQuery } from '@apollo/client';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import { CircularProgress } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getStateBounds } from '../../queries/getStateBounds';
import { getRecalls } from '../../queries/getRecalls';
import HoverPopover from '../Popover/HoverPopover';
import RecallMap from '../RecallMap/RecallMap';
import './FDARecalls.css';

const Sidebar = lazy(() => import('../Sidebar/Sidebar'));
const DateRangePicker = lazy(() =>
	import('../DateRangePicker/DateRangePicker')
);
const LimitSelector = lazy(() => import('../LimitSelector/LimitSelector'));
const ClassificationFilter = lazy(() =>
	import('../ClassificationFilter/ClassificationFilter')
);

const today = dayjs();
const yesterday = today.subtract(30, 'day');

const FDARecalls = () => {
	const [startDate, setStartDate] = useState(yesterday);
	const [endDate, setEndDate] = useState(today);
	const [limit, setLimit] = useState(10);
	const [isFilterTabExpanded, setIsFilterTabExpanded] = useState(false);
	const [isStateAccordionExpanded, setIsStateAccordionExpanded] =
		useState(null);
	const [selectedClassifications, setSelectedClassifications] = useState({
		'Class I': true,
		'Class II': true,
		'Class III': true,
	});

	const { loading: loadingRecallData, data } = useQuery(getRecalls, {
		variables: {
			startDate: startDate.format('YYYYMMDD'),
			endDate: endDate.format('YYYYMMDD'),
			limit: parseInt(limit),
		},
	});
	const {
		data: { stateBounds: stateBoundsData } = {},
		loading: stateBoundsLoading,
	} = useQuery(getStateBounds);
	console.log('stateBoundsData', stateBoundsData);

	const recalls = useMemo(() => {
		const results = data?.recalls?.results || [];
		return results.filter(
			(recall) =>
				Object.keys(selectedClassifications).length === 0 ||
				Object.keys(selectedClassifications).includes(recall.classification)
		);
	}, [data?.recalls?.results, selectedClassifications]);

	const debouncedLimitUpdate = useMemo(
		() =>
			debounce((newLimit) => {
				setLimit(newLimit);
			}, 500),
		[]
	);

	const debouncedDateUpdate = useMemo(
		() =>
			debounce((newStart, newEnd) => {
				setStartDate(newStart);
				setEndDate(newEnd);
			}, 500),
		[]
	);

	return (
		<div className='fda-recalls'>
			<div className='recalls-header'>
				<div
					className={`map-filters-tab ${isFilterTabExpanded ? 'expanded' : ''}`}
					onClick={() => setIsFilterTabExpanded(!isFilterTabExpanded)}
				>
					<HoverPopover
						component={<FilterListIcon />}
						text='Filters'
					/>
				</div>
				<div className='recalls-date-text'>
					{loadingRecallData ? (
						<p>Loading results...</p>
					) : (
						<p>
							Showing{' '}
							<strong>
								{Math.min(limit, data?.recalls?.total_results || 0)}
							</strong>{' '}
							of <strong>{data?.recalls?.total_results || 0}</strong> recalls
							from {startDate.format('MM/DD/YYYY')} to{' '}
							{endDate.format('MM/DD/YYYY')}
						</p>
					)}
				</div>
			</div>
			<Suspense
				fallback={
					<div className='sidebar-loading'>
						<CircularProgress />
					</div>
				}
			>
				<Sidebar
					recalls={data?.recalls}
					expandedState={isStateAccordionExpanded}
					setExpandedState={setIsStateAccordionExpanded}
				/>
			</Suspense>
			<div
				className={`map-filters-wrapper ${
					isFilterTabExpanded ? 'expanded' : ''
				}`}
			>
				<Suspense fallback={<CircularProgress />}>
					<div className='map-filters'>
						<p>Filters</p>
						<LimitSelector
							limit={limit}
							setLimit={debouncedLimitUpdate}
						/>
						<DateRangePicker
							startDate={startDate}
							endDate={endDate}
							setStartDate={(date) => debouncedDateUpdate(date, endDate)}
							setEndDate={(date) => debouncedDateUpdate(startDate, date)}
							popoverProps={{
								slotProps: {
									paper: {
										'aria-modal': true,
										role: 'dialog',
										inert: true,
										onKeyDown: (e) => {
											if (e.key === 'Escape') {
												setEndDate(null);
											}
										},
									},
								},
							}}
						/>
						<ClassificationFilter
							selectedClassifications={selectedClassifications}
							setSelectedClassifications={setSelectedClassifications}
						/>
					</div>
				</Suspense>
			</div>
			<div className='recalls-container'>
				<RecallMap
					recalls={recalls}
					stateBoundsData={stateBoundsData}
					selectedClassifications={selectedClassifications}
					setExpandedState={setIsStateAccordionExpanded}
					loadingRecallData={loadingRecallData}
				/>
			</div>
		</div>
	);
};

export default FDARecalls;
