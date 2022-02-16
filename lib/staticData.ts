export const monthList = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

//1부터 31까지
export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

//2022년부터 1900년까지
export const yearList = Array.from(Array(123), (_, i) => String(2022 - i));

//캠핑 종류
export const campingTypeList = [
  "차박 (세미 오토캠핑)",
  "캠핑카 캠핑 (오토캠핑)",
  "가족 캠핑 (3인 이상)",
  "솔로 캠핑 (1인)",
  "애견 동반 캠핑",
  "팀캠핑",
  "미니멀 캠핑",
  "감성 캠핑",
  "원정 캠핑",
  "글램핑",
  "도시 캠핑",
  "옥상 캠핑",
];

//편의 시설
export const amenitiesList = [
  "바비큐장",
  "수영장",
  "반려동물",
  "글램핑",
  "카라반",
  "와이파이",
  "침대방",
  "계곡",
  "바닷가",
  "화장실/샤워실",
];
