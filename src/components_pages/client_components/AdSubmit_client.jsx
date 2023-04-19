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
  });

  const getAddress = async () => {
    try {
      const resAddressAll = await axios.post(
        'http://localhost:4000/mypage/getAddress',
        {
          userId: userId, // 리덕스에 있는 아이디 값
        },
      );

      if (resAddressAll.status === 200) {
        await setData(resAddressAll.data.myAddresses);
        await setLength(resAddressAll.data.myAddresses.length);
      }

      console.log(resAddressAll);
      console.log(resAddressAll.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAddress = async (index) => {
    try {
      const resAddress = await axios.post(
        'http://localhost:4000/mypage/deleteAddress',
        {
          addressId: data[index]?._id,
          userId: userId, // 리덕스에 있는 아이디 값
        },
      );

      console.log(resAddress);
      console.log(resAddress.data.message);
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

      <div className="ad_mom">
        <BTN_black_nomal_comp
          className="ad_btn_submit"
          onClickEvent={() => navigate('/mypage/editAddress')}
        >
          새로운 주소 등록
        </BTN_black_nomal_comp>
      </div>

      {/* 주소록 관리 등록 제목 위치 */}
      <div className="ad_inner">
        <div className="ad_wrap">
          {length === 0 ? (
            <p className="ad_empty">등록된 주소가 없습니다.</p>
          ) : (
            data?.map((el, idx) => (
              <div key={idx} className="ad_content">
                {/* 삭제 버튼 */}
                <div
                  className="ad_delete_btn"
                  onClick={() => deleteAddress(idx)}
                >
                  ✖
                </div>

                {/* 기본 배송지 표시 */}
                {el?.isDefault && <div className="ad_default">기본 배송지</div>}

                {/* 배송지 정보 */}
                <div>
                  {el?.destination ? el?.destination : '[정보 없음_배송지]'} (
                  {el?.recipient ? el?.recipient : '정보 없음_수령인'})
                </div>
                {/* <div>{el?.recipient}</div> */}

                <div>
                  [{el?.zipCode ? el?.zipCode : '정보 없음_우편 번호'}]{' '}
                  {el?.address ? el?.address : '[정보 없음_주소]'}{' '}
                  {el?.addressDetail
                    ? el?.addressDetail
                    : '[정보 없음_상세 주소]'}
                </div>
                {/* <div>{el?.address}</div> */}
                {/* <div>{el?.addressDetail}</div> */}
                <div>
                  {el?.recipientPhone.length > 3
                    ? el?.recipientPhone
                    : '[정보 없음_핸드폰 번호]'}
                </div>
              </div>
            ))
          )}

          {/* <p>등록된 주소가 없습니다.</p> */}
          {/* <p>{data[0].destination}</p> */}
        </div>
      </div>
    </>
  );
}
