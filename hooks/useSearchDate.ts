import { useSelector } from '../store';
import { useDispatch } from 'react-redux';
import { searchSiteActions } from '../store/searchSite';

const useSearchDate = () => {
	const checkInDate = useSelector((state) => state.searchSite.checkInDate);
	const checkOutDate = useSelector((state) => state.searchSite.checkOutDate);
	const dispatch = useDispatch();

	const setCheckInDateDispatch = (date: Date | null) => {
		if (date) {
			dispatch(searchSiteActions.setStartDate(date.toISOString()));
		} else {
			dispatch(searchSiteActions.setStartDate(null));
		}
	};

	const setCheckOutDateDispatch = (date: Date | null) => {
		if (date) {
			dispatch(searchSiteActions.setEndDate(date.toISOString()));
		} else {
			dispatch(searchSiteActions.setEndDate(null));
		}
	};

	return {
		checkInDate: checkInDate ? new Date(checkInDate) : null,
		checkOutDate: checkOutDate ? new Date(checkOutDate) : null,
		setCheckInDateDispatch,
		setCheckOutDateDispatch,
	};
};

export default useSearchDate;
