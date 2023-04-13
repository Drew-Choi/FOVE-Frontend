// ACCOUNT → MYPAGE → 배송주소록 등록 → 작성 페이지

import React, { useRef } from 'react';
import '../../styles/adwrite_client.scss';
import { useNavigate } from 'react-router-dom';
import BTN_black_nomal_comp from '../../styles/BTN_black_nomal_comp';

export default function Adwrite_client() {
  const navigate = useNavigate();
  const inputshipname = useRef();
  // const inputShipName
  // console.log(inputshipname);

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
              style={{ fontSize: '14px' }}
            />
            <input
              ref={inputshipname}
              type="text"
              placeholder="배송지명"
              style={{ fontSize: '14px' }}
            />
          </div>
        </div>
      </div>
      <div className="ad_mom">
        <BTN_black_nomal_comp
          className="ad_btn_submit_blk"
          onClick={() => navigate('#')}
        >
          취소
        </BTN_black_nomal_comp>
        <BTN_black_nomal_comp
          className="ad_btn_submit_wht"
          onClick={() => navigate('#')}
        >
          등록
        </BTN_black_nomal_comp>
      </div>
    </>
  );
}
