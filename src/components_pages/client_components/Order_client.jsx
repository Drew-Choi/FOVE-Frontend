import React, { useEffect, useState } from 'react';
import '../../styles/order_client.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Pd_order_IMG = styled.div`
  ${(props) =>
    props.img &&
    `background-image: url('http://localhost:4000/uploads/${props.img}')`}
`;

export default function Order_client() {
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
          <button onClick={() => orderPOST()}>결제하기</button>
        </>
      )}
    </div>
  );
}
