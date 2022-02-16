import { useSelector } from '../store';
import { useDispatch } from 'react-redux';
import { searchRoomActions } from '../store/searchRoom';
import moment from 'moment';

// 날짜 형태를 string으로 바꿔서 리덕스 스토어에 저장하기 위한 커스텀 훅
const useSearchDate = () => {
	const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
	const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);
	const dispatch = useDispatch();

	const setCheckInDateDispatch = (date: Date | null) => {
		if (date) {
			dispatch(
				searchRoomActions.setStartDate(
					moment(date, 'YYYY-MM-DD').format().split('T')[0]
				)
			);
		} else {
			dispatch(searchRoomActions.setStartDate(null));
		}
	};

	const setCheckOutDateDispatch = (date: Date | null) => {
		if (date) {
			dispatch(
				searchRoomActions.setEndDate(
					moment(date, 'YYYY-MM-DD').format().split('T')[0]
				)
			);
		} else {
			dispatch(searchRoomActions.setEndDate(null));
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
