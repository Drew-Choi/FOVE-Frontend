import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login } from '../../store/modules/user';
import '../../styles/login_client.scss';
import { importdb } from '../../store/modules/cart';

export default function Login_client() {
  const loginbtn = useRef();

  const handleKeyPress1 = (e) => {
    if (e.key === 'Enter') {
      loginbtn.current?.click();
    }
  };

  const handleKeyPress2 = (e) => {
    if (e.key === 'Enter') {
      loginbtn.current?.click();
    }
  };

  //유저정보 state
  const userID = useSelector((state) =>
    state.user.userID === 0 ? 0 : state.user.userID,
  );

  const loginIdInput = useRef();
  const loginPwInput = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const cartDataReq = async (parmas) => {
  //   try {
  //     const cartDataGet = await axios.post(
  //       `http://localhost:4000/cart/list/${parmas}`,
  //     );
  //     console.log(userID);
  //     if (cartDataGet.status === 200) {
  //       await dispatch(importdb(cartDataGet.data.product));
  //     } else {
  //       console.error(cartDataGet.status);
  //       console.log(cartDataGet.data.message);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // LOG IN 버튼
  const loginUser = async () => {
    try {
      // 아이디, 비밀번호 값 입력 여부 확인. 없으면 alert 창 뜨게.
      if (!loginIdInput.current.value) {
        loginIdInput.current.focus();
        return alert('아이디를 입력해 주세요.');
      }

      if (!loginPwInput.current.value) {
        loginPwInput.current.focus();
        return alert('비밀번호를 입력해 주세요.');
      }

      // axios 로 보내기
      const resLogin = await axios.post('http://localhost:4000/login', {
        id: loginIdInput.current.value,
        password: loginPwInput.current.value,
      });

      // 회원이 아닐 때, 비밀번호가 틀렸을 때 뜨는 에러 메시지 처리
      if (resLogin.status === 400) alert(resLogin.response.data.message);
      // 로그인 성공 시, 메시지 처리
      alert(resLogin.data.message);

      // 로그인이 성공하면 응답 데이터 token 프로퍼티에 accessToken 이 전달 되어 오므로
      // 로컬 스토리지에 로그인 정보가 저장 된 토큰을 저장
      // 해당 정보를 통하여 리액트 실행 시, 토큰을 백엔드 서버에 검증하여 자동 로그인을 처리
      window.localStorage.setItem('token', resLogin.data.token);
      dispatch(
        login({
          id: loginIdInput.current.value,
        }),
      );
      // cartDataReq(loginIdInput.current.value);
      navigate('/store'); // 로그인 후 이전 페이지로 이동
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="login_client">
      <p className="login_title">LOG IN or CREATE ACCOUNT</p>
      <br />
      <input
        type="text"
        ref={loginIdInput}
        placeholder="ID (Email Address)"
        required
        className="login_input"
        onKeyDown={(e) => handleKeyPress1(e)}
      />
      <br />
      <input
        type="password"
        ref={loginPwInput}
        placeholder="PW"
        required
        className="login_input"
        onKeyDown={(e) => handleKeyPress2(e)}
      />
      <br />
      <button ref={loginbtn} onClick={loginUser} className="login_btn">
        LOG IN
      </button>
      <br />
      <button className="login_btn white" onClick={() => navigate(`/register`)}>
        {/* <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}> */}
        Create Account
        {/* </Link> */}
      </button>
      {/* <br />
      <button className="login_kakao">
        <Link to="" style={{ textDecoration: 'none', color: '#3a1d1d' }}>
          카카오 계정으로 로그인
        </Link>
      </button> */}
    </div>
  );
}

// fontawesome 카카오 아이콘 코드
// <i class="fa-solid fa-comment" style="color: #3a1d1d;"></i>
