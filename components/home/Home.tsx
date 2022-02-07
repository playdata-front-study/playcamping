import React from "react";
import styled from "styled-components";
import SearchBar from "./searchBar/SearchBar";

const Container = styled.div`

	width: 100%;
	padding: 0 80px;
  .home-search-bar-label {
    margin: 32px 0 16px;
    font-weight: 600;
    font-size: 14px;
  }

	h2 {
		width: 480px;
		margin: 80px 0 60px;
		font-size: 50px;
	}
`;

const Home: React.FC = () => {
	return (
		<Container>
			<SearchBar />
			<h2>오늘은 어디로 캠핑을 떠나볼까?</h2>
		</Container>
	);
};

export default Home;
