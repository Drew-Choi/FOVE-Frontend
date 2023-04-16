import React from 'react';

export default function TossPay_Complete() {
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
      <h3>결제 중</h3>
      <div>
        <h1>고객님의 주문이 완료되었습니다</h1>
        <br></br>
        <div>
          주문내역 및 배송에 관한 안내는 <a>주문조회</a>를 통하여
          확인가능합니다.
        </div>
        <br />
        {/* <div>{`번호: ${searchParams.get("orderId")}`}</div> */}
        {/* <div>{`주문번호: ${searchParams.get('orderId')}`}</div> */}
        <div>{}</div>
        <div>{`결제 금액: ${
          Number().toLocaleString()
          // searchParams.get('amount'),
        }원`}</div>
        {/* <div>{`주문일자: ${now}`}</div> */}
      </div>
    </div>
  );
}
