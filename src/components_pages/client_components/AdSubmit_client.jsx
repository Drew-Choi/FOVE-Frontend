// ACCOUNT → MYPAGE → 배송주소록 등록 페이지

import React, { useEffect, useState } from 'react';
import '../../styles/adsubmit_client.scss';
import { useNavigate } from 'react-router-dom';
import BTN_black_nomal_comp from '../../styles/BTN_black_nomal_comp';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AdSubmit_client() {
  const userId = useSelector((state) => state.user.userID);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [length, setLength] = useState(0);

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    try {
      const resAddressAll = await axios.post(
        'http://localhost:4000/mypage/getAddress',
        {
          userId: userId, // 리덕스에 있는 아이디 값
        },
      );

      if (resAddressAll.status === 200) {
        // let copy = [...resAddressAll.data.myAddresses];
        // // copy = [resAddressAll.data.myAddresses];
        // await setData(copy);

        await setData(resAddressAll.data.myAddresses);
        await setLength(resAddressAll.data.myAddresses.length);
      }

      // let copy = [...resAddressAll.data.myAddresses];
      // // copy = [resAddressAll.data.myAddresses];
      // await setData(copy);

      // // 주소 데이터 유무에 따른 처리
      // if (addressArr.length === 0) {
      //   // 주소 데이터가 아예 없을 때
      // } else {
      //   // 주소 데이터 있을 때
      // }

      console.log(resAddressAll);
      console.log(resAddressAll.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(data[0]?.destination);
  // console.log(length);

  return (
    <>
      <div className="titleArea">
        <h2 className="subtitle">주소록 관리</h2>
      </div>

      {/* 주소록 관리 등록 제목 위치 */}
      <div className="ad_inner">
        <div className="ad_wrap">
          {/* {length === 0 ? <p>등록된 주소가 없습니다.</p> : <p>test</p>} */}

          {data?.map((el, idx) => (
            <div key={idx} className="ad_content">
              <div>{el?.destination}</div>
              <div>{el?.recipient}</div>
              <div>{el?.zipCode}</div>
              <div>{el?.address}</div>
              <div>{el?.addressDetail}</div>
              <div>{el?.recipientPhone}</div>
              {el?.isDefault && <div>기본 배송지</div>}
            </div>
          ))}

          {/* <p>등록된 주소가 없습니다.</p> */}
          {/* <p>{data[0].destination}</p> */}
        </div>
      </div>
      <div className="ad_mom">
        <BTN_black_nomal_comp
          className="ad_btn_submit"
          onClickEvent={() => navigate('/mypage/editAddress')}
        >
          새로운 주소 등록
        </BTN_black_nomal_comp>
      </div>
    </>
  );
}
