import React from "react";
import styled from "styled-components";
import Link from "next/link"
import LogoIcon from "../public/static/svg/logo/logo.svg";
import LogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";
import palette from "../styles/palette";
import useModal from "../hooks/useModal";
import { useSelector } from "../store";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import AuthModal from "./auth/AuthModal";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0,0,0,0.08) 0px 1px 12px;
  z-index: 10;
  .header-logo-wrapper{
    display: flex;
    align-items: center;
    .header-logo{
      margin-right: 6px;
    }
  }
  .header-auth-buttons{
    .header-sign-up-button{
      height: 42px;
      margin-right: 21px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray};
      }
    }
    .header-login-button{
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0,0,0,0.18) ;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0,0,0,0.12) ;
      }
    }
  }
  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
      .header-user-profile-image {
        margin-left: 8px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
`;

const Header: React.FC = () => {
  //useModal이라는 훅스를 만들어 모달을 열고 닫고 콘텐츠 띄우는 것을 한 줄로 함
  const { openModal, ModalPortal, closeModal } =useModal();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  

  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <LogoIcon className="header-logo"/>
          <LogoTextIcon/>
        </a>
      </Link>
      {!user.isLogged && (
        <div className="header-auth-buttons">
          <button
            className="header-sign-up-button"
            onClick={() => {
              dispatch(authActions.setAuthMode("signup"));
              openModal();
            }}
            type="button"
          >
            회원가입
          </button>
          <button 
            className="header-login-button" 
            onClick={() => {
              dispatch(authActions.setAuthMode("login"));
              openModal();
            }}
              type="button"
            >
            로그인
          </button>
        </div>
      )}
      {user.isLogged && (
        <button className="header-user-profile" type="button">
          <HamburgerIcon/>
          <img 
            src={user.profileImage}
            className="header-user-profile-image"
            alt=""
          />
        </button>
      )}
      <ModalPortal>
        <AuthModal closeModal={closeModal}/>
      </ModalPortal>
    </Container>
  );
}

export default Header;