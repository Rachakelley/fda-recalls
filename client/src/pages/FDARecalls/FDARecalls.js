import React, { useMemo, Suspense, lazy } from 'react';
import debounce from 'lodash/debounce';
import { CircularProgress } from '@mui/material';
import { useFDARecallData, useUIData } from '../../hooks';
import RecallMap from '../../components/RecallMap/RecallMap';
import RecallsHeader from '../../components/RecallsHeader/RecallsHeader';
import './FDARecalls.css';

const MapFilters = lazy(() => import('../../components/MapFilters/MapFilters'));
const Sidebar = lazy(() => import('../../components/Sidebar/Sidebar'));

const FDARecalls = () => {
	const {
		startDate,
		setStartDate,
		endDate,
		setEndDate,
		limit,
		setLimit,
		isFilterTabExpanded,
		setIsFilterTabExpanded,
		isStateAccordionExpanded,
		setIsStateAccordionExpanded,
		isSidebarExpanded,
		setIsSidebarExpanded,
		selectedClassifications,
		setSelectedClassifications,
	} = useUIData();
	const { loadingRecallData, data, stateBoundsData } = useFDARecallData(
		startDate,
		endDate,
		limit
	);

	const recalls = useMemo(() => {
		const results = data?.recalls?.results || [];
		return results.filter(
			(recall) =>
				Object.keys(selectedClassifications).length === 0 ||
				Object.keys(selectedClassifications).includes(recall.classification)
		);
	}, [data?.recalls?.results, selectedClassifications]);

	const handleSidebarToggle = () => {
		setIsSidebarExpanded(!isSidebarExpanded);
	};

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
			<RecallsHeader
				loadingRecallData={loadingRecallData}
				limit={limit}
				totalResults={data?.recalls?.total_results}
				startDate={startDate}
				endDate={endDate}
				isFilterTabExpanded={isFilterTabExpanded}
				setIsFilterTabExpanded={setIsFilterTabExpanded}
			/>
			<Suspense
				fallback={
					<div className='sidebar-loading'>
						<CircularProgress />
					</div>
				}
			>
				<Sidebar
					recalls={data?.recalls}
					isStateAccordionExpanded={isStateAccordionExpanded}
					setIsStateAccordionExpanded={setIsStateAccordionExpanded}
					isSidebarExpanded={isSidebarExpanded}
					onSidebarToggle={handleSidebarToggle}
				/>
			</Suspense>
			<div
				className={`map-filters-wrapper ${
					isFilterTabExpanded ? 'expanded' : ''
				}`}
			>
				<Suspense fallback={<CircularProgress />}>
					<MapFilters
						limit={limit}
						debouncedLimitUpdate={debouncedLimitUpdate}
						startDate={startDate}
						endDate={endDate}
						debouncedDateUpdate={debouncedDateUpdate}
						selectedClassifications={selectedClassifications}
						setSelectedClassifications={setSelectedClassifications}
						setEndDate={setEndDate}
					/>
				</Suspense>
			</div>
			<div className='recalls-container'>
				<RecallMap
					recalls={recalls}
					stateBoundsData={stateBoundsData}
					selectedClassifications={selectedClassifications}
					setIsStateAccordionExpanded={setIsStateAccordionExpanded}
					loadingRecallData={loadingRecallData}
					isSidebarExpanded={isSidebarExpanded}
				/>
			</div>
		</div>
	);
};

export default FDARecalls;
