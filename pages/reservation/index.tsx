import React from 'react';
import { NextPage } from 'next';
import ReservationMain from '../../components/reservation/ReservationMain';
import { wrapper } from '../../store';
import { getUserReservationAPI } from '../../lib/api/reservations';
import { reservationActions } from '../../store/reservation';
import { cookieStringToObject } from '../../lib/utils';
import axios from '../../lib/api';
import { meAPI } from '../../lib/api/auth';

const index: NextPage = () => {
	return <ReservationMain />;
};

// ServerSideProps 에서 dispatch 보내면 클라이언트측 state에 반영이 안된다....?
// export const getServerSideProps = wrapper.getServerSideProps(
// 	(store) =>
// 		async ({ req, res, ...etc }) => {
// 			console.log('getServerSideProps 실행');
// 			const userId = store.getState().user.id;
// 			try {
// 				if (userId) {
// 					const { data } = await getUserReservationAPI(userId);
// 					store.dispatch(reservationActions.setUserReservations(data));
// 				}
// 			} catch (e) {
// 				console.log(e);
// 			}
// 		}
// );

// InitialProps를 쓰려니.. 아직 app에서 유저정보를 store에 넣기 전이라 userId를 불러올수가없다.........?
index.getInitialProps = wrapper.getInitialPageProps(
	(store) =>
		async ({ req, res, ...etc }) => {
			// const userId = store.getState().user.id;
			const cookieObject = cookieStringToObject(req?.headers.cookie);
			const { isLogged } = store.getState().user;
			try {
				if (!isLogged && cookieObject.access_token) {
					axios.defaults.headers.cookie = cookieObject.access_token;
					const userRes = await meAPI();
					const userId = userRes.data.id;
					const { data } = await getUserReservationAPI(userId);
					store.dispatch(reservationActions.setUserReservations(data));
				}
			} catch (e) {
				console.log(e);
			}
		}
);

export default index;
