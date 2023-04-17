import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// import PaymentWidget, { PaymentRequest } from '@tosspayments/payment-widget';

export default function TossApprove() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let amountparam = searchParams.get('amount');
  let orderIdparam = searchParams.get('orderId');
  let paymentKeyparam = searchParams.get('paymentKey');

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
        },
      );
      if (response.status === 200) {
        localStorage.setItem('payments', JSON.stringify(response.data));
        console.log('결제승인성공');
        console.log(response.data);
        navigate('/store/order_success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!amountparam || !orderIdparam || !paymentKeyparam) {
      return <h1>Error</h1>;
    } else {
      paymentApprov();
    }
  }, []);

  return <></>;
}
