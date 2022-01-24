import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";

// const RegisterRoomGeometry = dynamic(
//   //dynamic은 뭐하는 애야..?
//   import("../../../components/room/register/RegisterRoomGeometry"),
//   { ssr: false }
// );

//next의 dynamic을 사용하면
//클라이언트 단에서 동적으로 컴포는트를 import하기 때문에
//그 안에 있는 window를 호출하는데 문제없다고?????
const RegisterRoomGeometry = dynamic(
  () => import("../../../components/room/register/RegisterRoomGeometry"),
  {
    ssr: false,
  }
);

const geometry: NextPage = () => {
  return <RegisterRoomGeometry />;
};

export default geometry;
