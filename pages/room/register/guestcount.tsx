import React from "react";
import { NextPage } from "next";
import RegisterRoomGuestCount from "../../../components/room/register/RegisterRoomGuestCount";
import styled from "styled-components";
import RegisterRoomChecklist from "../../../components/room/register/RegisterRoomChecklist";

const Container = styled.div`
  display: flex;
`;

const guestcount: NextPage = () => {
  return (
    <Container>
      <RegisterRoomGuestCount />
      <RegisterRoomChecklist />
    </Container>
  );
};

export default guestcount;
