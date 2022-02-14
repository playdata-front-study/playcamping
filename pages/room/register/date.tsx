import React, { useMemo } from "react";
import { NextPage } from "next";
import RegisterRoomDate from "../../../components/room/register/RegisterRoomDate";
import styled from "styled-components";
import RegisterRoomChecklist from "../../../components/room/register/RegisterRoomChecklist";
import RegisterRoomSubmitFooter from "../../../components/room/register/RegisterRoomSubmitFooter";
import RegisterRoomFooter from "../../../components/room/register/RegisterRoomFooter";
import { isEmpty } from "lodash";
import { useSelector } from "../../../store";

const Container = styled.div`
  display: flex;
`;

const date: NextPage = () => {
  const registerRoom = useSelector((state) => state.registerRoom); //registerRoom 객체를 다 가져옴

  //* 캠핑장 종류가 활성화됐는지
  const isCampingTypeActived = useMemo(() => {
    const { campingType } = registerRoom;
    if (!campingType) {
      return false;
    }
    return true;
  }, []);

  //* 편의 시설이 활성화됐는지
  const isAmenitiesActived = useMemo(() => {
    const { amenities } = registerRoom;
    if (isEmpty(amenities)) {
      return false;
    }
    return true;
  }, []);

  //* 최대 인원수가 활성화됐는지
  const isMaximumGuestCountActived = useMemo(() => {
    const { maximumGuestCount } = registerRoom;
    if (!maximumGuestCount) {
      return false;
    }
    return true;
  }, []);

  //* 위치 항목이 활성화됐는지
  const isLocationActived = useMemo(() => {
    const { latitude, longitude, city, district, streetAddress, postcode } =
      registerRoom;
    if (
      !latitude ||
      !longitude ||
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

  //* 숙소 설명이 다 채워져 있는지
  const isDescriptionActived = useMemo(() => {
    const { description } = registerRoom;
    if (!description) {
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
  return (
    <Container>
      <RegisterRoomDate />
      <RegisterRoomChecklist />
      {isCampingTypeActived &&
      isAmenitiesActived &&
      isDescriptionActived &&
      isMaximumGuestCountActived &&
      isLocationActived &&
      isPhotoActived &&
      isTitleActived &&
      isPriceActived &&
      isDateActived ? (
        <RegisterRoomSubmitFooter />
      ) : (
        <RegisterRoomFooter
          prevHref="/room/register/price"
          nextHref={`/room/register/checklist`}
        />
      )}
    </Container>
  );
};

export default date;
