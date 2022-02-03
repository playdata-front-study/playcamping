import React, { useState } from 'react';
import { NextPage } from 'next';
import { wrapper } from '../../store';
import RoomDetail from '../../components/room/detail/RoomDetail';
import { getRoomAPI } from '../../lib/api/rooms';
import { roomActions } from '../../store/room';

const roomDetail: NextPage = () => {
	return <RoomDetail />;
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req, res, ...etc }) => {
			console.log('***************************');
			console.log(etc);
			const id = etc.query.id;

			try {
				if (id) {
					const { data } = await getRoomAPI(Number(id as string));
					store.dispatch(roomActions.setDetailRoom(data));
				}
			} catch (e) {
				console.log(e);
			}
			return {};
		}
);

export default roomDetail;
