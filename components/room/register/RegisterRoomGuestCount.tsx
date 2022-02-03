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
      <h2>👪캠핑장에 얼마나 많은 인원이 숙박할 수 있나요?</h2>
      <h3>1단계</h3>
      <div className='register-room-maximum-guest-count-wrapper'>
        <Counter
          label='최대 숙박 인원'
          value={maximumGuestCount}
          onChange={onChangeMaximumGuestCount}
        />
      </div>
      <RegisterRoomChecklist />
      <RegisterRoomFooter
        isValid={false}
        prevHref='/'
        nextHref='/room/register/location'
      />
    </Container>
  );
};

export default RegisterRoomGuestCount;
