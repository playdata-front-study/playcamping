import { RoomState } from '../types/reduxState';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RoomType } from '../types/room';

const initialState: RoomState = {
	rooms: [],
	detail: null,
};

const room = createSlice({
	name: 'room',
	initialState,
	reducers: {
		setRooms(state, action: PayloadAction<RoomType[]>) {
			console.log('setroom dispatch 실행');
			console.log(action.payload);
			state.rooms = action.payload;
		},
		setDetailRoom(state, action: PayloadAction<RoomType>) {
			console.log('setDetailRoom dispatch 실행');
			console.log(action.payload);
			state.detail = action.payload;
		},
	},
});

export const roomActions = { ...room.actions };

export default room;
