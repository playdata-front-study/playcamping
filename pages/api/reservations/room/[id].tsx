import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../../lib/data/index';
import { ReservationType } from '../../../../types/reservation';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// 해당 캠핑장의 모든 예약 내역 조회
	if (req.method === 'GET') {
		const { id } = req.query;
		try {
			const reservations = Data.reservation
				.getList()
				.filter((v) => v.roomId === Number(id));

				//유저 정보 넣기
				const reservationsWithUsers: ReservationType[] = [];
				reservations.map((reservation) => {
					const user = Data.user.find({id: reservation.userId});
					reservationsWithUsers.push({ ...reservation, user: user });
				});
				
			res.statusCode = 200;
			return res.send(reservationsWithUsers); 
		} catch (e) {
			console.log(e);
		}
	}
	res.statusCode = 405;
	return res.end();
};
