import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "../types/reduxState";

//* 초기 상태 여기서 CommonState는 사용자정의 이름이다..? 아니 types/reduxState.d.ts 에 정의된거
const initialState: CommonState = {
  validateMode: false,
};

//* 리듀서
const common = createSlice({
  //Slice를 만들어?
  name: "common",
  initialState,
  reducers: {
    //* validateMode 변경하기
    setValidateMode(state, action: PayloadAction<boolean>) {
      state.validateMode = action.payload;
    },
  },
});

//* 액션
export const commonActions = { ...common.actions };

export default common;
