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
  "무선 인터넷",
  "TV",
  "냉장고",
  "전기 포트",
  "난방",
  "에어컨",
  "다리미",
  "샴푸",
  "헤어 드라이어",
  "조식, 커피, 차",
  "이동식 난로",
  "개인 화장실/샤워실",
];
