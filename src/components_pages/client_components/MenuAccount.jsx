import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { logout } from '../../store/modules/user';
import { clickMenu } from '../../store/modules/menuAccount';
import { reset, update } from '../../store/modules/cart';
import axios from 'axios';

const MenuAccountWrap = styled.div`
  position: fixed;
  top: 50px;
  right: 0;
  z-index: 1000; // 장바구니보다 위에 위치
  width: 280px;
  height: 150px;
  border: 2px solid black;
  background-color: white;
  padding: 15px;
`;

const ContentTitle = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 800;
`;

const Content = styled.p`
  margin: 0;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    font-weight: 900;
    border-bottom: 2px solid black;
    /* background-color: #e9e9e9; */
  }
`;

export default function MenuAccount() {
  //리덕스
  //유저정보 state
  const userID = useSelector((state) =>
    state.user.userID === 0 ? 0 : state.user.userID,
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const userPoints = useSelector((state) => state.user.userPoints);

  // 로그아웃
  const logoutUser = () => {
    alert('정상적으로 로그아웃 되었습니다!');
    window.localStorage.clear(); // 로컬 스토리지의 로그인 토큰 삭제
    dispatch(clickMenu()); // MenuAccount 닫기
    dispatch(logout()); // 로그아웃 처리
    dispatch(reset());
    navigate(`/login`); // 로그인 페이지로 이동
  };

  return (
    <MenuAccountWrap>
      <ContentTitle>{userName} 님, 환영합니다!</ContentTitle>
      <ContentTitle>Point : {userPoints} p</ContentTitle>
      <Content
        onClick={() => {
          dispatch(clickMenu());
          navigate(`/mypage`);
        }}
      >
        MY PAGE
      </Content>
      <Content onClick={() => navigate(`/mypage/orderlist`)}>ORDER</Content>
      <Content onClick={logoutUser}>LOGOUT</Content>
    </MenuAccountWrap>
  );
}
