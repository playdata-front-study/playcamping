import { SearchSiteState } from '../types/reduxState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SearchSiteState = {
	location: '',
	latitude: 0,
	longitude: 0,
	checkInDate: null,
	checkOutDate: null,
	adultCount: 1,
	childrenCount: 0,
};

const searchSite = createSlice({
	name: 'searchSite',
	initialState,
	reducers: {
		// 유저 변경하기
		setLocation(state, action: PayloadAction<string>) {
			state.location = action.payload;
			return state;
		},
		// 체크인 날짜 변경하기
		setStartDate(state, action: PayloadAction<string | null>) {
			state.checkInDate = action.payload;
			return state;
		},
		// 체크아웃 날짜 변경하기
		setEndDate(state, action: PayloadAction<string | null>) {
			state.checkOutDate = action.payload;
			return state;
		},
		// 성인 수 변경하기
		setAdultCount(state, action: PayloadAction<number>) {
			state.adultCount = action.payload;
			return state;
		},
		// 어린이 수 변경하기
		setChildrenCount(state, action: PayloadAction<number>) {
			state.childrenCount = action.payload;
			return state;
		},
		// 위도 변경하기
		setLatitude(state, action: PayloadAction<number>) {
			state.latitude = action.payload;
		},
		// 경도 변경하기
		setLongitude(state, action: PayloadAction<number>) {
			state.longitude = action.payload;
		},
	},
});

export const searchSiteActions = { ...searchSite.actions };

export default searchSite;
