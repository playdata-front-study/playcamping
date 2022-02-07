import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from '../../../store';
import palette from '../../../styles/palette';
import Button from '../../common/Button';
import DatePicker from '../../common/DatePicker';
import OutsideClickHandler from 'react-outside-click-handler';
import Counter from '../../common/Counter';
import useModal from '../../../hooks/useModal';
import AuthModal from '../../auth/AuthModal';
import { useRouter } from 'next/router';
import { makeReservationAPI } from '../../../lib/api/reservations';
import { isEmpty } from 'lodash';

const Container = styled.div`
	position: sticky;
	top: 128px;
	padding: 24px 24px 16px;
	width: 362px;
	height: fit-content;
	background-color: white;
	box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12);
	border-radius: 12px;

	.room-detail-reservation-info {
		font-size: 22px;
		font-weight: 600;
		margin-bottom: 24px;
	}
	.room-detail-reservation-inputs {
		width: 100%;
		margin-bottom: 16px;
		border: 1px solid ${palette.lightgray};
		border-radius: 8px;

		.room-detail-reservation-date-inputs {
			position: relative;
			display: flex;
			width: 100%;
			height: 56px;
			border-bottom: 1px solid ${palette.lightgray};

			.room-detail-reservation-check-in {
				position: relative;
				width: 50%;
				height: 100%;
				top: 0;
				left: 0;
				border-radius: 8px 0 0 0;
				label {
					display: block;
					width: 100%;
					height: 100%;
					padding: 10px 12px;
					font-size: 10px;
					font-weight: 600;
					border-radius: 8px 0 0 0;
					cursor: pointer;
					border-right: 1px solid ${palette.lightgray};
					input {
						width: 100%;
						margin-top: 7px;
						padding: 0;
						border: 0;
						outline: none;
					}
				}
			}
			.room-detail-reservation-check-out {
				position: relative;
				width: 50%;
				height: 100%;
				top: 0;
				right: 0;
				border-radius: 8px 0 0 0;
				label {
					display: block;
					width: 100%;
					height: 100%;
					padding: 10px 12px;
					font-size: 10px;
					font-weight: 600;
					border-radius: 0 8px 0 0;
					cursor: pointer;
					input {
						width: 100%;
						margin-top: 7px;
						padding: 0;
						border: 0;
						outline: none;
					}
				}
			}
		}
		.room-detail-reservation-guests-count-wrapper {
			position: relative;
			.room-detail-reservation-guests-count {
				width: 100%;
				height: 56px;
				border-radius: 0 0 8px 8px;
				padding: 10px 12px;
				cursor: pointer;
				span {
					display: block;
					font-size: 10px;
					font-weight: 600;
					margin-bottom: 7px;
				}
				p {
					font-size: 14px;
					color: ${palette.black};
				}
			}
			.room-detail-reservation-guests-popup {
				position: absolute;
				width: 100%;
				top: 60px;
				left: 0;
				padding: 16px;
				background-color: white;
				border-radius: 4px;
				box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
				cursor: default;

				.room-detail-reservation-guests-info {
					font-size: 14px;
					margin-top: 24px;
					color: ${palette.gray};
				}
			}
			.mb-24 {
				margin-bottom: 24px;
			}
		}
	}
	.room-detail-reservation-price-date {
		margin-top: 24px;
		margin-bottom: 16px;
		span {
			float: right;
		}
	}
	.room-detail-reservation-total-price {
		padding-top: 24px;
		border-top: 1px solid ${palette.lightgray};
		font-size: 16px;
		font-weight: 800;
		span {
			float: right;
		}
	}
`;

