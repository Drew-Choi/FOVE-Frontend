import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/modules/user';

export default function Register_client() {
  const registerIdInput = useRef();
  const registerPwInput = useRef();
  const registerPwInputCheck = useRef();
  const registerNameInput = useRef();
  const registerPhoneInput = useRef();
  const isNotDuplicatedId = useRef(); // 아이디 중복 확인 했는지 여부

  const dispatch = useDispatch();

  // 아이디 중복 확인 버튼
  const checkDuplicateId = async () => {
    // axios 로 보내기 - try-catch문 안에 적어야!!
    try {
      const resCheckId = await axios.post(
        'http://localhost:4000/register/checkId',
        {
          id: registerIdInput.current.value,
        },
      );

      alert(resCheckId.data);
      isNotDuplicatedId.current = true; // 아이디 중복 확인 '했음'으로 변경
    } catch (err) {
      alert(err.response.data);
    }
  };

  // JOIN IN 버튼
  const registerUser = async () => {
    try {
      // 필수 값 입력 여부 확인. 하나라도 없으면 alert 창 뜨게.
      if (
        !registerIdInput.current.value ||
        !registerPwInput.current.value ||
        !registerPwInputCheck.current.value ||
        !registerNameInput.current.value ||
        !registerPhoneInput.current.value
      )
        return alert('필수 값을 입력해 주세요.');

      // 비밀번호 확인란 확인
      if (
        registerPwInput.current.value !== registerPwInputCheck.current.value
      ) {
        registerPwInputCheck.current.value = ''; // 비밀번호 확인란 빈칸으로
        registerPwInputCheck.current.focus(); // 비밀번호 확인란으로 포커스
        return alert('비밀번호가 맞지 않습니다. 다시 확인해주세요.');
      }

      // 아이디 중복 확인 안 한 경우
      if (!isNotDuplicatedId.current)
        return alert('아이디 중복 확인을 해주세요!');

      // axios 로 보내기
      const resRegister = await axios.post('http://localhost:4000/register', {
        id: registerIdInput.current.value,
        password: registerPwInput.current.value,
        name: registerNameInput.current.value,
        phone: registerPhoneInput.current.value,
      });

      alert(resRegister.data); // await 하지 말기!

      // 자동 로그인 부분. 수정 중!!!
      dispatch(
        login({
          id: registerIdInput.current.value,
          password: registerPwInput.current.value,
          name: registerNameInput.current.value,
          phone: registerPhoneInput.current.value,
        }),
      );
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <>
      <h1>회원 가입</h1>
      <br />
      <p>* 표시된 항목을 필수로 입력해주세요!</p>
      <input
        type="text"
        ref={registerIdInput}
        placeholder="아이디* (이메일 주소를 입력해주세요)"
        required
      />{' '}
      <button onClick={checkDuplicateId}>중복 확인</button>
      <br />
      <br />
      <input
        type="password"
        ref={registerPwInput}
        placeholder="비밀번호* (영문 대/소문자, 숫자, 특수문자 중 3가지 이상 조합, 8~16자)"
        required
      />
      <br />
      <br />
      <input
        type="password"
        ref={registerPwInputCheck}
        placeholder="비밀번호 확인*"
        required
      />
      <br />
      <br />
      <input type="text" ref={registerNameInput} placeholder="이름*" required />
      <br />
      <br />
      <input
        type="text"
        ref={registerPhoneInput}
        placeholder="핸드폰 번호*"
        required
      />
      <br />
      <br />
      {/* 약관 체크 추가 예정 */}
      <br />
      <button onClick={registerUser}>JOIN IN</button>{' '}
      {/* 이전 페이지? 홈 화면? 으로 돌아가기 구현 예정 */}
      <button>CANCEL</button>
    </>
  );
}
