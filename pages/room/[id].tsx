import React from "react";
import { NextPage } from "next";
import { wrapper } from "../../store";
import RoomDetail from "../../components/room/detail/RoomDetail";
import { getRoomAPI } from "../../lib/api/rooms";
import { roomActions } from "../../store/room";
import { getRoomReservationAPI } from "../../lib/api/reservations";
import { reservationActions } from "../../store/reservation";

const roomDetail: NextPage = () => {
  return <RoomDetail />;
};

roomDetail.getInitialProps = wrapper.getInitialPageProps(
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

// export const getServerSideProps = wrapper.getServerSideProps(
// 	(store) =>
// 		async ({ req, res, ...etc }) => {
// 			console.log('***************************');
// 			console.log(etc);
// 			const id = etc.query.id;

// 			try {
// 				if (id) {
// 					const { data } = await getRoomAPI(Number(id as string));
// 					store.dispatch(roomActions.setDetailRoom(data));
// 				}
// 			} catch (e) {
// 				console.log(e);
// 			}
// 			return {};
// 		}
// );

export default roomDetail;
