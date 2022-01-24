import { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import Home from "../components/home/Home";

const Container = styled.div`
  font-size: 21px;
  color: gray;
`;

const index: NextPage = () => {
  return (
    <Container>
      플레이캠핑 사이트를 만들어보자 :)
      <Home />
    </Container>
  );
};

export default index;
