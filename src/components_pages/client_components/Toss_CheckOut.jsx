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
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { costomer } from '../../store/modules/recipient';

const PaymentBOX = styled.div`
  background-color: aqua;
  width: 50vw;
  border: 1px solid black;
  padding: 20px;
`;

export function Toss_CheckOut({
  userInformation,
  recipientName,
  recipientZipcode,
  recipientAddress,
  recipientAddressDetail,
  phoneCode,
  phoneMidNum,
  phoneLastNum,
  message,
}) {
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

  //현재 URL 위치
  const location = useLocation();
  const currentURL = location.pathname;
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(0);
  const [productName, setProductName] = useState('');

  useEffect(() => {
    if (currentURL === '/store/order') {
      setPrice((cur) => singleOrder.totalPrice);
    } else if (currentURL === '/store/cartorder') {
      setPrice((cur) => cartItemPriceSum());
    }

    if (currentURL === '/store/order') {
      setProductName((cur) => singleOrder.productName);
    } else if (currentURL === '/store/cartorder') {
      setProductName((cur) => cartOrderData.cartProducts[0].productName);
    }
  }, []);
  console.log(price);
  console.log(productName);
  const selector = '#payment-widget';
  const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
  const customerKey = 'cccccccc';

  //화면에 위젯 띄우는 놈들

  //위 위젯 함수 마운트때 1번 실행되게 하는 놈
  useEffect(() => {
    const initPayment = async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      paymentWidgetRef.current = paymentWidget;

      const orderData = singleOrder ?? cartOrderData;

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        orderData.totalPrice,
      );

      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    };
    initPayment();
  }, []);
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

  //일단 결제 전이므로 리덕스에 주문자 보관. 결제가 승인되면 그때 정보 넘어가기

  const dispatch = useDispatch();

  const clickReduxSave = () => {
    // 주문자 정보 저장
    let customerInfo = {
      message: message.current.value,
      recipientName: recipientName.current.value,
      recipientZipcode: recipientZipcode.current.value,
      recipientAddress: recipientAddress.current.value,
      recipientAddressDetail: recipientAddressDetail.current.value,
      phoneCode: phoneCode.current.value,
      phoneMidNum: phoneMidNum.current.value,
      phoneLastNum: phoneLastNum.current.value,
    };

    dispatch(costomer(customerInfo));
  };

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
                  currentURL === '/store/order'
                    ? `주문상품: ${productName}`
                    : currentURL === '/store/cartorder'
                    ? `주문상품: ${productName} 외 다수`
                    : null,
                customerName: '유저 정보 입력예정',
                customerEmail: '주문자 이메일 (회원정보에서 끌어다 씀)',
                successUrl: `${window.location.origin}/tosspayment/approval`,
                failUrl: `${window.location.origin}/fail`,
              });
            } catch (error) {
              console.error(error);
            }
            clickReduxSave();
          }}
        >
          결제진행
        </button>
      </PaymentBOX>
    </>
  );
}
