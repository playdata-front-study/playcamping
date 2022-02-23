import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import Textarea from "../../common/Textarea";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray};
    margin-bottom: 6px;
  }
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-room-description-wrapper {
    width: 430px;
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const RegisterRoomDescription: React.FC = () => {
  const dispatch = useDispatch();

  const description = useSelector((state) => state.registerRoom.description);

  //* 숙소 설명 변경시
  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(registerRoomActions.setDescription(e.target.value));

  return (
    <Container>
      <h2>💬 게스트에게 숙소에 대해 설명해주세요.</h2>
      <h3>7단계</h3>
      <p className="register-room-description-wrapper">
        숙소의 장점, 특별한 편의시설(예: 빠른 와이파이 또는 주차 시설)과 주변
        지역의 매력을 소개해주세요.
      </p>
      <div className="register-room-description-wrapper">
        <Textarea value={description} onChange={onChangeDescription} />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/title"
        nextHref="/room/register/price"
      />
    </Container>
  );
};

export default RegisterRoomDescription;
