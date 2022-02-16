import React from "react";
import { NextPage } from "next";
import RegisterRoomChecklist from "../../../components/room/register/RegisterRoomChecklist";
import RegisterRoomSubmitFooter from "../../../components/room/register/RegisterRoomSubmitFooter";
import styled from "styled-components";
import palette from "../../../styles/palette";

const Container = styled.div`
  h3 {
    font-size: x-large;
    font-weight: bold;
    color: ${palette.gray};
    margin-bottom: 0;
    margin-left: 40px;
    margin-top: 50px;
  }
`;

const checklist: NextPage = () => {
  return (
    <Container>
      <h3>마지막으로 빠진 건 없는지 확인해주세요!</h3>
      <RegisterRoomChecklist />
      <RegisterRoomSubmitFooter />
    </Container>
  );
};

export default checklist;
