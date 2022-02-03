import { RegisterRoomState } from '../../types/reduxState';
import { RoomType } from '../../types/room';
import { makeQueryString } from '../utils';
import axios from '../../lib/api/index'; // 커스텀한 axios를 import 했어야하는데 그냥 axios 사용했어서 자꾸 오류났었음 ㅠㅠ 주의

// 숙소 등록하기 & { hostId: number }
export const registerRoomAPI = (body: RegisterRoomState) => {
	axios.post('/api/rooms', body);
};

// 숙소 리스트 불러오기 query
type GetRoomListAPIQueries = {
	location?: string | string[];
	checkInDate?: string | string[];
	checkOutDate?: string | string[];
	adultCount?: string | string[];
	childrenCount?: string | string[];
	latitude?: string | string[];
	longitude?: string | string[];
};

//* 숙소 리스트 불러오기
export const getRoomListAPI = (queries: GetRoomListAPIQueries) => {
	console.log('lib/api/rooms : queries ???', queries);
	return axios.get<RoomType[]>(makeQueryString('/api/rooms', queries));
};

//* 숙소 하나 불러오기
export const getRoomAPI = (roomId: number) =>
	axios.get<RoomType>(`/api/rooms/${roomId}`);
