// ACCOUNT → MYPAGE → 배송주소록 등록 → 작성 페이지

import React, { useRef } from 'react';
import '../../styles/adwrite_client.scss';
import { useNavigate } from 'react-router-dom';
import BTN_black_nomal_comp from '../../styles/BTN_black_nomal_comp';

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

          <div className="address_postnum">
            <div className="address">
              {/* 주소 안에 카카오 API 추가 필요 */}
              <input
                ref={inputad}
                type="text"
                placeholder="주소"
                style={{ fontSize: '12px' }}
              />
            </div>

            <div className="postnum">
              {/* 우편번호 onclick 카카오 API 추가 필요 */}
              <a href="#" onClick={''}>
                우편번호
              </a>
            </div>
          </div>

          <div className="basicad">
            {/* 기본주소 안에 카카오 API 주소 자동으로 추가됨 */}
            <input
              ref={inputbasicad}
              type="text"
              placeholder="기본주소"
              style={{ fontSize: '12px' }}
            />
          </div>

          <div className="restad">
            {/* 나머지주소 안에 카카오 API 주소 자동으로 추가됨 */}
            <input
              ref={inputrestad}
              type="text"
              placeholder="나머지주소 (선택입력)"
              style={{ fontSize: '12px' }}
            />
          </div>

          <div className="inputtele">
            <div className="localnum">
              {/* 지역번호 입력 */}
              <input />
            </div>

            <div className="telephone">
              {/* 유선전화 가운데 번호 입력 */}
              <input
                ref={telephone}
                type="text"
                placeholder="유선전화"
                style={{ fontSize: '12px' }}
              />
            </div>

            <div className="telephone_blank">
              {/* 유선전화 마지막 번호 입력 */}
              <input
                ref={telephone_blank}
                type="text"
                placeholder=""
                style={{ fontSize: '12px' }}
              />
            </div>

            <div className="inputcell">
              <div className="localnum">
                {/* 휴대전화 지역번호 입력 */}
                <input />
              </div>

              <div className="cellphone">
                {/* 휴대전화 가운데 번호 입력 */}
                <input
                  ref={cellphone}
                  type="text"
                  placeholder="휴대전화"
                  style={{ fontSize: '12px' }}
                />
              </div>

              <div className="cellphone_blank">
                {/* 휴대전화 마지막 번호 입력 */}
                <input
                  ref={cellphone_blank}
                  type="text"
                  placeholder=""
                  style={{ fontSize: '12px' }}
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
        </div>
      </div>
    </>
  );
}
