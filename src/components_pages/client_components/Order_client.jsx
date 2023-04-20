import React, { useEffect, useRef, useState } from 'react';
import '../../styles/order_client.scss';
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
import axios from 'axios';

const Pd_order_IMG = styled.div`
  ${(props) =>
    props.img &&
    `background-image: url('http://localhost:4000/uploads/${props.img}')`}
`;

export default function Order_client() {
  //카트에 담긴 상품들을 주문해 보자
  //일단, 현재 페이지의 url주소를 분석해서 싱글인지, 카트 상품인지 파악하자
  const location = useLocation();
  const currentURL = location.pathname;
  const navigate = useNavigate();

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

  const userId = useSelector((state) => state.user.userID);
  const userName = useSelector((state) => state.user.userName);
  const userPoints = useSelector((state) => state.user.userPoints);

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

  //------------휴대폰 번호는 합치는 작업 필요--------------
  //5. 받는 분 전화번호의 지역번호
  const phoneCode = useRef();
  //6. 받는 분 전화번호의 중간번호
  const phoneMidNum = useRef();
  //7. 받는 분 전화번호의 마지막 번호
  const phoneLastNum = useRef();
  //-------------------------------------------------

  //14. 기타 배송 메모
  const message = useRef();
  //-------------------------------------------------

  const orderListLocalSave = async () => {
    //--------싱글아이템과 멀티아이템 추리는 작업 그리고 products키로 로컬스토리지에 JSON화 저장
    const products = [];
    if (currentURL === '/store/order') {
      products.push({
        productName: singleOrder.productName,
        price: singleOrder.price,
        img: singleOrder.img,
        size: singleOrder.size,
        color: singleOrder.color,
        quantity: singleOrder.quantity,
        unitSumPrice: singleOrder.quantity * singleOrder.price,
      });
    } else if (currentURL === '/store/cartorder') {
      cartOrderData.cartProducts.map((el) => {
        products.push(el);
      });
    } else {
      return console.log('데이터 오류');
    }

    //받는 사람(recipien) 정보, recipien키로 JSON화 해서 통으로 넣기
    const recipien = {
      message: message.current.value,
      recipientName: recipientName.current.value,
      recipientZipcode: recipientZipcode.current.value,
      recipientAddress: recipientAddress.current.value,
      recipientAddressDetail: recipientAddressDetail.current.value,
      phoneCode: phoneCode.current.value,
      phoneMidNum: phoneMidNum.current.value,
      phoneLastNum: phoneLastNum.current.value,
    };

    //결제 전 2개 객체 products, recipien, payments
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('recipien', JSON.stringify(recipien));
  };

  const selectList_celPhone = ['010', '011', '016', '017', '019'];

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

  //카트데이터 계산할때 총 합계값을 반환해주는 함수
  const cartItemPriceSum = () => {
    let sum = 0;

    cartOrderData.cartProducts.map((el) => (sum += el.unitSumPrice));
    return sum;
  };

  //결제 동의 결과값
  const checkoutRef = useRef(false);
  const [agreement, setAgreement] = useState();
  const [toggleModal, setToggleModal] = useState(false);
  const [on, setOn] = useState('');

  //agreement 모달 스크롤기능
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    if (toggleModal) {
      setScrollPosition(window.pageYOffset);
      document.body.style.overflow = 'hidden';
      setOn('On');
    } else {
      document.body.style.overflow = 'auto';
      window.scrollTo(0, scrollPosition);
      setOn('');
    }
  }, [toggleModal]);

  //배송지 주소 가져오기
  const defaultAdd = useRef();
  const [addData, setAddData] = useState([]);

  //디폴트 주소만 거르기
  const filteredAdd = addData.filter((addData) => addData.isDefault === true);

  const defaultAddGet = async () => {
    try {
      const resAddressAll = await axios.post(
        'http://localhost:4000/mypage/getAddress',
        {
          userId: userId, // 리덕스에 있는 아이디 값
        },
      );

      if (resAddressAll.status === 200) {
        // let copy = [...resAddressAll.data.myAddresses];
        // copy = [resAddressAll.data.myAddresses];
        // await setData(copy);
        await setAddData(resAddressAll.data.myAddresses);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    defaultAddGet();
  }, []);

  return (
    <div className="order_main">
      <div className={`orderModalOff ${on}`}>
        <p>결제정보 확인 및 구매진행에 동의하셔야 주문이 가능합니다.</p>
        <BTN_black_nomal_comp
          onClickEvent={() => setToggleModal(false)}
          className="model_checkout"
        >
          확인
        </BTN_black_nomal_comp>
      </div>

      <div className="memeber_info_contain">
        <p className="memeber_info_membership">
          {userName}님은, <strong>{'[STANDARD]'}</strong> 회원이십니다.
        </p>
        <p className="memeber_info_event1">
          KRW 10,000 이상 구매시 <strong>5%</strong>를 추가할인 받으실 수
          있습니다. (최대 KDW 9,999,999)
        </p>
        <p className="memeber_info_event2">
          KRW 10,000 이상 구매시 <strong>5%</strong>를 추가할인 받으실 수
          있습니다. (최대 KDW 9,999,999)
        </p>
        <span className="point_text1">가용적립금:</span>
        <span className="member_point">{userPoints} 원</span>
        <span className="point_text2">예치금:</span>
        <span className="member_deposit">{'0'} 원</span>
        <span className="point_text3">쿠폰:</span>
        <span className="member_coupon">{'0'} 개</span>
      </div>

      {singleOrder.productName === '' &&
      singleOrder.price === 0 &&
      currentURL === '/store/order' ? (
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
                  <p className="order_product_size">SIZE: {singleOrder.size}</p>
                  <p className="order_product_color">{singleOrder.color}</p>
                  <p className="order_product_quantity">
                    <strong>QTY</strong> :
                    {frontPriceComma(singleOrder.quantity)}
                  </p>
                  <p className="order_product_unitSumPrice">
                    <strong>Total : ₩</strong>{' '}
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
                      <strong>QTY</strong> : {frontPriceComma(el.quantity)}
                    </p>
                    <p className="order_product_unitSumPrice">
                      <strong>Total : ₩</strong>{' '}
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
                <RadioEl_frontDot
                  value="false"
                  inputref={defaultAdd}
                  checkedEvent="true"
                  name="adressbooks"
                >
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
                    <div className="preview_point">
                      사용가능 포인트: {userPoints} p
                    </div>
                    <div className="point_price_apply">포인트 사용: - {''}</div>
                  </div>
                  {/* 예치금 */}
                  <p className="point_title deposit">예치금</p>
                  <div className="point">
                    <input type="text" className="point_apply b" />
                    <button className="diicount_code_btn">적용</button>
                    <div className="preview_point">사용가능 예치금: {''}</div>
                    <div className="point_price_apply">예치금 사용: - {''}</div>
                  </div>

                  {/* 결제하기 */}
                  <p className="point_title deposit"> 총 합계 </p>
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
                        onClick={() =>
                          setAgreement((cur) => checkoutRef.current.checked)
                        }
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
                        onClickEvent={() => {
                          !agreement
                            ? setToggleModal((cur) => true)
                            : navigate('/store/order/checkout');
                          orderListLocalSave();
                        }}
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
