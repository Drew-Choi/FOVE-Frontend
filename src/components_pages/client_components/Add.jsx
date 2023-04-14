import React from 'react';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import '../../styles/adwrite_client.scss';

const Add = () => {
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

  return (
    <div className="adress_wrap">
      <input
        type="text"
        value={addressData.zonecode}
        placeholder="주소"
        style={{ fontSize: '12px' }}
      />
      <button onClick={handle.clickButton}>우편번호</button>
      {openPostcode && (
        <DaumPostcode
          onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
          autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
        />
      )}
      <input
        type="text"
        value={addressData.address}
        placeholder="기본주소"
        style={{ fontSize: '12px' }}
      />
      <input
        type="text"
        value={addressData.buildingName}
        placeholder="나머지주소 (선택입력)"
        onChange={handleChange}
        style={{ fontSize: '12px' }}
      />
    </div>
  );
};

export default Add;
