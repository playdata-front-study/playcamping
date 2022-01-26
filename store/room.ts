import { RoomState } from '../types/reduxState';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RoomType } from '../types/room';

const initialState: RoomState = {
	rooms: [],
};

const room = createSlice({
	name: 'room',
	initialState,
	reducers: {
		setRooms(state, action: PayloadAction<RoomType[]>) {
			state.rooms = action.payload;
		},
	},
});

export const roomActions = { ...room.actions };

export default room;
