import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Contain = styled.div`
  position: relative;
  top: 200px;
`;

export default function TossPay_Complete() {
  // useEffect(async () => {
  //   await finalOrderPost();
  //   localStorage.removeItem('products');
  //   localStorage.removeItem('recipien');
  //   localStorage.removeItem('payments');
  // }, []);

  // const finalOrderPost = async () => {
  //   //로컬에서 주문내역 뺴서 가공
  //   const products = JSON.parse(localStorage.getItem('products'));
  //   const recipien = JSON.parse(localStorage.getItem('recipien'));
  //   const payments = JSON.parse(localStorage.getItem('payments'));

  //   //이게 최종 금액
  //   let totalSumPrice = 0;
  //   products.map((el) => (totalSumPrice += el.unitSumPrice));

  //   //백으로 최종 주문내역서 보내기
  //   try {
  //     const finalOrderData = await axios.post(
  //       'http://localhost:4000/store/order',
  //       {
  //         //상품정보
  //         products: products,
  //         //받는 이 정보
  //         message: recipien.message,
  //         recipientName: recipien.recipientName,
  //         recipientZipcode: recipien.recipientZipcode,
  //         recipientAddress: recipien.recipientAddress,
  //         recipientAddressDetail: recipien.recipientAddressDetail,
  //         phoneCode: recipien.phoneCode,
  //         phoneMidNum: recipien.phoneMidNum,
  //         phoneLastNum: recipien.phoneLastNum,
  //         payments: {
  //           status: payments.status,
  //           orderId: payments.orderId,
  //           approvedAt: payments.approvedAt,
  //           discount: payments.discount,
  //           cancels: payments.cancels,
  //           totalAmount: payments.totalAmount,
  //           suppliedAmoint: payments.suppliedAmoint,
  //           method: payments.method,
  //         },
  //       },
  //     );
  //     if (finalOrderData.status === 200) {
  //       console.log('성공');

  //       console.log(finalOrderData.data);
  //     } else {
  //       console.log('실패');

  //       console.log(finalOrderData.data);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // let switchday = function (num) {
  //   const result = num + 1 < 10 ? '0' + (num + 1) : num + 1;

  //   return result;
  // };
  // let today = new Date();
  // let year = today.getFullYear(); // 년도
  // const month = switchday(today.getMonth());
  // const date = switchday(today.getDate());
  // let day = today.getDay(); // 요일
  // let hour = today.getHours();
  // let minutes = today.getMinutes();
  // let seconds = today.getSeconds();

  // const now =
  //   year +
  //   '-' +
  //   month +
  //   '-' +
  //   date +
  //   ' ' +
  //   hour +
  //   ':' +
  //   minutes +
  //   ':' +
  //   seconds;

  // alert(now);

  return (
    <Contain>
      <h3>결제 완료</h3>
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
        {/* <div>{}</div>
        <div>{`결제 금액: ${
          Number().toLocaleString()
          searchParams.get('amount'),
        }원`}</div> */}
        {/* {/* <div>{`주문일자: ${now}`}</div> */}
      </div>
    </Contain>
  );
}
