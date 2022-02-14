import { NextApiRequest, NextApiResponse } from 'next';
import rooms from '.';
import Data from '../../../lib/data/index';
import { StoredUserType } from '../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		const { id } = req.query;
		try {
			const room = Data.room.find(Number(id as string));
			if (room) {
				const host = Data.user.find({ id: room.hostId });
				if (host) {
					const newUserWithoutPassword: Partial<
						Pick<StoredUserType, 'password'>
					> = host;
					delete newUserWithoutPassword.password;
					const roomWithHost = { ...room, host: newUserWithoutPassword };
					res.statusCode = 200;
					return res.send(roomWithHost);
				}
				res.statusCode = 404;
				return res.send('호스트 정보 없음');
			}
			res.statusCode = 404;
			return res.send('해당 숙소 없음');
		} catch (e) {
			console.log(e);
		}
	} else if (req.method === 'DELETE') {
		const { id } = req.query;
		try {
			const room = Data.room.find(Number(id as string));
			delete room[id];
		
			return res.end(JSON.stringify(rooms));
			
			
			res.statusCode = 404;
			return res.send('해당 숙소 없음');
		} catch (e) {
			console.log(e);
		}
	}
	res.statusCode = 405;
	return res.end();
};

/** 타입스크립트 문법
 * Partial<T> : 인터페이스 안의 모든 속성을 Optional하게 변경
 * Pick<T, '속성명'> : 인터페이스의 속성들 중 일부만 받도록 설정
 *
 * Partial<Pick<StoredUserType, 'password'>>  : StoredUserType 타입 중에 password 속성만 required, 나머지는 optional
 */
