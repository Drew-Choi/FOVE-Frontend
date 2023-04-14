import React, { useEffect, useRef, useState } from 'react';
import '../../styles/order_client.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BTN_black_nomal_comp from '../../styles/BTN_black_nomal_comp';
import RadioGroup from '../../components_elements/RadioGroup';
import RadioEl_frontDot from '../../components_elements/RadioEl_frontDot';
import { useNavigate } from 'react-router-dom';
import Select_Custom from '../../components_elements/Select_Custom';
import TextArea_Custom from '../../components_elements/TextArea_Custom';
import DaumPostcode from 'react-daum-postcode';

const Pd_order_IMG = styled.div`
  ${(props) =>
    props.img &&
    `background-image: url('http://localhost:4000/uploads/${props.img}')`}
`;

export default function Order_client() {
  const navigate = useNavigate();

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
    '043',
    '042',
    '044',
    '051',
    '052',
    '053',
    '054',
    '055',
    '061',
    '062',
    '063',
    '064',
    '070',
  ];

  const selectList_celPhone = ['010', '011', '016', '017', '019'];

  const emailList = [
    'gmail.com',
    'naver.com',
    'daum.net',
    'hanmail.net',
    'kakao.com',
    'nate.com',
    'outlook.com',
    'icloud.com',
    '직접입력',
  ];

  return (
    <div className="order_main">
      <h2 className="subtitle">주소록 등록</h2>

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

          <div className="sangAh">
            <p className="ship_input_title">배송 정보</p>
            <div className="ship_info_input_container">
              <RadioGroup classNameRadio="adressCheck">
                <RadioEl_frontDot name="adressbooks">
                  &ensp;회원 정보와 동일 &ensp;&ensp; &ensp;
                </RadioEl_frontDot>
                <RadioEl_frontDot name="adressbooks">
                  &ensp;새로운 배송지
                </RadioEl_frontDot>
              </RadioGroup>
              <button className="adressBook">주소록 보기</button>
              <p>*필수입력사항</p>
            </div>

            {/* 주소록 관리 등록 제목 위치 */}
            <div className="information_contain">
              <input className="b" type="text" placeholder="받으시는 분" />
              <div>
                <div>
                  <div className="code_btn_container">
                    <input
                      className="address b"
                      type="text"
                      value={addressData.zonecode}
                      placeholder="주소*"
                      disabled
                    />
                    <button onClick={handle.clickButton} className="postCode">
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

                  <div>
                    <input
                      className="b"
                      type="text"
                      value={addressData.address}
                      placeholder="기본주소*"
                      disabled
                    />
                  </div>

                  <div>
                    <input
                      className="b"
                      type="text"
                      value={addressData.buildingName}
                      placeholder="나머지주소 (선택입력)"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="phonNum_contain">
                  <Select_Custom
                    classNameSelect="select_group2 phonNum"
                    selectList={selectList_phone}
                  />
                  <p className="numMiners">-</p>
                  <input
                    className="phonNum mid b"
                    type="tel"
                    placeholder="유선전화 (없을 경우 생략)"
                    maxLength="4"
                    pattern="[0-9]{4}"
                  />
                  <p className="numMiners">-</p>
                  <input
                    className="phonNum last b"
                    type="tel"
                    maxLength="4"
                    pattern="[0-9]{4}"
                  />
                </div>

                <div className="phonNum_contain">
                  <Select_Custom
                    classNameSelect="select_group2 phonNum"
                    selectList={selectList_celPhone}
                  />
                  <p className="numMiners">-</p>
                  <input
                    className="phonNum mid b"
                    type="tel"
                    placeholder="휴대폰"
                    maxLength="4"
                    pattern="[0-9]{4}"
                  />
                  <p className="numMiners">-</p>
                  <input
                    className="phonNum last b"
                    type="tel"
                    maxLength="4"
                    pattern="[0-9]{4}"
                  />
                </div>

                {/* 이메일 */}
                <div className="email_contain">
                  <input
                    className="email_ID b"
                    type="text"
                    maxLength="4"
                    pattern="[0-9]{4}"
                  />
                  <p className="emailLogo">@ </p>
                  <Select_Custom
                    classNameSelect="email_selector"
                    selectList={emailList}
                  />
                  <input
                    className="email_self b"
                    type="text"
                    maxLength="4"
                    pattern="[0-9]{4}"
                    disabled
                  />
                </div>

                <TextArea_Custom
                  styleArea={{ resize: 'none' }}
                  maxLength="50"
                  rows="3"
                  cols="100"
                  type="text"
                  textAreaClassName="textAreaClassName"
                  placeholder="배송 메세지"
                />

                {/* 결제영역 */}
                <div className="payment_contain">
                  {/* 할인코드 */}
                  <p className="discount_title">할인</p>
                  <p className="discount_apply">할인코드 적용</p>
                  <div className="discount_area">
                    <input type="text" className="discount_code b" />
                    <button className="diicount_code_btn">적용</button>
                    <div className="discount_price">추가할인금액: - {''}</div>
                  </div>
                  {/* 포인트 */}
                  <p className="point_title">포인트</p>
                  <div className="point">
                    <input type="text" className="point_apply b" />
                    <button className="diicount_code_btn">적용</button>
                    <div className="preview_point">사용가능 포인트: {''}</div>
                    <div className="point_price_apply">포인트 사용: - {''}</div>
                  </div>
                  {/* 예치금 */}
                  <p className="point_title diposit">예치금</p>
                  <div className="point">
                    <input type="text" className="point_apply b" />
                    <button className="diicount_code_btn">적용</button>
                    <div className="preview_point">사용가능 예치금: {''}</div>
                    <div className="point_price_apply">예치금 사용: - {''}</div>
                  </div>

                  {/* 결제하기 */}
                  <p className="point_title diposit"> 총 합계 </p>
                  <div className="final_checkout_contain">
                    <div className="unit_sum_price a">
                      <p>상품금액</p>
                      <p>KRW {'0'}</p>
                    </div>
                    <div className="ship_price a">
                      <p>배송비</p>
                      <p>+ KRW {'0'}</p>
                    </div>
                    <div className="extra_ship_price a">
                      <p>지역별 배송비</p>
                      <p>+ KRW {'0'}</p>
                    </div>
                    <div className="total_discount a">
                      <p>총 할인</p>
                      <p>- KRW {'0'}</p>
                    </div>
                    <div className="final_sum a">
                      <p>최종 결제 금액</p>
                      <p>= KRW 0</p>
                    </div>
                    <div className="rest_point a">
                      <p>총 적립예정금액 {'0'}</p>
                    </div>

                    <label htmlFor="agree_check">
                      <input
                        className="checkcheck"
                        type="checkbox"
                        name="agree"
                        value="agreement"
                        id="agree_check"
                      />
                      결제정보를 확인하였으며, 구매진행에 동의합니다.
                    </label>
                    <div className="btn_order">
                      <BTN_black_nomal_comp
                        fontSize="18px"
                        className="order_btn"
                        padding="10px 0px"
                        onClickEvent={() => orderPOST()}
                      >
                        결제하기
                      </BTN_black_nomal_comp>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
