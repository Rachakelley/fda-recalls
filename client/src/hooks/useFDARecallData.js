import { useQuery } from '@apollo/client';
import { getRecalls, getStateBounds } from '../queries';

const useFDARecallData = (startDate, endDate, limit) => {
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

	return {
		loadingRecallData,
		data,
		stateBoundsData,
		stateBoundsLoading,
	};
};

export default useFDARecallData;
