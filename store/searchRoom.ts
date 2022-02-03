import { SearchRoomState } from '../types/reduxState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SearchRoomState = {
	location: '',
	latitude: 0,
	longitude: 0,
	checkInDate: null,
	checkOutDate: null,
	adultCount: 1,
	childrenCount: 0,
};

const searchRoom = createSlice({
	name: 'searchRoom',
	initialState,
	reducers: {
		setLocation(state, action: PayloadAction<string>) {
			state.location = action.payload;
			return state;
		},
		setStartDate(state, action: PayloadAction<string | null>) {
			console.log('체크인날짜 dispatch 실행');
			state.checkInDate = action.payload;
			return state;
		},
		setEndDate(state, action: PayloadAction<string | null>) {
			console.log('체크아웃날짜 dispatch 실행');
			state.checkOutDate = action.payload;
			return state;
		},
		setAdultCount(state, action: PayloadAction<number>) {
			console.log('어른수 dispatch 실행');
			state.adultCount = action.payload;
			return state;
		},
		setChildrenCount(state, action: PayloadAction<number>) {
			console.log('아이수 dispatch 실행');
			state.childrenCount = action.payload;
			return state;
		},
		setLatitude(state, action: PayloadAction<number>) {
			console.log('위도변경 dispatch 실행');
			state.latitude = action.payload;
		},
		setLongitude(state, action: PayloadAction<number>) {
			console.log('경도변경 dispatch 실행');
			state.longitude = action.payload;
		},
	},
});

export const searchRoomActions = { ...searchRoom.actions };

export default searchRoom;
