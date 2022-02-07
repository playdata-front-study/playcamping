import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../../lib/data/index';

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
