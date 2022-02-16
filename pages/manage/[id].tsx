import React, { useState } from 'react';
import { NextPage } from 'next';
import { wrapper } from '../../store';
import { getHostRoomListAPI, getRoomAPI } from '../../lib/api/rooms';
import { roomActions } from '../../store/room';
import { getRoomReservationAPI } from '../../lib/api/reservations';
import { reservationActions } from '../../store/reservation';
import HostRoomDetail from '../../components/manage/HostRoomDetail';

const HostRoom: NextPage = () => {
	return <HostRoomDetail />;
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req, res, ...etc }) => {
			const userId = etc.query.id;
			try {
				if (userId) {
					const roomRes = await getRoomAPI(Number(userId as string));
					const reservationRes = await getRoomReservationAPI(
						Number(userId as string)
					);
					
					store.dispatch(roomActions.setDetailRoom(roomRes.data));
					store.dispatch(
						reservationActions.setRoomReservations(reservationRes.data)
					);
				}
			} catch (e) {
				console.log(e);
			}
		}
);

export default HostRoom;
