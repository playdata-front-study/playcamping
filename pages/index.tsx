import axios from "axios";
import { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Home from "../components/home/Home";
import { meAPI } from "../lib/api/auth";
import { cookieStringToObject } from "../lib/utils";
import { wrapper } from "../store";
import { userActions } from "../store/user";

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

// export const getServerSideProps = wrapper.getServerSideProps(
// 	(store) => async () => {
// 	console.log("ddddddddddddd")

//   // const cookieObject = cookieStringToObject(context.req?.headers.cookie);

//   const { isLogged } = store.getState().user;
// 	console.log(isLogged)

//   try {
//     if (!isLogged ) {
//       // axios.defaults.headers.cookie = cookieObject.access_token;
//       const { data } = await meAPI();
//       store.dispatch(userActions.setLoggedUser(data));
//     }
//   } catch (e) {
//     console.log(e);
//   }
//   return {};
// });

export default index;
