// import { useSearchParams } from "react-router-dom";

// export function SuccessPage() {
//   const [searchParams] = useSearchParams();

//   return (
//     <div>
//       <h1>결제 성공</h1>
//       <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
//       <div>{`결제 금액: ${Number(
//         searchParams.get("amount")
//       ).toLocaleString()}원`}</div>
//     </div>
//   );
// }

import { useSearchParams } from 'react-router-dom';
// import PaymentWidget, { PaymentRequest } from '@tosspayments/payment-widget';

export function SuccessPage() {
  const [searchParams] = useSearchParams();

  let switchday = function (num) {
    const result = num + 1 < 10 ? '0' + (num + 1) : num + 1;
    return result;
  };
  let today = new Date();
  let year = today.getFullYear(); // 년도
  const month = switchday(today.getMonth());
  const date = switchday(today.getDate());
  let day = today.getDay(); // 요일
  let hour = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  const now =
    year +
    '-' +
    month +
    '-' +
    date +
    ' ' +
    hour +
    ':' +
    minutes +
    ':' +
    seconds;

  alert(now);

  return (
    <div>
      <h1>고객님의 주문이 완료되었습니다</h1>
      <br></br>
      <div>
        주문내역 및 배송에 관한 안내는 <a>주문조회</a>를 통하여 확인가능합니다.
      </div>
      <br />
      {/* <div>{`번호: ${searchParams.get("orderId")}`}</div> */}
      <div>{`주문번호: ${searchParams.get('orderId')}`}</div>
      <div>{}</div>
      {/* <div>{`결제 금액: ${Number(
        searchParams.get("amount")
      ).toLocaleString()}원`}</div> */}
      <div>{`주문일자: ${now}`}</div>
    </div>
  );
}
