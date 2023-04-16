import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { paysuccess } from '../../store/modules/payment';
// import PaymentWidget, { PaymentRequest } from '@tosspayments/payment-widget';

export default function TossApprove() {
  const location = useLocation();
  const currentURL = location.pathname;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let amountparam = searchParams.get('amount');
  let orderIdparam = searchParams.get('orderId');
  let paymentKeyparam = searchParams.get('paymentKey');

  //리덕스 자료들 불러오기
  //1. payment 결제 정보 담은 곳
  const paymentData = useSelector((state) =>
    state.payment ? (
      state.payment
    ) : (
      <h2 style={{ position: 'relative', top: '100px' }}>data Error</h2>
    ),
  );

  //2. recipient(받는 분) 정보 담은 곳
  const recipientData = useSelector((state) =>
    state.recipient ? (
      state.recipient
    ) : (
      <h2 style={{ position: 'relative', top: '100px' }}>data Error</h2>
    ),
  );

  //3. 주문하는 상품 담는 곳
  const orderData = useSelector((state) =>
    state.order ? (
      state.order
    ) : (
      <h2 style={{ position: 'relative', top: '100px' }}>data Error</h2>
    ),
  );

  const cartorderData = useSelector((state) =>
    state.cart ? (
      state.cart
    ) : (
      <h2 style={{ position: 'relative', top: '100px' }}>data Error</h2>
    ),
  );

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (!amountparam || !orderIdparam || !paymentKeyparam) {
      return <h1>Error</h1>;
    } else {
      const paymentApprov = async () => {
        try {
          const response = await axios.post(
            'https://api.tosspayments.com/v1/payments/confirm',
            {
              amount: amountparam,
              orderId: orderIdparam,
              paymentKey: paymentKeyparam,
            },
            {
              headers: {
                Authorization:
                  'Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==',
                'Content-Type': 'application/json',
              },
              cancelToken: source.token,
            },
          );

          if (response.status === 200) {
            await dispatch(paysuccess(response.data));
            console.log('결제승인성공');
            console.log(response.data);
            navigate('/ordersuccess');
          }
        } catch (error) {
          console.log(error);
          if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
          } else {
            console.log(error);
          }
        }
      };
      paymentApprov();
    }

    return () => {
      source.cancel('Request canceled by cleanup');
    };
  }, []);

  return <></>;
}
