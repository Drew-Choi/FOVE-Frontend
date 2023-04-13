import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/order_client.scss';
import axios from 'axios';

export default function Order_client() {
  const { id } = useParams();

  const orderPOST = async () => {
    try {
      const orderData = await axios.post('http://localhost:4000/store/order', {
        productName: '희성이는 예쁘다',
        price: 1000000000,
        size: 'S',
        color: 'blue',
        quantity: 10,
        unitSumPrice: 20,
        massage: '역시 희성이 성공 할 줄 알아썽!',
        status: '역시 데이터 전송 성공! 역시 희성이구만',
        paymentMethod: '현금빵',
      });
      if (orderData.status === 200) {
        console.log('성공');
        console.log(orderData);
      } else {
        console.log('실패');
        console.log(orderData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="order_main">
      <p className="order_title">주문서 작성</p>

      {/* {datas && ( */}
      <>
        <img
          className="order_pdIMG"
          // src={`http://localhost:4000/uploads/${datas.img}`}
        ></img>
        <p className="order_product_title">상품이름</p>
        <p className="order_product_price">가격</p>
        <p className="order_product_size">사이즈</p>
        <p className="order_product_color">컬러</p>
        <p className="order_product_quantity">수량</p>
        <p className="order_product_unitSumPrice">총 가격</p>
        <button>결제하기</button>
      </>
      {/* )} */}
      <button onClick={() => orderPOST()}>결제하기</button>
    </div>
  );
}
