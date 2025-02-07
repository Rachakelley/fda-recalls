import { useState } from 'react';
import dayjs from 'dayjs';

const useUIData = () => {
	const today = dayjs();
	const lastMonth = today.subtract(30, 'day');

	const [startDate, setStartDate] = useState(lastMonth);
	const [endDate, setEndDate] = useState(today);
	const [limit, setLimit] = useState(10);
	const [isFilterTabExpanded, setIsFilterTabExpanded] = useState(false);
	const [isStateAccordionExpanded, setIsStateAccordionExpanded] =
		useState(null);
	const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
	const [selectedClassifications, setSelectedClassifications] = useState({
		'Class I': true,
		'Class II': true,
		'Class III': true,
	});

	return {
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
	};
};

export default useUIData;
