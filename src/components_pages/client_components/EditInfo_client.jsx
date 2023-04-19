import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { keepLogin, logout } from '../../store/modules/user';

const EditInfoWrap = styled.div`
  position: relative;
  top: 130px;
  width: 800px;
  height: 500px; // 스크롤 생기게 임시방편
  margin: 0 auto;
  text-align: center;

  /* background-color: skyblue; */
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

const SubTitle = styled.p`
  display: inline-block;
  text-align: left;
  line-height: 40px;
  font-size: 17px;
  width: 120px;
  margin: 0;

  /* background-color: orange; */
`;

const InputText = styled.input`
  display: inline-block;
  width: 680px;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
`;

const InputTextId = styled.input`
  display: inline-block;
  width: 680px;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #e9e9e9;
`;

const ButtonBK = styled.button`
  width: 390px;
  margin: 30px 4px 20px;
  height: 40px;
  color: white;
  background-color: black;
  border: 2px solid black;
  border-radius: 50px;
  /* box-shadow: 5px 5px 5px lightgray; */
`;

const ButtonWT = styled.button`
  width: 390px;
  margin: 30px 4px 20px;
  height: 40px;
  color: black;
  background-color: white;
  border: 2px solid black;
  border-radius: 50px;
  /* box-shadow: 5px 5px 5px lightgray; */
`;

const ButtonRED = styled.button`
  width: 800px;
  height: 40px;
  color: white;
  background-color: #b20000;
  border: 2px solid #b20000;
  border-radius: 50px;
  /* box-shadow: 5px 5px 5px lightgray; */
  margin-bottom: 50px;
`;

export default function EditInfo_client() {
  const inputId = useRef();
  const inputPw = useRef();
  const inputPwCheck = useRef();
  const inputName = useRef();
  const inputPhone = useRef();

  // 리덕스에 담긴 정보들 - 아이디, 포인트, 관리자 여부
  const userId = useSelector((state) => state.user.userID);
  const userPoints = useSelector((state) => state.user.userPoints);
  const userIsAdmin = useSelector((state) => state.user.isAdmin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // DB에 있는 회원 정보 불러오기
  const getUserInfo = async () => {
    try {
      // 리덕스에 있는 아이디 값으로 회원 정보 불러오기
      const resId = await axios.post(
        'http://localhost:4000/mypage/editInfo/fillInfo',
        {
          id: userId,
        },
      );

      // <input> 에 기존 정보 넣기
      inputId.current.value = resId.data.id;
      inputName.current.value = resId.data.name;
      inputPhone.current.value = resId.data.phone;
    } catch (err) {
      console.log('회원 수정 페이지 - DB 불러오기 실패', err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // 회원 정보 수정
  const editUserInfo = async () => {
    try {
      // 모든 값이 입력된 상태여야 함
      if (
        !inputPw.current.value ||
        !inputPwCheck.current.value ||
        !inputName.current.value ||
        !inputPhone.current.value
      )
        return alert('모든 입력창을 작성해 주세요.');

      // 입력된 비밀번호가 같아야 함
      if (inputPw.current.value !== inputPwCheck.current.value) {
        inputPwCheck.current.value = ''; // 비밀번호 확인란 빈칸으로
        inputPwCheck.current.focus(); // 비밀번호 확인란으로 포커스
        return alert('비밀번호가 맞지 않습니다. 다시 확인해주세요.');
      }

      // 입력 받은 값들 axios로 보내기
      // 새로운 토큰 발행을 위해 포인트, 관리자 여부 정보도 보내기
      const resInfo = await axios.post(
        'http://localhost:4000/mypage/editInfo',
        {
          id: inputId.current.value,
          newPw: inputPw.current.value,
          newName: inputName.current.value,
          newPhone: inputPhone.current.value,
          points: userPoints, // 리덕스에 있는 값
          isAdmin: userIsAdmin, // 리덕스에 있는 값
        },
      );

      // 새로운 토큰을 위해 로컬 스토리지의 기존 토큰 삭제
      window.localStorage.clear();
      // 새로 발급된 토큰을 로컬 스토리지에 저장
      window.localStorage.setItem('token', resInfo.data.token);

      // 리덕스에 저장할 이름에 * 처리
      const encodedNameArr = [...inputName.current.value].map((el, idx) => {
        if (idx % 2 === 0) {
          return el;
        } else {
          return '*';
        }
      });

      // 리덕스에 새로운 정보로 수정
      dispatch(
        keepLogin({
          id: inputId.current.value,
          nameEncoded: encodedNameArr.join(''),
          points: userPoints,
          isAdmin: userIsAdmin,
        }),
      );

      alert(resInfo.data.message);
      navigate(`/mypage`); // 마이페이지로 이동
    } catch (err) {
      alert(err);
    }
  };

  // 회원 정보 삭제
  const deleteUserInfo = async () => {
    try {
      // confirm 창으로 탈퇴 여부 묻기
      if (
        window.confirm(
          '회원 탈퇴 시, FOVE 에 등록된 모든 개인정보와 적립 포인트는\n삭제 처리되며 복구되지 않습니다.\n또한, 동일 아이디(이메일)로 재가입하실 수 없습니다.\n탈퇴하시겠습니까?',
        )
      ) {
        const resInfo = await axios.post(
          'http://localhost:4000/mypage/deleteInfo',
          {
            id: inputId.current.value,
          },
        );

        alert(resInfo.data);

        // 로그아웃 처리
        window.localStorage.clear(); // 로컬 스토리지의 토큰 삭제
        dispatch(logout()); // 리덕스 로그아웃 처리
        navigate(`/`); // 홈으로 이동
      } else {
        return;
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <EditInfoWrap>
      <Title>EDIT ACCOUNT INFORMATION</Title>
      <Text>* 회원 정보 수정 시, 모든 입력창을 작성해 주세요.</Text>
      <SubTitle>아이디</SubTitle>
      <InputTextId
        type="text"
        ref={inputId}
        placeholder="아이디 (이메일 주소)"
        required
        readOnly
      ></InputTextId>
      <SubTitle>비밀번호</SubTitle>
      <InputText
        type="password"
        ref={inputPw}
        placeholder="비밀번호 (영문 대/소문자, 숫자, 특수문자 중 3가지 이상 조합, 8~16자)"
        required
      ></InputText>
      <SubTitle>비밀번호 확인</SubTitle>
      <InputText
        type="password"
        ref={inputPwCheck}
        placeholder="비밀번호 확인"
        required
      ></InputText>
      <SubTitle>이름</SubTitle>
      <InputText
        type="text"
        ref={inputName}
        placeholder="이름"
        required
      ></InputText>
      <SubTitle>핸드폰 번호</SubTitle>
      <InputText
        type="text"
        ref={inputPhone}
        placeholder="핸드폰 번호"
        required
      ></InputText>
      <ButtonBK onClick={editUserInfo}>회원 정보 수정</ButtonBK>{' '}
      <ButtonWT onClick={() => navigate(-1)}>취소</ButtonWT>
      <br />
      <ButtonRED onClick={deleteUserInfo}>회원 탈퇴</ButtonRED>
    </EditInfoWrap>
  );
}
