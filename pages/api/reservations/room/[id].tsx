import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../../lib/data/index';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// 해당 캠핑장의 모든 예약 내역 조회
	if (req.method === 'GET') {
		const { id } = req.query;
		try {
			const reservations = Data.reservation
				.getList()
				.filter((v) => v.roomId === Number(id));
			res.statusCode = 200;
			return res.send(reservations);
		} catch (e) {
			console.log(e);
		}
	}
	res.statusCode = 405;
	return res.end();
};
