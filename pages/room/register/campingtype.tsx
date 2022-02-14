import React from "react";
import { NextPage } from "next";
import RegisterRoomCampingType from "../../../components/room/register/RegisterRoomCampingType";
import styled from "styled-components";
import RegisterRoomChecklist from "../../../components/room/register/RegisterRoomChecklist";

const Container = styled.div`
  display: flex;
`;

const campingtype: NextPage = () => {
  return (
    <Container>
      <RegisterRoomCampingType />
      <RegisterRoomChecklist />
    </Container>
  );
};

export default campingtype;
