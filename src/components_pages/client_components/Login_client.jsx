import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../store/modules/user';
import '../../styles/login_client.scss';

export default function Login_client() {
  const loginIdInput = useRef();
  const loginPwInput = useRef();

  const dispatch = useDispatch();

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
        password: loginIdInput.current.value,
      });

      alert(resLogin.data.message);

      // 로그인이 성공하면 응답 데이터 token 프로퍼티에 accessToken 이 전달 되어 오므로
      // 로컬 스토리지에 로그인 정보가 저장 된 토큰을 저장
      // 해당 정보를 통하여 리액트 실행 시, 토큰을 백엔드 서버에 검증하여 자동 로그인을 처리
      window.localStorage.setItem('token', resLogin.data.token);

      return dispatch(
        login({
          id: loginIdInput.current.value,
        }),
      );
    } catch (err) {
      alert(err.response.message);
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
      />
      <br />
      <input
        type="password"
        ref={loginPwInput}
        placeholder="PW"
        required
        className="login_input"
      />
      <br />
      <button onClick={loginUser} className="login_btn">
        LOG IN
      </button>
      <br />
      <button className="login_btn white">
        <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
          Create Account
        </Link>
      </button>
      <br />
      <button className="login_kakao">
        <Link to="" style={{ textDecoration: 'none', color: '#3a1d1d' }}>
          카카오 계정으로 로그인
        </Link>
      </button>
    </div>
  );
}

// fontawesome 카카오 아이콘 코드
// <i class="fa-solid fa-comment" style="color: #3a1d1d;"></i>
