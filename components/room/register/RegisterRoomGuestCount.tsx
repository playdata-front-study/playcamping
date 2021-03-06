import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import Counter from "../../common/Counter";
import RegisterRoomChecklist from "./RegisterRoomChecklist";
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
  .register-room-maximum-guest-count-wrapper {
    width: 320px;
    margin-top: 24px;
    margin-bottom: 32px;
  }
`;

const RegisterRoomGuestCount: React.FC = () => {
  const maximumGuestCount = useSelector(
    (state) => state.registerRoom.maximumGuestCount
  );

  const dispatch = useDispatch();

  const onChangeMaximumGuestCount = (value: number) => {
    dispatch(registerRoomActions.setMaximumGuestCount(value));
  };

  return (
    <Container>
      <h2>πͺ μΊ νμ₯μ μΌλ§λ λ§μ μΈμμ΄ μλ°ν  μ μλμ?</h2>
      <h3>3λ¨κ³</h3>
      <div className="register-room-maximum-guest-count-wrapper">
        <Counter
          label="μ΅λ μλ° μΈμ"
          value={maximumGuestCount}
          onChange={onChangeMaximumGuestCount}
        />
      </div>
      <RegisterRoomFooter
        isValid={false}
        prevHref="/room/register/amenities"
        nextHref="/room/register/location"
      />
    </Container>
  );
};

export default RegisterRoomGuestCount;
