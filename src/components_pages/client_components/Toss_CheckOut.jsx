/* eslint-disable no-undef */

//유저 정보 받아서 데이터 바인딩 해야함

import { useEffect, useRef, useState } from 'react';
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import '../../App.css';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const PaymentBOX = styled.div`
  position: relative;
  margin: 0px auto;
  top: 150px;
  /* background-color: aqua; */
  width: 50vw;
  height: 48vh;
  border: 2px solid black;
  padding: 30px;

  button {
    background-color: black;
    margin-left: 0px;
    width: 710px;
    padding: 10px 40px;
    border: 1px solid black;
    border-radius: 50px;
    font-size: 14px;
    color: white;
    transition: all 0.3s;

    &:hover {
      background-color: white;
      color: black;
    }
  }
`;

const selector = '#payment-widget';
const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
const customerKey = 'dajksdajdklajdkal';

export function Toss_CheckOut() {
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const location = useLocation();
  const currentURL = location.pathname;
  const [price, setPrice] = useState(0);

  //로컬에서 주문내역 뺴서 가공
  const importLocalProducts = JSON.parse(localStorage.getItem('products'));
  //이게 최종 금액
  let orderPrice = 0;
  importLocalProducts.map((el) => (orderPrice += el.unitSumPrice));
  //상품이름 출력
  const productName = importLocalProducts[0].productName;

  const initPayment = async () => {
    const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      selector,
      orderPrice,
    );

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  };

  useEffect(() => {
    initPayment();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON,
    );
  }, [price]);

  return (
    <>
      <p>결제하기</p>
      <PaymentBOX>
        <div id="payment-widget" />

        <button
          onClick={async () => {
            const paymentWidget = paymentWidgetRef.current;

            try {
              const kim = await paymentWidget?.requestPayment({
                orderId: nanoid(),
                orderName: '유저정보로 입력 예정',
                customerName: `${
                  importLocalProducts.length > 0
                    ? '상품명: ' + productName + '외 다수'
                    : '상품명: ' + productName
                }`,
                customerEmail: '주문자 이메일 (회원정보에서 끌어다 씀)',
                successUrl: `${window.location.origin}/store/order/checkout/approval_order`,
                failUrl: `${window.location.origin}/fail`,
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          결제진행
        </button>
      </PaymentBOX>
    </>
  );
}
