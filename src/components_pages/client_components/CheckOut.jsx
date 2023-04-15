import { useEffect, useRef, useState } from 'react';
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';

import '../../App.css';

const selector = '#payment-widget';
const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
const customerKey = 'dajksdajdklajdkal';

export function CheckoutPage() {
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(100);

  const initPayment = async () => {
    const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      selector,
      price,
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
    <div>
      <h1>주문서</h1>
      <span>{`${price.toLocaleString()}원`}</span>
      <div>
        <label>
          <input
            type="checkbox"
            onChange={(event) => {
              setPrice(event.target.checked ? price - 10 : price + 10);
            }}
          />
          10원 할인 쿠폰 적용
        </label>
      </div>
      <div id="payment-widget" />
      <button
        onClick={async () => {
          const paymentWidget = paymentWidgetRef.current;

          try {
            await paymentWidget?.requestPayment({
              orderId: nanoid(),
              orderName: '토스 티셔츠 외 2건',
              customerName: '김토스',
              customerEmail: 'customer123@gmail.com',
              successUrl: `${window.location.origin}/tosspayment/success`,
              failUrl: `${window.location.origin}/fail`,
            });
          } catch (error) {
            // handle error
          }
        }}
      >
        결제하기
      </button>
    </div>
  );
}
