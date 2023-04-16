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
  top: 200px;
  background-color: aqua;
  width: 50vw;
  border: 1px solid black;
  padding: 20px;
`;

export function Toss_CheckOut() {
  const location = useLocation();
  const currentURL = location.pathname;
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

  const cartItemPriceSum = () => {
    let sum = 0;
    cartOrderData.cartProducts.map((el) => (sum += el.unitSumPrice));
    return sum;
  };

  //테스트키값
  const [price, setPrice] = useState(0);
  const selector = '#payment-widget';
  const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
  const customerKey = 'cccccccc';
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);

  //화면에 위젯 띄우는 놈들
  //위 위젯 함수 마운트때 1번 실행되게 하는 놈
  useEffect(() => {
    const initPayment = async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      paymentWidgetRef.current = paymentWidget;

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        100000,
      );

      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    };
    initPayment();
  }, []);

  console.log(price);

  //결제방식 선택을 할때 발생하는 이벤트들와 선택하지 않을 때 메시지?
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

  // const priceData =
  //       currentURL === '/store/order/checkout'
  //         ? singleOrder.totalPrice
  //         : currentURL === '/store/cartorder/checkout'
  //         ? cartItemPriceSum()
  //         : setPrice(() => 0);

  //     await setPrice((cur) => priceData);

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
                orderName:
                  currentURL === '/store/order/checkout'
                    ? `주문상품: ${singleOrder.productName}`
                    : currentURL === '/store/cartorder/checkout'
                    ? `주문상품: ${cartOrderData.cartProducts[0].productName} 외 다수`
                    : null,
                customerName: '유저 정보 입력예정',
                customerEmail: '주문자 이메일 (회원정보에서 끌어다 씀)',
                successUrl: `${window.location.origin}/tosspayment/${
                  currentURL === '/store/order/checkout'
                    ? '/store/order/checkout/approval_order'
                    : currentURL === '/store/cartorder/checkout'
                    ? '/store/order/checkout/approval_cartorder'
                    : null
                }`,
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
