import React from "react";
import { NextPage } from "next";
import RegisterRoomPrice from "../../../components/room/register/RegisterRoomPrice";
import styled from "styled-components";
import RegisterRoomChecklist from "../../../components/room/register/RegisterRoomChecklist";

const Container = styled.div`
  display: flex;
`;

const price: NextPage = () => {
  return (
    <Container>
      <RegisterRoomPrice />
      <RegisterRoomChecklist />
    </Container>
  );
};

export default price;
