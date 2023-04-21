import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/register_client.scss';
import DaumPostcode from 'react-daum-postcode';
import Select_Custom from '../../components_elements/Select_Custom';

export default function Register_client() {
  const registerIdInput = useRef();
  const registerPwInput = useRef();
  const registerPwInputCheck = useRef();
  const registerNameInput = useRef();
  const isNotDuplicatedId = useRef(); // 아이디 중복 확인 했는지 여부
  const recipientZipcode = useRef();
  const recipientAddress = useRef();
  const recipientAddressDetail = useRef();
  const phoneCode = useRef();
  const phoneMidNum = useRef();
  const phoneLastNum = useRef();

  const selectList_celPhone = ['010', '011', '016', '017', '019'];

  const navigate = useNavigate();

  //다음주소 불러오기 기능 ----------------------------------------------
  const [openPostcode, setOpenPostcode] = useState(false);
  const [addressData, setAdressData] = useState({});
  const handleChange = (event) => {
    setAdressData(event.target.value);
  };

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      // console.log(typeof data); object
      setAdressData(data);
      setOpenPostcode(false);
    },
  };

  const postCodeStyle2 = {
    display: 'block',
    position: 'absolute',
    top: '88px',
    left: '15%',
    right: '0',
    margin: '50px',
    width: '30vw',
    height: '450px',
    zIndex: 100,
    border: '1px solid black',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
  };
  //------------------------------------------------------

  // 아이디 중복 확인 버튼
  const checkDuplicateId = async () => {
    // 입력 안 했을 때
    if (!registerIdInput.current.value) return alert('아이디를 입력해 주세요.');

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
        !phoneCode.current.value ||
        !phoneMidNum.current.value ||
        !phoneLastNum.current.value
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
        phone:
          phoneCode.current.value +
          '-' +
          phoneMidNum.current.value +
          '-' +
          phoneLastNum.current.value,
        addresses: {
          destination: registerNameInput.current.value,
          recipient: registerNameInput.current.value,
          address: recipientAddress.current.value,
          addressDetail: recipientAddressDetail.current.value,
          zipCode: recipientZipcode.current.value,
          recipientPhone:
            phoneCode.current.value +
            '-' +
            phoneMidNum.current.value +
            '-' +
            phoneLastNum.current.value,
          isDefault: true,
        },
      });

      alert(resRegister.data); // await 하지 말기!

      navigate(`/register/success`, {
        state: { name: registerNameInput.current.value },
      });
    } catch (err) {
      console.log(err);
      alert(err.resRegister.data.message);
    }
  };

  return (
    <div className="register_client">
      <p className="register_title">회원 가입</p>
      <br />
      <p className="register_text">* 표시된 항목을 필수로 입력해주세요!</p>
      <input
        type="text"
        ref={registerIdInput}
        placeholder="아이디* (이메일 주소를 입력해주세요)"
        required
        className="register_input id"
      />
      <button onClick={checkDuplicateId} className="register_btn_small">
        중복 확인
      </button>
      <br />
      <br />
      <input
        type="password"
        ref={registerPwInput}
        placeholder="비밀번호* (영문 대/소문자, 숫자, 특수문자 중 3가지 이상 조합, 8~16자)"
        required
        className="register_input"
      />
      <br />
      <br />
      <input
        type="password"
        ref={registerPwInputCheck}
        placeholder="비밀번호 확인*"
        required
        className="register_input"
      />
      <br />
      <br />
      <input
        type="text"
        ref={registerNameInput}
        placeholder="이름*"
        required
        className="register_input"
      />
      <br />
      <br />
      <div>
        <div className="code_btn_container">
          <input
            className="address"
            ref={recipientZipcode}
            type="text"
            value={addressData.zonecode}
            placeholder="우편번호*"
            disabled
          />
          <button onClick={handle.clickButton} className="postCode">
            주소 찾기
          </button>
          {openPostcode && (
            <DaumPostcode
              style={postCodeStyle2}
              className="kakaoadd"
              onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
            />
          )}
        </div>

        <div className="adress_detail">
          <input
            ref={recipientAddress}
            className="adress_detail_input"
            type="text"
            value={addressData.address}
            placeholder="주소*"
            disabled
          />
        </div>

        <div className="adress_detail2">
          <input
            ref={recipientAddressDetail}
            className="adress_detail2_input"
            type="text"
            value={addressData.buildingName}
            placeholder="나머지주소 (선택입력)"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="phonNum_contain">
        <Select_Custom
          inputRef={phoneCode}
          classNameSelect="select_group2 phonNum"
          selectList={selectList_celPhone}
        />
        <p className="numMiners">-</p>
        <input
          ref={phoneMidNum}
          className="phonNum mid b"
          type="tel"
          placeholder="휴대폰"
          maxLength="4"
          pattern="[0-9]{4}"
          value="5507"
        />
        <p className="numMiners">-</p>
        <input
          ref={phoneLastNum}
          className="phonNum last b"
          type="tel"
          maxLength="4"
          pattern="[0-9]{4}"
          value="3019"
        />
      </div>
      <br />
      <br />
      {/* 약관 체크 추가 예정 */}
      <br />
      <button onClick={registerUser} className="register_btn">
        JOIN IN
      </button>{' '}
      <button onClick={() => navigate(-1)} className="register_btn white">
        CANCEL
      </button>
    </div>
  );
}
