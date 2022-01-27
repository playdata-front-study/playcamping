import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";

// const RegisterRoomGeometry = dynamic(
//   import("../../../components/room/register/RegisterRoomGeometry"),
//   { ssr: false }
// );

//next의 dynamic을 사용하면
//클라이언트 단에서 동적으로 컴포는트를 import하기 때문에
//그 안에 있는 window를 호출하는데 문제없다고?????

/** 컴포넌트를 dynamic을 사용하여 서버사이트 렌더링을 하지 않고 불러옴
 * 컴포넌트 안에서 window를 사용하므로
 * dynamic을 사용하여 서버사이드 렌더링을 막음
 * dynamic을 사용하지 않고 그냥 import하면 window is undefined를 만나게됨
 * 서버에서는 window와 document를 사용할 수 없기 때문이다!!
 */
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
