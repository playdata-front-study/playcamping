import React from "react";
import { NextPage } from "next";
import RegisterRoomAmenities from "../../../components/room/register/RegisterRoomAmenities";
import RegisterRoomChecklist from "../../../components/room/register/RegisterRoomChecklist";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const amenities: NextPage = () => {
  return (
    <Container>
      <RegisterRoomAmenities />
      <RegisterRoomChecklist />
    </Container>
  );
};

export default amenities;
