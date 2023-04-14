// ACCOUNT → MYPAGE → 배송주소록 등록 → 작성 페이지

import React, { useRef } from 'react';
import '../../styles/adwrite_client.scss';
import { useNavigate } from 'react-router-dom';
import BTN_black_nomal_comp from '../../styles/BTN_black_nomal_comp';
import Add from './Add';

export default function Adwrite_client() {
  const navigate = useNavigate();
  const inputshipname = useRef();
  const inputidname = useRef();
  const inputad = useRef();
  const inputbasicad = useRef();
  const inputrestad = useRef();
  const localnum = useRef();
  const telephone = useRef();
  const telephone_blank = useRef();
  const cellphone = useRef();
  const cellphone_blank = useRef();
  const postnum = useRef();

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

          <Add />

          <div className="phone-number">
            <input
              type="tel"
              id="phone1"
              name="phone1"
              maxLength="3"
              pattern="[0-9]{3}"
              required
            />
            <label htmlFor="phone1">-</label>
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
            <label htmlFor="phone2">-</label>
            <input
              type="tel"
              id="phone3"
              name="phone3"
              maxLength="4"
              pattern="[0-9]{4}"
              required
            />
          </div>

          <div className="cell-phone-number">
            <input
              type="cell"
              id="phone1"
              name="phone1"
              maxLength="3"
              pattern="[0-9]{3}"
              required
            />
            <label htmlFor="phone1">-</label>
            <input
              type="cell"
              id="phone2"
              placeholder="휴대전화"
              style={{ fontSize: '12px' }}
              name="phone2"
              maxLength="4"
              pattern="[0-9]{4}"
              required
            />
            <label htmlFor="phone2">-</label>
            <input
              type="cell"
              id="phone3"
              name="phone3"
              maxLength="4"
              pattern="[0-9]{4}"
              required
            />
          </div>

          <div className="ad_mom">
            <BTN_black_nomal_comp
              className="ad_btn_submit_wht"
              onClick={() => navigate('#')}
            >
              취소
            </BTN_black_nomal_comp>

            <BTN_black_nomal_comp
              className="ad_btn_submit_blk"
              onClick={() => navigate('#')}
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
                배송주소록은 최대 10개까지 등록할 수 있으며, 별도로 등록하지
                않을 경우 최근 배송주소록 기준으로 자동 업데이트 됩니다.
                <br />
                자동 업데이트를 원하지 않을 경우 주소록 고정 선택을 선택하시면
                선택된 주소록은 업데이트 대상에서 제외됩니다.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
