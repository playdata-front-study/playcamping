import React, { useState } from 'react';
import { NextPage } from 'next';
import { wrapper } from '../../store';
import { getRoomAPI } from '../../lib/api/rooms';
import { roomActions } from '../../store/room';
import { getRoomReservationAPI } from '../../lib/api/reservations';
import { reservationActions } from '../../store/reservation';
import HostRoomDetail from '../../components/manage/HostRoomDetail';

const HostRoom: NextPage = () => {
	return <HostRoomDetail />;
};

HostRoom.getInitialProps = wrapper.getInitialPageProps(
	(store) =>
		async ({ req, res, ...etc }) => {
			const id = etc.query.id;
			try {
				if (id) {
					const roomRes = await getRoomAPI(Number(id as string));
					const reservationRes = await getRoomReservationAPI(
						Number(id as string)
					);
					store.dispatch(roomActions.setDetailRoom(roomRes.data));
					store.dispatch(
						reservationActions.setRoomReservations(reservationRes.data)
					);
				}
			} catch (e) {
				console.log(e);
			}
			return {};
		}
);

export default HostRoom;
