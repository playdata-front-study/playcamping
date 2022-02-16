import { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import RegisterRoomChecklist from "../../../components/room/register/RegisterRoomChecklist";
import RegisterRoomLocation from "../../../components/room/register/RegisterRoomLocation";

const Container = styled.div`
  display: flex;
`;

const location: NextPage = () => {
  return (
    <Container>
      <RegisterRoomLocation />
      <RegisterRoomChecklist />
    </Container>
  );
};

export default location;
