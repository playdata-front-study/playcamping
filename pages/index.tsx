import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import Home from '../components/home/Home';
import axios from '../lib/api';
import { meAPI } from '../lib/api/auth';
import { cookieStringToObject } from '../lib/utils';
import { wrapper } from '../store';
import { userActions } from '../store/user';

const Container = styled.div`
	font-size: 21px;
	color: gray;
`;

const index: NextPage = () => {
	return (
		<Container>
			<Home />
		</Container>
	);
};

// 로그인 유지하기 - 모든 컴포넌트에서 로그인한 유저 정보 받아올 수 있도록 리덕스 스토어에 저장하기
// 이렇게하면안됨 ㅠㅠ
// export const getServerSideProps = wrapper.getServerSideProps(
// 	(store) => async (ctx) => {
// 		console.log('index 의 getServerSideProps');
// 		const cookieObject = cookieStringToObject(ctx.req?.headers.cookie);
// 		const { isLogged } = store.getState().user;
// 		console.log(cookieObject);
// 		console.log(isLogged);

// 		try {
// 			if (!isLogged && cookieObject.access_token) {
// 				axios.defaults.headers.cookie = cookieObject.access_token;
// 				const { data } = await meAPI();
// 				store.dispatch(userActions.setLoggedUser(data));
// 			}
// 		} catch (e) {
// 			console.log(e);
// 		}
// 		return {};
// 	}
// );

export default index;
