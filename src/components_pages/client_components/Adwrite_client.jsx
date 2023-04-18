// ACCOUNT → MYPAGE → 배송주소록 등록 → 작성 페이지

import React, { useEffect, useRef, useState } from 'react';
import '../../styles/adwrite_client.scss';
import { useNavigate } from 'react-router-dom';
import BTN_black_nomal_comp from '../../styles/BTN_black_nomal_comp';
import Select_Custom from '../../components_elements/Select_Custom';
import KakaoPostcode_client from './KakaoPostcode_client';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Adwrite_client() {
  const userId = useSelector((state) => state.user.userID);
  const navigate = useNavigate();

  const inputshipname = useRef(); // 배송지명
  const inputidname = useRef(); // 수령인 이름
  const recipientZipcode = useRef(); // 수령인 우편번호
  const recipientAddress = useRef(); // 수령인 주소
  const recipientAddressDetail = useRef(); // 수령인 상세주소
  const phoneCode = useRef(); // 핸드폰 번호의 처음 번호
  const phoneMidNum = useRef(); // 핸드폰 번호의 중간 번호
  const phoneLastNum = useRef(); // 핸드폰 번호의 마지막 번호
  // const inputad = useRef();
  // const inputbasicad = useRef();
  // const inputrestad = useRef();
  // const localnum = useRef();
  // const telephone = useRef();
  // const telephone_blank = useRef();
  // const cellphone = useRef();
  // const cellphone_blank = useRef();
  // const postnum = useRef();
  // const selectList_phone = [
  //   '02',
  //   '031',
  //   '032',
  //   '033',
  //   '041',
  //   '043',
  //   '042',
  //   '044',
  //   '051',
  //   '052',
  //   '053',
  //   '054',
  //   '055',
  //   '061',
  //   '062',
  //   '063',
  //   '064',
  //   '070',
  // ];
  const selectList_cellphone = ['010', '011', '016', '017', '018', '019'];

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
      // console.log(data);
      setAdressData(data);
      setOpenPostcode(false);
    },
  };

  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    top: '20%',
    left: '25%',
    right: '0',
    margin: '50px',
    width: '500px',
    height: '500px',
    zIndex: 100,
    border: '1px solid black',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
  };

  const addAddress = async () => {
    try {
      // 입력된 값이 없을 때, 빈 값 저장되는 것을 막기 위해
      if (
        !inputshipname.current.value &&
        !inputidname.current.value &&
        !recipientZipcode.current.value &&
        !recipientAddress.current.value &&
        !recipientAddressDetail.current.value &&
        !phoneMidNum.current.value &&
        !phoneLastNum.current.value
      ) {
        return alert('입력된 값이 없습니다. 다시 시도해 주세요.');
      }

      // 전화번호 합치기
      const phoneNum =
        phoneCode.current.value +
        phoneMidNum.current.value +
        phoneLastNum.current.value;

      const resAddress = await axios.post(
        'http://localhost:4000/mypage/editAddress',
        {
          userId: userId, // 리덕스에 있는 아이디 값
          destination: inputshipname.current.value,
          recipient: inputidname.current.value,
          address: recipientAddress.current.value,
          addressDetail: recipientAddressDetail.current.value,
          zipCode: recipientZipcode.current.value,
          recipientPhone: phoneNum,
        },
      );

      alert(resAddress.data.message);
      console.log('주소록 등록 페이지 콘솔!!!', resAddress); //
      navigate('/mypage/checkAddress');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="titleArea">
        <h2 className="subtitle">주소록 등록</h2>
      </div>

      {/* 주소록 관리 등록 제목 위치 */}
      <div className="ad_inner">
        <div className="ad_wrap">
          <div className="ship_name">
            <input
              ref={inputshipname}
              type="text"
              placeholder="배송지명"
              style={{ fontSize: '12px' }}
            />
          </div>

          <div className="id_name">
            <input
              ref={inputidname}
              type="text"
              placeholder="성명"
              style={{ fontSize: '12px' }}
            />
          </div>

          {/* <KakaoPostcode_client /> 컴포넌트 대신 코드로 */}
          {/* <KakaoPostcode_client /> */}
          <div className="adress_wrap">
            <div className="postcode_wrap">
              <input
                ref={recipientZipcode}
                className="postcode_input"
                type="text"
                value={addressData.zonecode}
                placeholder="우편번호"
                style={{ fontSize: '12px' }}
              />
              <button className="postcode_btn" onClick={handle.clickButton}>
                주소 찾기
              </button>
              {openPostcode && (
                <DaumPostcode
                  style={postCodeStyle}
                  className="kakaoadd"
                  onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                  autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                  defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                />
              )}
            </div>

            <div className="basic_adress_wrap">
              <input
                ref={recipientAddress}
                type="text"
                value={addressData.address}
                placeholder="주소"
                style={{ fontSize: '12px' }}
              />
            </div>

            <div className="rest_adress_wrap">
              <input
                ref={recipientAddressDetail}
                type="text"
                value={addressData.buildingName}
                placeholder="나머지 주소 (선택 입력)"
                onChange={handleChange}
                style={{ fontSize: '12px' }}
              />
            </div>
          </div>

          <div className="phone_wrap">
            {/* <div className="phone-number">
              <Select_Custom
                classNameSelect="phone_select"
                selectList={selectList_phone}
              />
              <span>-</span>
              <input
                type="tel"
                id="phone2"
                placeholder="유선전화"
                style={{ fontSize: '12px' }}
                name="phone2"
                maxLength="4"
                pattern="[0-9]{4}"
                required
              />
              <span>-</span>
              <input
                type="tel"
                id="phone3"
                name="phone3"
                maxLength="4"
                pattern="[0-9]{4}"
                required
              />
            </div> */}

            <div className="cell-phone-number">
              <Select_Custom
                inputRef={phoneCode}
                classNameSelect="cellphone_select"
                selectList={selectList_cellphone}
              />
              <span>-</span>
              <input
                ref={phoneMidNum}
                type="cell"
                id="phone2"
                placeholder="휴대전화"
                style={{ fontSize: '12px' }}
                name="phone2"
                maxLength="4"
                pattern="[0-9]{4}"
                required
              />
              <span>-</span>
              <input
                ref={phoneLastNum}
                type="cell"
                id="phone3"
                name="phone3"
                maxLength="4"
                pattern="[0-9]{4}"
                required
              />
            </div>
          </div>

          <div className="ad_mom">
            <BTN_black_nomal_comp
              className="ad_btn_submit_wht"
              onClickEvent={() => {
                navigate('/mypage/checkAddress');
              }}
            >
              취소
            </BTN_black_nomal_comp>

            <BTN_black_nomal_comp
              className="ad_btn_submit_blk"
              onClickEvent={addAddress}
            >
              등록
            </BTN_black_nomal_comp>
          </div>

          <div className="caution">
            <div className="ship_caution">
              <span className="shipad_caution">배송주소록 유의사항</span>
              <br />
              <br />
              <span>
                배송주소록은 최대 10개까지 등록할 수 있습니다.
                {/* 배송주소록은 최대 10개까지 등록할 수 있으며, 별도로 등록하지
                않을 경우 최근 배송주소록 기준으로 자동 업데이트 됩니다.
                <br />
                자동 업데이트를 원하지 않을 경우 주소록 고정 선택을 선택하시면
                선택된 주소록은 업데이트 대상에서 제외됩니다. */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
