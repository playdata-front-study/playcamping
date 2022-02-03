import { useSelector } from '../store';
import { useDispatch } from 'react-redux';
import { searchRoomActions } from '../store/searchRoom';

// 날짜 형태를 string으로 바꿔서 리덕스 스토어에 저장하기 위한 커스텀 훅
const useSearchDate = () => {
	const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
	const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);
	const dispatch = useDispatch();

	const setCheckInDateDispatch = (date: Date | null) => {
		if (date) {
			dispatch(searchRoomActions.setStartDate(date.toISOString()));
		} else {
			dispatch(searchRoomActions.setStartDate(null));
		}
	};

	const setCheckOutDateDispatch = (date: Date | null) => {
		if (date) {
			dispatch(searchRoomActions.setEndDate(date.toISOString()));
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
