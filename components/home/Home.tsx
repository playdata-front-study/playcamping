import React from "react";
import RegisterRoomDate from "../room/register/RegisterRoomDate";
import RegisterRoomGeometry from "../room/register/RegisterRoomGeometry";
import RegisterRoomLocation from "../room/register/RegisterRoomLocation";
import RegisterRoomPrice from "../room/register/RegisterRoomPrice";
import RegisterRoomTitle from "../room/register/RegisterRoomTitle";

const Home: React.FC = () => {
  return (
    <div>
      <RegisterRoomLocation />
      <RegisterRoomGeometry />
      <RegisterRoomTitle />
      {/* <RegisterRoomPrice /> */}
      {/* <RegisterRoomDate /> */}
    </div>
  );
};

export default Home;