const RoomDetailReservation: React.FC = () => {
	const room = useSelector((state) => state.room.detail);
	if (!room) {
		return null;
	}
	const userId = useSelector((state) => state.user.id);
	// 해당 숙소 예약마감된 날짜들
	const reservations = useSelector(
		(state) => state.reservation.roomReservations
	);
	const checkInBlockDates: string[] = [];
	const checkOutBlockDates: string[] = [];
	reservations.forEach((v) => {
		const start = new Date(v.checkInDate);
		while (start < new Date(v.checkOutDate)) {
			checkInBlockDates.push(start.toISOString());
			start.setDate(start.getDate() + 1);
		}
		const end = new Date(v.checkOutDate);
		while (end > new Date(v.checkInDate)) {
			checkOutBlockDates.push(end.toISOString());
			end.setDate(end.getDate() - 1);
		}
	});

	const { openModal, ModalPortal, closeModal } = useModal();

	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [adultCount, setAdultCount] = useState(1);
	const [childrenCount, setChildrenCount] = useState(0);
	const [guestCountPopupOpened, setGuestCountPopupOpened] = useState(false);
	const checkInRef = useRef<HTMLLabelElement>(null);
	const checkOutRef = useRef<HTMLLabelElement>(null);
	const router = useRouter();

	// 예약하기 클릭시
	const onClickReservationButton = async () => {
		if (!userId) {
			openModal();
		} else if (checkInRef.current && !startDate) {
			checkInRef.current.focus();
		} else if (checkOutRef.current && !endDate) {
			checkOutRef.current.focus();
		} else {
			try {
				const body = {
					roomId: room.id,
					userId,
					checkInDate: startDate!.toISOString(),
					checkOutDate: endDate!.toISOString(),
					adultCount,
					childrenCount,
				};
				await makeReservationAPI(body);
				alert('예약이 완료되었습니다.');
				router.push('/');
			} catch (e) {
				console.log(e);
			}
		}
	};
	const getGuestCountText = useMemo(
		() => `인원 ${adultCount + childrenCount}명`,
		[adultCount, childrenCount]
	);

	return (
		<Container>
			<p className='room-detail-reservation-info'>
				요금을 확인하려면 날짜를 입력하세요.
			</p>
			<div className='room-detail-reservation-inputs'>
				<div className='room-detail-reservation-date-inputs'>
					<div className='room-detail-reservation-check-in'>
						<label ref={checkInRef}>
							체크인
							<DatePicker
								placeholderText='날짜 추가'
								// popperPlacement='top-end'
								disabledKeyboardNavigation
								onChange={(date) => setStartDate(date as Date)}
								selected={startDate}
								openToDate={new Date()}
								selectsStart
								startDate={startDate as Date}
								endDate={new Date(endDate as Date)}
								minDate={new Date(room.startDate)}
								maxDate={new Date(room.endDate)}
								excludeDates={checkInBlockDates.map((v) => new Date(v))} // 이미 예약된 날짜 선택 못하게
							/>
						</label>
					</div>
					<div className='room-detail-reservation-check-out'>
						<label ref={checkOutRef}>
							체크아웃
							<DatePicker
								placeholderText='날짜 추가'
								// popperPlacement='top-end'
								disabledKeyboardNavigation
								onChange={(date) => setEndDate(date as Date)}
								selected={endDate}
								openToDate={new Date()}
								selectsEnd
								startDate={startDate as Date}
								endDate={new Date(endDate as Date)}
								minDate={new Date(room.startDate)}
								maxDate={new Date(room.endDate)}
								excludeDates={checkOutBlockDates.map((v) => new Date(v))}
							/>
						</label>
					</div>
				</div>
				<div className='room-detail-reservation-guests-count-wrapper'>
					<OutsideClickHandler
						onOutsideClick={() => {
							setGuestCountPopupOpened(false);
						}}>
						<div
							role='presentation'
							className='room-detail-reservation-guests-count'
							onClick={() => {
								setGuestCountPopupOpened(!guestCountPopupOpened);
							}}>
							<span>인원</span>
							<p>{getGuestCountText}</p>
						</div>
						{guestCountPopupOpened && (
							<div className='room-detail-reservation-guests-popup'>
								<div className='mb-24'>
									<Counter
										label='성인'
										description='만 13세 이상'
										minValue={1}
										value={adultCount}
										onChange={(count) => setAdultCount(count)}
									/>
								</div>
								<div className='mb-24'>
									<Counter
										label='어린이'
										description='만 12세 이하'
										value={childrenCount}
										onChange={(count) => setChildrenCount(count)}
									/>
									<p className='room-detail-reservation-guests-info'>
										최대 {room.maximumGuestCount}명까지 예약 가능한
										캠핑장입니다.
									</p>
								</div>
							</div>
						)}
					</OutsideClickHandler>
				</div>
			</div>

			<Button color='cyan' width='100%' onClick={onClickReservationButton}>
				{startDate && endDate ? '예약하기' : '예약 가능 여부 보기'}
			</Button>
			{startDate && endDate && (
				<>
					<p className='room-detail-reservation-price-date'>
						{room.price} X {endDate.getDate() - startDate.getDate()}박
						<span>
							{Number(room.price) * (endDate.getDate() - startDate.getDate())}
						</span>
					</p>
					<p className='room-detail-reservation-total-price'>
						총 합계
						<span>
							{Number(room.price) * (endDate.getDate() - startDate.getDate())}
						</span>
					</p>
				</>
			)}
			<ModalPortal>
				<AuthModal closeModal={closeModal} />
			</ModalPortal>
		</Container>
	);
};

export default RoomDetailReservation;
