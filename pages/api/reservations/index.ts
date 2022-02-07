import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';
import { isEmpty } from 'lodash';
import { StoredReservation } from '../../../types/reservation';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// 예약하기
	if (req.method === 'POST') {
		try {
			const { userId, checkInDate, checkOutDate, adultCount, childrenCount } =
				req.body;
			if (
				!userId ||
				!checkInDate ||
				!checkOutDate ||
				adultCount === undefined ||
				childrenCount === undefined
			) {
				res.statusCode = 400;
				console.log('필수 값 없음');
			}
			const reservations = Data.reservation.getList();
			if (isEmpty(reservations)) {
				const reservation: StoredReservation = {
					id: 1,
					...req.body,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				Data.reservation.write([reservation]);
				res.statusCode = 201;
				return res.end();
			}

			const reservation = {
				id: reservations[reservations.length - 1].id + 1,
				...req.body,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			Data.reservation.write([...reservations, reservation]);
			res.statusCode = 201;
			return res.end();
		} catch (e) {
			console.log(e);
			res.send(e.message);
		}
	}
	res.statusCode = 405;
	return res.end();
};
