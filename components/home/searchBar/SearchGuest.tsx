import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from '../../../store';
import palette from '../../../styles/palette';
import OutsideClickHandler from 'react-outside-click-handler';
import SearchButton from './SearchButton';
import Counter from '../../common/Counter';
import { searchSiteActions } from '../../../store/searchSite';
import { useDispatch } from 'react-redux';

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

	> div {
		width: 100%;
		height: 100%;
	}
	.search-bar-guests-texts {
		position: absolute;
		width: calc(100% - 114px);
		top: 16px;
		left: 20px;
	}
	.search-bar-guests-label {
		font-size: 10px;
		font-weight: 800;
		margin-bottom: 4px;
	}
	.search-bar-guests-popup {
		position: absolute;
		width: 394px;
		top: 78px;
		right: 0;
		padding: 16px 32px;
		background-color: white;
		border-radius: 32px;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
		cursor: default;
	}
	.search-bar-guests-counter-wrapper {
		padding: 16px 0;
		border-bottom: 1px solid ${palette.lightgray};
		&:last-child {
			border: 0;
		}
	}
	.search-bar-guests-text {
		font-size: 14px;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.search-bar-button-wrapper {
		position: absolute;
		right: 0;
		top: 9px;
		right: 12px;
	}
`;

const SearchGuest: React.FC = () => {
	const [popupOpened, setPopupOpened] = useState(false);
	const adultCount = useSelector((state) => state.searchSite.adultCount);
	const childrenCount = useSelector((state) => state.searchSite.childrenCount);
	const dispatch = useDispatch();

	const setAdultCountDispatch = (value: number) => {
		dispatch(searchSiteActions.setAdultCount(value));
	};

	const setChildrenCountDispatch = (value: number) => {
		dispatch(searchSiteActions.setChildrenCount(value));
	};

	return (
		<Container onClick={() => setPopupOpened(true)}>
			<OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
				<div className='search-bar-guests-texts'>
					<p className='search-bar-guests-label'>인원</p>
					<p className='search-bar-guests-text'>
						성인 {adultCount}명{' '}
						{childrenCount > 0 && `, 아동 ${childrenCount}명`}
					</p>
				</div>
				<div className='search-bar-button-wrapper'>
					<SearchButton />
				</div>

				{popupOpened && (
					<div className='search-bar-guests-popup'>
						<div className='search-bar-guests-counter-wrapper'>
							<Counter
								label='성인'
								description='만 13세 이상'
								minValue={1}
								value={adultCount}
								onChange={(count) => {
									setAdultCountDispatch(count);
								}}
							/>
						</div>
						<div className='search-bar-guests-counter-wrapper'>
							<Counter
								label='어린이'
								description='12세 이하'
								value={childrenCount}
								onChange={(count) => setChildrenCountDispatch(count)}
							/>
						</div>
					</div>
				)}
			</OutsideClickHandler>
		</Container>
	);
};

export default SearchGuest;
