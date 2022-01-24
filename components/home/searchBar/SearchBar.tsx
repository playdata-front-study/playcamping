import React from 'react';
import styled from 'styled-components';
import SearchCheckInDate from './SearchCheckInDate';
import SearchCheckOutDate from './SearchCheckOutDate';
import SearchLocation from './SearchLocation';
import palette from '../../../styles/palette';
import SearchGuest from './SearchGuest';

const Container = styled.div`
	width: 100%;
	height: 70px;
	display: flex;
	align-items: center;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
	border-radius: 12px;

	.search-bar-inputs {
		display: flex;
		align-items: center;
		width: 100%;
		.search-bar-input-devider {
			width: 1px;
			height: 44px;
			background-color: ${palette.gray};
		}
	}
`;

const SearchBar: React.FC = () => {
	return (
		<Container>
			<div className='search-bar-inputs'>
				<SearchLocation />
				<div className='search-bar-input-devider' />
				<SearchCheckInDate />
				<div className='search-bar-input-devider' />
				<SearchCheckOutDate />
				<div className='search-bar-input-devider' />
				<SearchGuest />
			</div>
		</Container>
	);
};

export default SearchBar;
