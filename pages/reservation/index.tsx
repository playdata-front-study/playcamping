import React from "react";
import { NextPage } from "next";
import ReservationMain from "../../components/reservation/ReservationMain";
import { wrapper } from "../../store";
import { getUserReservationAPI } from "../../lib/api/reservations";
import { reservationActions } from "../../store/reservation";

const index: NextPage = () => {
  return <ReservationMain />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const userId = store.getState().user.id;
      try {
        if (userId) {
          const { data } = await getUserReservationAPI(userId);
          store.dispatch(reservationActions.setUserReservations(data));
        }
      } catch (e) {
        console.log(e);
      }
    }
);

export default index;
