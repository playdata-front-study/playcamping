import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import RegisterRoomFooter from "./RegisterRoomFooter";
import palette from "../../../styles/palette";
import { useSelector } from "../../../store";
import Input from "../../common/Input";
import { makeMoneyString } from "../../../lib/utils";
import { registerRoomActions } from "../../../store/registerRoom";

const Container = styled.div`
  padding: 62px 30px 100px;
  width: 445px;
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
`;

const RegisterRoomPrice: React.FC = () => {
  const price = useSelector((state) => state.registerRoom.price);

  const dispatch = useDispatch();

  //금액 변경 시
  const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    if (!input) {
      dispatch(registerRoomActions.setPrice(0));
    }

    const numberPrice = Number(input.replace(/,/g, ""));
    //? 인풋 값이 비워지면 price를 0으로 변경
    if (!numberPrice || numberPrice === 0) {
      dispatch(registerRoomActions.setPrice(0));
    }
    if (numberPrice !== 0) {
      dispatch(registerRoomActions.setPrice(numberPrice));
    }
  };

  //숙소 가격은 공통 인풋 컴포넌트를 사용하지만 입력 값을 숫자만 받게 하려고 함
  //저장하는 price 값의 타입은 number이고 인풋 컴포넌트에 들어가는 value값의 타입은 string
  // ? 왜 string으로 value를 받는거지???
  return (
    <Container>
      <h2>💸 캠핑장 요금 설정하기</h2>
      <h3>8단계</h3>
      <Input
        label="기본요금"
        value={makeMoneyString(String(price))}
        onChange={onChangePrice}
      />
      <RegisterRoomFooter
        prevHref="/room/register/description"
        nextHref="/room/register/date"
      />
    </Container>
  );
};

export default RegisterRoomPrice;
