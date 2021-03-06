import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { amenitiesList } from "../../../lib/staticData";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import CheckboxGroup from "../../common/CheckboxGroup";
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
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
`;

const RegisterRoomAmenities: React.FC = () => {
  const amenities = useSelector((state) => state.registerRoom.amenities);

  const dispatch = useDispatch();

  const onChangeAmenities = (selected: string[]) => {
    dispatch(registerRoomActions.setAmenities(selected));
  };

  return (
    <Container>
      <h2>πΏ μ΄λ€ νΈμ μμ€μ μ κ³΅νμλμ?</h2>
      <h3>2λ¨κ³</h3>
      <p className="register-room-step-info">
        μΌλ°μ μΌλ‘ κ²μ€νΈκ° κΈ°λνλ νΈμ μμ€ λͺ©λ‘μλλ€. μμλ₯Ό λ±λ‘ν μ
        μΈμ λ  νΈμ μμ€μ μΆκ°ν  μ μμ΄μ.
      </p>
      <div className="register-room-amenities-checkbox-group-wrapper">
        <CheckboxGroup
          value={amenities}
          onChange={onChangeAmenities}
          options={amenitiesList}
        />
      </div>
      <RegisterRoomFooter
        isValid={false}
        prevHref="/room/register/campingtype"
        nextHref="/room/register/guestcount"
      />
    </Container>
  );
};

export default RegisterRoomAmenities;
