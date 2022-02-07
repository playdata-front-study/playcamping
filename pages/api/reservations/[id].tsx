import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// 예약 취소하기
	if (req.method === 'DELETE') {
		try {
			const { id } = req.query;
				
			
			res.statusCode = 200;
			return res.end();
		} catch (e) {
			console.log(e);
			res.send(e.message);
		}
	}
	res.statusCode = 405;
	return res.end();
};
