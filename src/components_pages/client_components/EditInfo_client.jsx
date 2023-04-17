import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const EditInfoWrap = styled.div`
  position: relative;
  top: 130px;
  width: 1000px;
  margin: 0 auto;
  text-align: center;

  /* background-color: orange; */
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Text = styled.p`
  text-align: left;
  font-size: 13px;
  margin-bottom: 5px;
`;

const InputText = styled.input`
  width: 1000px;
  height: 40px;
  margin-bottom: 20px;
`;

const ButtonBK = styled.button`
  width: 300px;
  height: 40px;
  color: white;
  background-color: black;
  border: 2px solid black;
  border-radius: 50px;
  box-shadow: 5px 5px 5px lightgray;
  margin-bottom: 30px;
`;

const ButtonWT = styled.button`
  width: 300px;
  height: 40px;
  color: black;
  background-color: white;
  border: 2px solid black;
  border-radius: 50px;
  box-shadow: 5px 5px 5px lightgray;
  margin-bottom: 30px;
`;

export default function EditInfo_client() {
  const inputId = useRef();
  const inputPw = useRef();
  const inputPwCheck = useRef();
  const inputName = useRef();
  const inputPhone = useRef();

  const navigate = useNavigate();

  // DB에 있는 회원 정보 불러오기
  const getUserInfo = async () => {
    try {
      const resInfo = await axios.post('http://localhost:4000/mypage/editInfo');
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <EditInfoWrap>
      <Title>EDIT ACCOUNT INFORMATION</Title>
      <ButtonBK onClick={() => navigate(`/mypage`)}>
        회원정보 수정
      </ButtonBK>{' '}
      <ButtonWT onClick={() => navigate(-1)}>취소</ButtonWT>{' '}
      <ButtonBK onClick={() => navigate(`/mypage`)}>회원 탈퇴</ButtonBK>
      <Text>* 표시된 항목을 필수로 입력해주세요!</Text>
      <InputText
        type="text"
        ref={inputId}
        placeholder="아이디* (이메일 주소를 입력해주세요)"
        required
      ></InputText>
      <InputText
        type="text"
        ref={inputPw}
        placeholder="비밀번호* (영문 대/소문자, 숫자, 특수문자 중 3가지 이상 조합, 8~16자)"
        required
      ></InputText>
      <InputText
        type="text"
        ref={inputPwCheck}
        placeholder="비밀번호 확인*"
        required
      ></InputText>
      <InputText
        type="text"
        ref={inputName}
        placeholder="이름*"
        required
      ></InputText>
      <InputText
        type="text"
        ref={inputPhone}
        placeholder="핸드폰 번호*"
        required
      ></InputText>
    </EditInfoWrap>
  );
}
