import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
	TypedUseSelectorHook,
	useSelector as useReduxSelector,
} from 'react-redux';
import common from './common';
import searchSite from './searchRoom';
import user from './user';
import registerRoom from './registerRoom';
import auth from './auth';
import room from './room';
import reservation from './reservation';

const rootReducer = combineReducers({
	common: common.reducer,
	user: user.reducer,
	auth: auth.reducer,
	registerRoom: registerRoom.reducer,
	searchRoom: searchSite.reducer,
	room: room.reducer,
	reservation: reservation.reducer,
});

//* 스토어의 타입
export type RootState = ReturnType<typeof rootReducer>;
let initialRootState: RootState;

const reducer = (state: any, action: any) => {
	if (action.type === HYDRATE) {
		// if (state === initialRootState) {
		/**
		 * 이부분이 페이지에서 getStaticProps로 디스패치 보냈을때 클라이언트에 반영 안되는 이유였음
		 * 클라이언트 측의 state가 initialRootState, 즉 타입이 RootState이고 빈 상태인 경우에만 hydrate가 발생하도록 해서
		 * 스토어가 여러번 덮어씌워지는 걸 방지할려고 넣은 조건 같은데
		 * _app에서 유저 정보를 저장하는 initialAppProps가 실행된 후 다른 페이지에서 serverSideProps 내에서 또 dispatch를 보내면
		 * 이미 스토어가 빈 상태가 아니기 때문에(유저정보 있음) 클라이언트측 스토어가 덮어씌워지지 않음
		 */
		return {
			...state,
			...action.payload,
		};
		// }
		// return state;
	}
	return rootReducer(state, action);
};

//* 타입 지원되는 커스텀 useSelector 만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore<any> = () => {
	const store = configureStore({
		reducer,
		devTools: true,
	});
	initialRootState = store.getState();
	return store;
};

export const wrapper = createWrapper(initStore, { debug: true });
