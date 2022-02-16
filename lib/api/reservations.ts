import axios from '.';
import { ReservationType, StoredReservation } from '../../types/reservation';

type MakeReservationAPIBody = {
	userId: number;
	checkInDate: string;
	checkOutDate: string;
	adultCount: number;
	childrenCount: number;
};

// 예약하기
export const makeReservationAPI = (body: MakeReservationAPIBody) =>
	axios.post('/api/reservations', body);

// 특정 숙소 예약내역 조회
export const getRoomReservationAPI = (roomId: number) =>
	axios.get<StoredReservation[]>(`/api/reservations/room/${roomId}`);

// 특정 회원 예약내역 조회
export const getUserReservationAPI = (userId: number) =>
	axios.get<ReservationType[]>(`/api/reservations/user/${userId}`);

// 예약 취소
export const deleteReservationAPI = (reservationId: number) =>
	axios.delete(`/api/reservations/${reservationId}`);
