import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { searchSiteActions } from '../../../store/searchSite';
import palette from '../../../styles/palette';
import OutsideClickHandler from 'react-outside-click-handler';
import { useSelector } from '../../../store';
import { searchPlacesAPI } from '../../../lib/api/map';

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 70px;
	border: 2px solid transparent;
	border-radius: 12px;
	cursor: pointer;
	&:hover {
		border-color: ${palette.gray};
	}

	.search-bar-location-texts {
		position: absolute;
		width: calc(100% - 40px);
		top: 16px;
		left: 20px;

		.search-bar-location-label {
			font-size: 10px;
			font-weight: 800;
			margin-bottom: 4px;
		}

		input {
			width: 100%;
			border: 0;
			font-size: 14px;
			outline: none;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			&::placeholder {
				font-size: 14px;
				opacity: 0.7;
			}
		}
	}

	.search-bar-location-results {
		position: absolute;
		background-color: white;
		top: 78px;
		width: 500px;
		padding: 16px 0;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
		border-radius: 32px;
		cursor: default;
		overflow: hidden;
		z-index: 10;
		li {
			display: flex;
			align-items: center;
			height: 64px;
			padding: 8px 32px;
			cursor: pointer;
			&:hover {
				background-color: ${palette.whitegray};
			}
		}
	}
`;

const SearchLocation: React.FC = () => {
	const location = useSelector((state) => state.searchSite.location);
	const dispatch = useDispatch();
	const inputRef = useRef<HTMLInputElement | null>(null);

	const setLocationDispatch = (value: string) => {
		dispatch(searchSiteActions.setLocation(value));
	};
	const [popupOpened, setPopupOpened] = useState(false);

	const onClickInput = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
		setPopupOpened(true);
	};

	// 검색어가 변하면 장소 검색
	const searchPlaces = async () => {
		try {
			const { data } = await searchPlacesAPI(encodeURI(location));
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		if (location) {
			searchPlaces();
		}
	}, [location]);

	return (
		<Container onClick={onClickInput}>
			<OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
				<div className='search-bar-location-texts'>
					<p className='search-bar-location-label'>위치</p>
					<input
						value={location}
						onChange={(e) => setLocationDispatch(e.target.value)}
						placeholder='어디로 캠핑 가세요?'
						ref={inputRef}
					/>
				</div>
				{popupOpened && (
					<ul className='search-bar-location-results'>
						<li>근처 추천 장소</li>
					</ul>
				)}
			</OutsideClickHandler>
		</Container>
	);
};

export default SearchLocation;
