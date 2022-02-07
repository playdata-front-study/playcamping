import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReservationState } from '../types/reduxState';
import { ReservationType, StoredReservation } from '../types/reservation';

const initialState: ReservationState = {
	roomReservations: [],
	userReservations: [],
};

const reservation = createSlice({
	name: 'reservation',
	initialState,
	reducers: {
		setRoomReservations(state, action: PayloadAction<StoredReservation[]>) {
			state.roomReservations = action.payload;
		},
		setUserReservations(state, action: PayloadAction<ReservationType[]>) {
			console.log('setUserReservation dispatch 실행');
			state.userReservations = action.payload;
		},
	},
});

export const reservationActions = { ...reservation.actions };

export default reservation;
