import React, { useEffect, useRef, useState } from 'react';
import '../../styles/order_client.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BTN_black_nomal_comp from '../../styles/BTN_black_nomal_comp';
import RadioGroup from '../../components_elements/RadioGroup';
import RadioEl_frontDot from '../../components_elements/RadioEl_frontDot';
import Input_Custom from '../../components_elements/Input_Custom';
import { useNavigate } from 'react-router-dom';
import Add from './Add';
import Select_Custom from '../../components_elements/Select_Custom';

const Pd_order_IMG = styled.div`
  ${(props) =>
    props.img &&
    `background-image: url('http://localhost:4000/uploads/${props.img}')`}
`;

export default function Order_client() {
  const navigate = useNavigate();
  const inputidname = useRef();
  const inputshipname = useRef();

  const orderPOST = async () => {
    try {
      const orderData = await axios.post('http://localhost:4000/store/order', {
        productName: '희성이는 예쁘다',
        price: 1000000000,
        size: 'S',
        color: 'blue',
        quantity: 10,
        unitSumPrice: 20,
        massage: '역시 희성이 성공 할 줄 알아썽!',
        status: '역시 데이터 전송 성공! 역시 희성이구만',
        paymentMethod: '현금빵',
      });
      if (orderData.status === 200) {
        console.log('성공');
        console.log(orderData);
      } else {
        console.log('실패');
        console.log(orderData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //오더메뉴에서 넘어오는 정보들
  const singleOrder = useSelector((state) =>
    state.order ? (
      state.order
    ) : (
      <h2 style={{ position: 'relative', top: '100px' }}>data Error</h2>
    ),
  );

  const selectList_phone = [
    '02',
    '031',
    '032',
    '033',
    '041',
    '042',
    '043',
    '051',
    '052',
    '053',
    '054',
    '055',
    '061',
    '062',
    '063',
    '064',
  ];

  return (
    <div className="order_main">
      <p className="order_title">주문서 작성</p>

      <div className="memeber_info_contain">
        <p className="memeber_info_membership">
          {'000'}님은, {'[STANDARD]'} 회원이십니다.
        </p>
        <p className="memeber_info_event1">
          KRW 10,000이상 구매시 5%를 추가할인 받으실 수 있습니다. (최대 KDW
          9,999,999)
        </p>
        <p className="memeber_info_event2">
          KRW 10,000이상 구매시 5%를 추가할인 받으실 수 있습니다. (최대 KDW
          9,999,999)
        </p>
        <span className="point_text1">가용적립금:</span>
        <span className="member_point">{'2,000'} p</span>
        <span className="point_text2">예치금:</span>
        <span className="member_deposit">{'0'} ₩</span>
        <span className="point_text3">쿠폰:</span>
        <span className="member_coupon">{'0'} 개</span>
      </div>

      {singleOrder.productName === '' || singleOrder.price === 0 ? (
        <p className="resetMessage">
          선택하신 상품이 초기화 되었습니다. 상품을 다시 선택해주세요.
        </p>
      ) : (
        <>
          <p className="order_product_title">상품 정보</p>
          <div className="ordermenu_product_contianer">
            <Pd_order_IMG
              img={singleOrder.img}
              className="order_pdIMG"
            ></Pd_order_IMG>
            <div className="order_pd_info">
              <p className="order_product_Name">{singleOrder.productName}</p>
              <p className="order_product_price">₩ {singleOrder.price}</p>
              <p className="order_product_size">size: {singleOrder.size}</p>
              <p className="order_product_color">{singleOrder.color}</p>
              <p className="order_product_quantity">
                {singleOrder.quantity} ea
              </p>
              <p className="order_product_unitSumPrice">
                total: ₩ <span>{singleOrder.totalPrice}</span>
              </p>
            </div>
          </div>

          <div className="ship_info_layout">
            <p className="ship_info_title">배송 정보</p>
            <div className="ship_info_input_container">
              <RadioGroup>
                <RadioEl_frontDot>&ensp;회원 정보와 동일 </RadioEl_frontDot>
                <RadioEl_frontDot>&ensp;새로운 배송지 </RadioEl_frontDot>
              </RadioGroup>
              <button>주소록 보기</button>
              <p>*필수입력사항</p>
              <Input_Custom type="text" placeholder="받으시는 분 성함" />
              <Input_Custom
                type="text"
                placeholder="우편번호"
                disabled
                value={''}
              />
              <button>우편번호</button>
              <Input_Custom
                type="text"
                placeholder="주소"
                disabled
                value={''}
              />
              <Input_Custom type="text" placeholder="상세주소" />
              <Input_Custom />
              <Input_Custom />
            </div>
          </div>
          {/* <BTN_black_nomal_comp onClick={() => orderPOST()}>
            결제하기
          </BTN_black_nomal_comp> */}
          {/* 픽스임 */}
        </>
      )}

      <div className="sangAh">
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
                placeholder="받으시는 분"
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
              <Select_Custom
                classNameSelect="select_group2"
                selectList={selectList_phone}
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
      </div>
    </div>
  );
}
