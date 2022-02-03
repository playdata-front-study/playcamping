import axios from '.';

type MakeReservationAPIBody = {
	userId: number;
	checkInDate: string;
	checkOutDate: string;
	adultCount: number;
	childrenCount: number;
};

export const makeReservationAPI = (body: MakeReservationAPIBody) =>
	axios.post('/api/reservations', body);
