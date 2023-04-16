import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paysuccess } from '../../store/modules/payment';
// import PaymentWidget, { PaymentRequest } from '@tosspayments/payment-widget';

export default function TossApprove() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let amountparam = searchParams.get('amount');
  let orderIdparam = searchParams.get('orderId');
  let paymentKeyparam = searchParams.get('paymentKey');

  //리덕스 자료들 불러오기
  const orderInfo = useSelector((state) =>
    state.payment ? (
      state.payment.orderInfo
    ) : (
      <h2 style={{ position: 'relative', top: '100px' }}>data Error</h2>
    ),
  );

  const paymentInfo = useSelector((state) =>
    state.payment ? (
      state.payment.paymentInfo
    ) : (
      <h2 style={{ position: 'relative', top: '100px' }}>data Error</h2>
    ),
  );

  //백으로 정보 넘기주기
  //결제승인까지 완료 정보 백에 POST 보내기
  const orderPOST = async () => {
    try {
      const orderData = await axios.post('http://localhost:4000/store/order', {
        //상품정보 + 받는 이 정보
        products: orderInfo,
        payments: paymentInfo,
      });
      if (orderData.status === 200) {
        console.log('성공');
        console.log(orderData.data);
      } else {
        console.log('실패');
        console.log(orderData.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
      orderPOST();
    }

    return () => {
      source.cancel('Request canceled by cleanup');
    };
  }, []);

  return <></>;
}
