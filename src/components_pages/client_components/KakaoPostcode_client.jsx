import React from 'react';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import '../../styles/adwrite_client.scss';

const KakaoPostcode_client = () => {
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
      console.log(data);
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

  return (
    <div className="address_mom_wrap">
      <div className="adress_wrap">
        <div className="postcode_wrap">
          <input
            className="postcode_input"
            type="text"
            value={addressData.zonecode}
            placeholder="주소"
            style={{ fontSize: '12px' }}
          />
          <button className="postcode_btn" onClick={handle.clickButton}>
            우편번호
          </button>
          {openPostcode && (
            <DaumPostcode
              className="kakaoadd"
              onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
            />
          )}
        </div>

        <div className="basic_adress_wrap">
          <input
            type="text"
            value={addressData.address}
            placeholder="기본주소"
            style={{ fontSize: '12px' }}
          />
        </div>

        <div className="rest_adress_wrap">
          <input
            type="text"
            value={addressData.buildingName}
            placeholder="나머지주소 (선택입력)"
            onChange={handleChange}
            style={{ fontSize: '12px' }}
          />
        </div>
      </div>

      <div className="add_caution">
        <span className="add_cau_title">배송주소록 유의사항</span>
        <br />
        <br />
        <span>
          배송 주소록은 최대 10개까지 등록할 수 있으며, 별도로 등록하지 않을
          경우 최근 배송 주소록 기준으로 자동 업데이트 됩니다. <br />
          자동 업데이트를 원하지 않을 경우 주소록 고정 선택을 선택하시면 선택된
          주소록은 업데이트 대상에서 제외됩니다.
        </span>
      </div>
    </div>
  );
};

export default KakaoPostcode_client;
