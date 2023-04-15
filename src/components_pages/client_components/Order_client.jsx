import React, { useEffect, useRef, useState } from 'react';
import '../../styles/order_client.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BTN_black_nomal_comp from '../../styles/BTN_black_nomal_comp';
import RadioGroup from '../../components_elements/RadioGroup';
import RadioEl_frontDot from '../../components_elements/RadioEl_frontDot';
import { useLocation, useNavigate } from 'react-router-dom';
import Select_Custom from '../../components_elements/Select_Custom';
import TextArea_Custom from '../../components_elements/TextArea_Custom';
import DaumPostcode from 'react-daum-postcode';
import Error404 from './Error404';

const Pd_order_IMG = styled.div`
  ${(props) =>
    props.img &&
    `background-image: url('http://localhost:4000/uploads/${props.img}')`}
`;

export default function Order_client() {
  const navigate = useNavigate();

  //리덕스 state ---------------------------
  //오더메뉴에서 넘어오는 정보들(리덕스)
  const singleOrder = useSelector((state) =>
    state.order ? (
      state.order
    ) : (
      <h2 style={{ position: 'relative', top: '100px' }}>data Error</h2>
    ),
  );

  const cartOrderData = useSelector((state) =>
    state.cart ? (
      state.cart
    ) : (
      <h2 style={{ position: 'relative', top: '100px' }}>data Error</h2>
    ),
  );

  //----------------------------------------------------------------

  //다음주소 불러오기 기능 ----------------------------------------------
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
  //------------------------------------------------------

  //주문 정보 담기
  //1. 받는 분 성함
  const recipientName = useRef();
  //2. 받는 분 우편번호
  const recipientZipcode = useRef();
  //3. 받는 분 기본 주소
  const recipientAddress = useRef();
  //4. 받는 분 상세주소
  const recipientAddressDetail = useRef();
  //------------전화번호는 합치는 작업 필요--------------
  //5. 받는 분 전화번호의 지역번호
  const telAreaCode = useRef();
  //6. 받는 분 전화번호의 중간번호
  const telMidNum = useRef();
  //7. 받는 분 전화번호의 마지막 번호
  const telLastNum = useRef();
  //-------------------------------------------------

  //------------휴대폰 번호는 합치는 작업 필요--------------
  //8. 받는 분 전화번호의 지역번호
  const phoneCode = useRef();
  //9. 받는 분 전화번호의 중간번호
  const phoneMidNum = useRef();
  //10. 받는 분 전화번호의 마지막 번호
  const phoneLastNum = useRef();
  //-------------------------------------------------

  //-----------이메일 합치는 작업 필요---------------------
  // 받는분 이메일은 필요없음
  // //11. 이메일 아이디
  // const emailID = useRef();
  // //12. 이메일 주소
  // const emailAddress = useRef('gmail.com');
  // //13. 이메일 직접 입력
  // const selfMailInput = useRef();
  //-------------------------------------------

  //14. 기타 배송 메모
  const message = useRef();

  //결제 동의 결과값
  const checkoutRef = useRef();
  const [agreement, setAgreement] = useState();

  //주문 정보 백에 POST 보내기
  const orderPOST = async () => {
    console.log('상품정보');
    console.log('productName: ' + singleOrder.productName);
    console.log('price: ' + singleOrder.price);
    console.log('color: ' + singleOrder.color);
    console.log('quantity: ' + singleOrder.quantity);
    console.log('주문 상태(status): ' + '입금 전');
    console.log('주문 상태(paymentMethod):' + '카드');
    console.log('받는 곳 정보');
    console.log('받는 분 이름: ' + recipientName.current.value);
    console.log('받는 분 우편번호: ' + recipientZipcode.current.value);
    console.log('받는 분 주소: ' + recipientAddress.current.value);
    console.log('받는 분 디테일 주소: ' + recipientAddressDetail.current.value);
    console.log('받는 분 전화번호 지역번호: ' + telAreaCode.current.value);
    console.log(
      '받는 분 전화번호 중간 번호: ' + !telMidNum.current.value
        ? '전화번호 없음'
        : telMidNum.current.value,
    );
    console.log(telMidNum.current.value);
    console.log('받는 분 전화번호 마지막 번호: ' + telLastNum.current.value);
    console.log('받는 분 핸드폰 번호 통신사: ' + phoneCode.current.value);
    console.log('받는 분 핸드폰 번호 중간 번호: ' + phoneMidNum.current.value);
    console.log(
      '받는 분 핸드폰 번호 마지막 번호: ' + phoneLastNum.current.value,
    );

    // 성희가 받는 분 관련 필요없는 부분 주석처리함 !
    // console.log('받는 분 이메일 아이디: ' + emailID.current.value);
    // console.log('받는 분 이메일 주소: ' + emailAddress.current.value);
    // console.log(
    //   '받는 분 셀프 이메일등록: ' + !selfMailInput.current.value
    //     ? '셀프x'
    //     : selfMailInput.current.value,
    // );
    // console.log(
    //   '받는 분 기타 메모: ' + extraMemo.current.value === ''
    //     ? '메모 없음'
    //     : extraMemo.current.value,
    // );

    // try {
    //   const orderData = await axios.post('http://localhost:4000/store/order', {
    //     productName: '희성이는 예쁘다',
    //     price: 1000000000,
    //     size: 'S',
    //     color: 'blue',
    //     quantity: 10,
    //     unitSumPrice: 20,
    //     massage: '역시 희성이 성공 할 줄 알아썽!',
    //     status: '역시 데이터 전송 성공! 역시 희성이구만',
    //     paymentMethod: '현금빵',
    //   });
    //   if (orderData.status === 200) {
    //     console.log('성공');
    //     console.log(orderData);
    //   } else {
    //     console.log('실패');
    //     console.log(orderData);
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

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

  //메일 직접 입력 활성화
  // 메일 삭제함
  // const [disOnOff, setDisOnOff] = useState(true);
  // const selectorDisableOnOff = () => {
  //   console.log(emailAddress.current.value);
  //   console.log(disOnOff);
  //   if (emailAddress.current.value === '직접입력') {
  //     setDisOnOff((cur) => false);
  //   } else {
  //     setDisOnOff((cur) => true);
  //   }
  // };

  const postCodeStyle2 = {
    display: 'block',
    position: 'absolute',
    top: '88px',
    left: '15%',
    right: '0',
    margin: '50px',
    width: '30vw',
    height: '450px',
    zIndex: 100,
    border: '1px solid black',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
  };

  //카트에 담긴 상품들을 주문해 보자
  //일단, 현재 페이지의 url주소를 분석해서 싱글인지, 카트 상품인지 파악하자
  const location = useLocation();
  const currentURL = location.pathname;
  console.log(currentURL);

  //카트데이터 계산할때 총 합계값을 반환해주는 함수
  const cartItemPriceSum = () => {
    let sum = 0;

    cartOrderData.cartProducts.map((el) => (sum += el.unitSumPrice));
    return sum;
  };

  //천단위 컴마
  const country = navigator.language;
  const frontPriceComma = (price) => {
    if (price && typeof price.toLocaleString === 'function') {
      return price.toLocaleString(country, {
        currency: 'KRW',
      });
    } else {
      return price;
    }
  };

  return (
    <div className="order_main">
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

      {singleOrder.productName === '' &&
      singleOrder.price === 0 &&
      !cartOrderData ? (
        <p className="resetMessage">
          선택하신 상품이 초기화 되었습니다. 상품을 다시 선택해주세요.
        </p>
      ) : (
        <>
          <p className="order_product_title">상품 정보</p>
          <div className="ordermenu_product_contianer">
            {/* 싱글 오더와 카트오더를 url로 구분 각각 다른 데이터 바인딩 페이지를 보여줘야함*/}

            {/* 현재 URL주소가 /store/order라면~ */}
            {currentURL === '/store/order' ? (
              // 아래 싱글데이터를 바인딩한걸 보여줘
              <div className="individualCopy_layout">
                <Pd_order_IMG
                  img={singleOrder.img}
                  className="order_pdIMG"
                ></Pd_order_IMG>
                <div className="order_pd_info">
                  <p className="order_product_Name">
                    {singleOrder.productName}
                  </p>
                  <p className="order_product_price">
                    ₩ {frontPriceComma(singleOrder.price)}
                  </p>
                  <p className="order_product_size">size: {singleOrder.size}</p>
                  <p className="order_product_color">{singleOrder.color}</p>
                  <p className="order_product_quantity">
                    {frontPriceComma(singleOrder.quantity)} ea
                  </p>
                  <p className="order_product_unitSumPrice">
                    total: ₩{' '}
                    <span>{frontPriceComma(singleOrder.totalPrice)}</span>
                  </p>
                </div>
              </div>
            ) : //만약 아니라면, /store/cartorder 인지 확인해봐
            currentURL === '/store/cartorder' ? (
              //만약 2번째 조건이 맞다면, 아래 카트데이터로 들어오는 걸 바인딩해줘
              //카트아이템은 어레이로 들어오기 때문에 map으로 죠진다
              cartOrderData.cartProducts.map((el, index) => (
                <div key={el._id} className="individualCopy_layout">
                  <Pd_order_IMG
                    img={el.img}
                    className="order_pdIMG"
                  ></Pd_order_IMG>
                  <div className="order_pd_info">
                    <p className="order_product_Name">{el.productName}</p>
                    <p className="order_product_price">
                      ₩ {frontPriceComma(el.price)}
                    </p>
                    <p className="order_product_size">size: {el.size}</p>
                    <p className="order_product_color">{el.color}</p>
                    <p className="order_product_quantity">
                      {frontPriceComma(el.quantity)} ea
                    </p>
                    <p className="order_product_unitSumPrice">
                      total: ₩{' '}
                      <span>{frontPriceComma(el.quantity * el.price)}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <Error404 />
            )}
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
              <input
                ref={recipientName}
                className="b"
                type="text"
                placeholder="받으시는 분"
              />
              <div>
                <div>
                  <div className="code_btn_container">
                    <input
                      ref={recipientZipcode}
                      className="address b"
                      type="text"
                      value={addressData.zonecode}
                      placeholder="우편번호*"
                      disabled
                    />
                    <button onClick={handle.clickButton} className="postCode">
                      주소 찾기
                    </button>
                    {openPostcode && (
                      <DaumPostcode
                        style={postCodeStyle2}
                        className="kakaoadd"
                        onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                        autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                        defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                      />
                    )}
                  </div>

                  <div>
                    <input
                      ref={recipientAddress}
                      className="b"
                      type="text"
                      value={addressData.address}
                      placeholder="주소*"
                      disabled
                    />
                  </div>

                  <div>
                    <input
                      ref={recipientAddressDetail}
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
                    inputRef={telAreaCode}
                    classNameSelect="select_group2 phonNum"
                    selectList={selectList_phone}
                  />
                  <p className="numMiners">-</p>
                  <input
                    ref={telMidNum}
                    className="phonNum mid b"
                    type="tel"
                    placeholder="유선전화 (없을 경우 생략)"
                    maxLength="4"
                    pattern="[0-9]{4}"
                  />
                  <p className="numMiners">-</p>
                  <input
                    ref={telLastNum}
                    className="phonNum last b"
                    type="tel"
                    maxLength="4"
                    pattern="[0-9]{4}"
                  />
                </div>

                <div className="phonNum_contain">
                  <Select_Custom
                    inputRef={phoneCode}
                    classNameSelect="select_group2 phonNum"
                    selectList={selectList_celPhone}
                  />
                  <p className="numMiners">-</p>
                  <input
                    ref={phoneMidNum}
                    className="phonNum mid b"
                    type="tel"
                    placeholder="휴대폰"
                    maxLength="4"
                    pattern="[0-9]{4}"
                  />
                  <p className="numMiners">-</p>
                  <input
                    ref={phoneLastNum}
                    className="phonNum last b"
                    type="tel"
                    maxLength="4"
                    pattern="[0-9]{4}"
                  />
                </div>

                {/* 이메일
                <div className="email_contain">
                  <input ref={emailID} className="email_ID b" type="text" />
                  <p className="emailLogo">@ </p>
                  <Select_Custom
                    onChangeEvent={selectorDisableOnOff}
                    inputRef={emailAddress}
                    classNameSelect="email_selector"
                    selectList={emailList}
                  />
                  <input
                    ref={selfMailInput}
                    className="email_self b"
                    type="text"
                    maxLength="4"
                    pattern="[0-9]{4}"
                    disabled={disOnOff}
                  />
                </div> */}

                <TextArea_Custom
                  inputref={message}
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
                      <p>
                        KRW{' '}
                        {currentURL === '/store/order'
                          ? frontPriceComma(singleOrder.totalPrice)
                          : currentURL === '/store/cartorder'
                          ? frontPriceComma(cartItemPriceSum())
                          : null}
                      </p>
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
                      <p>
                        = KRW{' '}
                        {currentURL === '/store/order'
                          ? frontPriceComma(singleOrder.totalPrice)
                          : currentURL === '/store/cartorder'
                          ? frontPriceComma(cartItemPriceSum())
                          : null}
                      </p>
                    </div>
                    <div className="rest_point a">
                      <p>
                        총 적립예정금액{' '}
                        {currentURL === '/store/order'
                          ? frontPriceComma(
                              Math.floor(singleOrder.totalPrice * 0.01),
                            )
                          : currentURL === '/store/cartorder'
                          ? frontPriceComma(
                              Math.floor(cartItemPriceSum() * 0.01),
                            )
                          : null}
                      </p>
                    </div>

                    <label htmlFor="agree_check">
                      <input
                        onChange={setAgreement(
                          (cur) => checkoutRef.current.checked,
                        )}
                        ref={checkoutRef}
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
