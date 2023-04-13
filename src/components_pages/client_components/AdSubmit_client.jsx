// ACCOUNT → MYPAGE → 배송주소록 등록 페이지

import React from 'react';
import '../../styles/adsubmit_client.scss';
import { useNavigate } from 'react-router-dom';
import BTN_black_nomal_comp from '../../styles/BTN_black_nomal_comp';

export default function AdSubmit_client() {
  const navigate = useNavigate();
  return (
    <>
      <div className="titleArea">
        <h2 className="subtitle">주소록 관리</h2>
      </div>

      {/* 주소록 관리 등록 제목 위치 */}
      <div className="ad_inner">
        <div className="ad_wrap">
          <p>등록된 주소가 없습니다.</p>
        </div>
      </div>
      <div className="ad_mom">
        <BTN_black_nomal_comp
          className="ad_btn_submit"
          onClick={() => navigate('/adwrite')}
        >
          등록
        </BTN_black_nomal_comp>
      </div>
    </>
  );
}
