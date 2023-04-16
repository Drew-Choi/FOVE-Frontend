import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';

const RegisterSuccessWrap = styled.div`
  position: relative;
  top: 200px;
  width: 1000px;
  margin: 0 auto;
`;

// const Title = styled.p`
//   text-align: center;
//   font-size: 20px;
// `;

const ContentTitle = styled.p`
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Content = styled.p`
  font-size: 15px;
  margin-bottom: 50px;
`;

const ButtonBK = styled.button`
  margin-left: 5px;
  width: 490px;
  height: 40px;
  color: white;
  background-color: black;
  border: 2px solid black;
  border-radius: 50px;
  box-shadow: 5px 5px 5px lightgray;
`;

const ButtonWT = styled.button`
  margin-left: 5px;
  width: 490px;
  height: 40px;
  color: black;
  background-color: white;
  border: 2px solid black;
  border-radius: 50px;
  box-shadow: 5px 5px 5px lightgray;
`;

export default function RegisterSuccess_client() {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state.name;

  return (
    <RegisterSuccessWrap>
      {/* <Title>회원 가입 결과</Title> */}
      <ContentTitle>회원 가입이 완료되었습니다</ContentTitle>
      <Content>
        <b>FOVE</b> 에 오신 것을 환영합니다!
        <br />
        <b>{userName}</b> 님은 [STANDARD] 회원입니다.
        <br />
        <b>KRW 10,000 이상</b> 구매 시 <b>5%</b> 를 추가 할인 받으실 수
        있습니다. (최대 KRW 9,999,999)
        <br />
        <b>KRW 10,000 이상</b> 구매 시 <b>2%</b> 를 추가 적립 받으실 수
        있습니다. (최대 KRW 9,999,999)
      </Content>
      <ButtonBK onClick={() => navigate(`/login`)}>
        LOG IN 페이지로 이동
      </ButtonBK>{' '}
      <ButtonWT onClick={() => navigate(`/store`)}>Store 로 이동</ButtonWT>
    </RegisterSuccessWrap>
  );
}
