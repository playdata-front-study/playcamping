import { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import Home from "../components/home/Home";
import { wrapper } from "../store";
import { roomActions } from "../store/room";
import Data from "../lib/data";

const Container = styled.div`
  font-size: 21px;
  color: gray;
`;

const index: NextPage = () => {
  return (
    <Container>
      <Home />
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const data = await Data.room.getList(); //rooms.json에서 리스트 가져오기
      store.dispatch(roomActions.setRooms(data.slice(0, 5))); //앞에 5개만 가져옴.
    } catch (e) {
      console.log(e);
    }
    return {};
  }
);

export default index;
