import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../../lib/data/index';
import { ReservationType } from '../../../../types/reservation';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		const { id } = req.query;
		try {
			const reservations = Data.reservation
				.getList()
				.filter((v) => v.userId === Number(id));

			// 캠핑장 상세정보 넣기
			const roomReservations: ReservationType[] = [];
			reservations.map((reservation) => {
				const room = Data.room.find(reservation.roomId);
				roomReservations.push({ ...reservation, room: room });
			});

			res.statusCode = 200;
			return res.send(roomReservations);
		} catch (e) {
			console.log(e);
		}
	}
	res.statusCode = 405;
	return res.end();
};
