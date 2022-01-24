import React from 'react';
import styled from 'styled-components';
import RegisterLocation from '../../pages/room/register/RegisterLocation';
import SearchBar from './searchBar/searchBar';

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
