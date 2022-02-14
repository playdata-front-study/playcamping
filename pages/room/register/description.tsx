import React from "react";
import { NextPage } from "next";
import RegisterRoomDescription from "../../../components/room/register/RegisterRoomDescription";
import styled from "styled-components";
import RegisterRoomChecklist from "../../../components/room/register/RegisterRoomChecklist";

const Container = styled.div`
  display: flex;
`;

const description: NextPage = () => {
  return (
    <Container>
      <RegisterRoomDescription />
      <RegisterRoomChecklist />
    </Container>
  );
};

export default description;
