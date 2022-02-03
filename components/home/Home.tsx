import React from 'react';
import styled from 'styled-components';
import SearchBar from './searchBar/SearchBar';

const Container = styled.div`
	width: 100%;
	padding: 0 80px;
`;

const Home: React.FC = () => {
	return (
		<Container>
			<p className='home-search-bar-label'>숙소</p>
			<SearchBar />
		</Container>
	);
};

export default Home;
