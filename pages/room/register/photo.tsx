import React from "react";
import { NextPage } from "next";
import RegisterRoomPhoto from "../../../components/room/register/RegisterRoomPhoto";
import styled from "styled-components";
import RegisterRoomChecklist from "../../../components/room/register/RegisterRoomChecklist";

const Container = styled.div`
  display: flex;
`;

const photo: NextPage = () => {
  return (
    <Container>
      <RegisterRoomPhoto />
      <RegisterRoomChecklist />
    </Container>
  );
};

export default photo;
