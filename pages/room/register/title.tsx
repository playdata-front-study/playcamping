import React from "react";
import { NextPage } from "next";
import RegisterRoomTitle from "../../../components/room/register/RegisterRoomTitle";
import styled from "styled-components";
import RegisterRoomChecklist from "../../../components/room/register/RegisterRoomChecklist";

const Container = styled.div`
  display: flex;
`;

const title: NextPage = () => {
  return (
    <Container>
      <RegisterRoomTitle />
      <RegisterRoomChecklist />
    </Container>
  );
};

export default title;
