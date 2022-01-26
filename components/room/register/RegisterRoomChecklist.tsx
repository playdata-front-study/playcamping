import { isEmpty } from "lodash";
import React, { useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "../../../store";
import RegisterRoomCheckStep from "./RegisterRoomCheckStep";
import RegisterRoomFooter from "./RegisterRoomFooter";
import RegisterRoomSubmitFooter from "./RegisterRoomSubmitFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  min-height: 100vh;
  .register-room-checklist-info {
    margin-bottom: 39px;
  }
  ul {
    display: inline-flex;
    flex-direction: column;
  }
`;

const RegisterRoomChecklist: React.FC = () => {
  //이 페이지에서는 리렌더가 발생하는 일이 없도록 만들 예정이기 때문에..?
  //사ㅣ용하기 쉽도록 객체로 불러오도록 했다..?
  const registerRoom = useSelector((state) => state.registerRoom); //registerRoom 객체를 다 가져옴

  //* 위치 항목이 활성화됐는지
  const isLocationActived = useMemo(() => {
    const {
      latitude,
      longitude,
      country,
      city,
      district,
      streetAddress,
      detailAddress,
      postcode,
    } = registerRoom;
    if (
      !latitude ||
      !longitude ||
      !country ||
      !city ||
      !district ||
      !streetAddress ||
      !postcode
    ) {
      return false;
    }
    return true;
  }, []);

  //* 사진 항목이 다 채워져 있는지
  const isPhotoActived = useMemo(() => {
    const { photos } = registerRoom;
    //이거는 왜 isEmpty를 써야되는거지?
    if (isEmpty(photos)) {
      return false;
    }
    return true;
  }, []);

  //* 숙소 제목이 다 채워져 있는지
  const isTitleActived = useMemo(() => {
    const { title } = registerRoom;
    if (!title) {
      return false;
    }
    return true;
  }, []);

  //* 숙소 금액이 채워져 있는지
  const isPriceActived = useMemo(() => {
    const { price } = registerRoom;
    if (!price) {
      return false;
    }
    return true;
  }, []);

  //*예약 날짜가 채워져 있는지
  const isDateActived = useMemo(() => {
    const { startDate, endDate } = registerRoom;
    if (!startDate || !endDate) {
      //원래는 !isPriceActived도 체크를 해서 전 단계 누적 체크를 했었는데, 지웠음
      return false;
    }
    return true;
  }, []);

  //*진행중인 단계
  const stepInProgress = useMemo(() => {
    if (!isLocationActived) {
      return "location";
    }
    if (!isPhotoActived) {
      return "photo";
    }
    if (!isTitleActived) {
      return "title";
    }
    if (!isPriceActived) {
      return "price";
    }
    if (!isDateActived) {
      return "date";
    }
    return "";
  }, []);

  return (
    <Container>
      <p className='register-room-checklist-info'>
        캠핑장을 등록한 후 언제든 숙소를 수정할 수 있습니다.
      </p>
      <ul>
        <RegisterRoomCheckStep
          step='위치'
          href='/room/register/location'
          disabled={!isLocationActived}
          inProgress={stepInProgress === "location"}
        />
        <RegisterRoomCheckStep
          step='사진'
          href='/room/register/photo'
          disabled={!isPhotoActived}
          inProgress={stepInProgress === "photo"}
        />
        <RegisterRoomCheckStep
          step='제목'
          href='/room/register/title'
          disabled={!isTitleActived}
          inProgress={stepInProgress === "title"}
        />
        <RegisterRoomCheckStep
          step='요금'
          href='/room/register/price'
          disabled={!isPriceActived}
          inProgress={stepInProgress === "price"}
        />
        <RegisterRoomCheckStep
          step='예약 날짜'
          href='/room/register/date'
          disabled={!isDateActived}
          inProgress={stepInProgress === "date"}
        />
      </ul>
      {isDateActived ? (
        <RegisterRoomSubmitFooter />
      ) : (
        <RegisterRoomFooter
          prevHref='/room/register/date'
          nextHref={`/room/register/${stepInProgress}`}
        />
      )}
    </Container>
  );
};

export default RegisterRoomChecklist;
