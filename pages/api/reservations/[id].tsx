import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// 예약 취소하기
	console.log('예약취소 api');
	if (req.method === 'DELETE') {
		try {
			const { id } = req.query; // 예약번호
			const reservations = Data.reservation
				.getList()
				.filter((v) => v.id !== Number(id));
			Data.reservation.write(reservations);
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
