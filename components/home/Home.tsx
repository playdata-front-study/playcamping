import React from "react";
import RegisterRoomGeometry from "../room/register/RegisterRoomGeometry";
import RegisterRoomLocation from "../room/register/RegisterRoomLocation";

const Home: React.FC = () => {
  return (
    <div>
      <RegisterRoomLocation />
      <RegisterRoomGeometry />
    </div>
  );
};

export default Home;
