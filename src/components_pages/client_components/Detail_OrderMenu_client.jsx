import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { add } from '../../store/modules/cart';
import { useNavigate, useParams } from 'react-router-dom';
import { single } from '../../store/modules/order';
import GoogleIcon from './GoogleIcon';
import Shipping_client from './Shipping_client';

const Detail_Order = styled.div`
  position: absolute;
  top: 40px;
  right: 150px;
  /* box-shadow: 0.5px 0.5px 2px 2px rgba(58, 58, 58, 0.2); */
  border-radius: 10px;
  border: 1px solid black;
  width: 300px;
  height: 550px;
  z-index: 3;
`;

const Title = styled.p`
  position: relative;
  top: 50px;
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 1px;
`;

const InfoContain = styled.div`
  position: absolute;
  top: 120px;
  left: 65px;
`;

const SizeBTN = styled.button`
  all: unset;
  position: relative;
  bottom: 10px;
  background-color: #000000;
  color: white;
  border: 2px solid black;
  width: 30px;
  margin-right: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
  }
  &:active {
    background-color: white;
    color: #d7d7d7;
  }
`;

const SizeFitCheck = styled.p`
  padding: 0px;
  margin-top: 20px;
  font-size: 13px;
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: 1px;
  cursor: pointer;
  &:hover {
    color: #a8a8a8;
  }
  &:active {
    color: #d7d7d7;
  }

  .material-symbols-outlined {
    font-size: 18px;
    font-weight: 500;
    margin-left: 5px;
  }
`;

const DetailDesc = styled.div`
  margin-bottom: 70px;
  font-size: 15px;
  font-weight: 500p;
  letter-spacing: 1px;
`;

const AddCart = styled.button`
  position: absolute;
  all: unset;
  border: 2px solid black;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-left: 45px;
  letter-spacing: 2px;
  font-weight: 500;
  color: white;
  background-color: black;
  transition: 0.2s ease;
  cursor: pointer;
  &:active {
    background-color: white;
    color: black;
  }
`;

const Buy = styled.button`
  position: absolute;
  all: unset;
  border: 2px solid black;
  padding: 10px 66px;
  border-radius: 5px;
  margin-bottom: 20px;
  letter-spacing: 2px;
  font-weight: 600;
  color: white;
  background-color: black;
  transition: 0.2s ease;
  cursor: pointer;
  &:active {
    background-color: white;
    color: black;
  }
`;

const CartIcon = styled.span`
  font-size: 30px;
  position: absolute;
  bottom: 90px;
  left: 3px;
`;

const CountContainer = styled.div`
  position: relative;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Plus = styled.span`
  font-size: 20px;
  padding-left: 15px;
  cursor: pointer;
  &:active {
    color: #b4b4b4;
  }
`;

const Miners = styled.span`
  font-size: 22px;
  font-weight: 500;
  transform: translateY(-2px);
  padding-right: 15px;
  cursor: pointer;
  &:active {
    color: #b4b4b4;
  }
`;

const CountNumber = styled.span`
  font-size: 20px;
`;

const SumPrice = styled.p`
  position: relative;
  font-size: 25px;
  letter-spacing: 3px;
  bottom: 30px;
  left: 25px;
`;

const DownInfoContain = styled.div`
  transform: translateY(-25px);
`;

export default function Detail_OrderMenu_client({
  productName,
  size,
  price,
  detail,
  datas,
}) {
  const dispatch = useDispatch();

  //카트에 추가하는 Post 요청
  const addToCart = async () => {
    try {
      const reqData = await axios.post(
        `http://localhost:4000/store/productId/${datas._id}`,
        {
          productName: datas.productName,
          img: datas.img[0],
          price: datas.price,
          size: datas.size,
          color: datas.color,
          quantity: count,
          unitSumPrice: datas.price * count,
          _id: datas._id,
        },
      );
      if (reqData.status === 200) {
        updateCart();
        console.log('성공');
      } else {
        console.error(reqData.status);
        console.log(reqData.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //카트 업데이트용 겟요청. => 이 데이터를 리덕스 리듀서로 보내서 데이터 업데이트 해줌
  const updateCart = async () => {
    try {
      const reqUpdat = await axios.get('http://localhost:4000');
      if (reqUpdat.status === 200) {
        dispatch(add(reqUpdat.data));
        console.log('성공');
      } else {
        console.error(reqUpdat.status);
        console.log(reqUpdat.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //주문으로 자료 넘기려는 용도
  const [count, setCount] = useState(1);

  //싱글상품 데이터
  const singleDataSum = (datas, count) => {
    let sumData = {
      productName: datas.productName,
      price: datas.price,
      quantity: count,
      size: datas.size,
      totalPrice: datas.price * count,
      img: datas.img[0],
      color: datas.color,
    };
    return sumData;
  };

  //콤마 찍기
  const country = navigator.language;
  const frontPriceComma = (price) => {
    if (price && typeof price.toLocaleString === 'function') {
      return price.toLocaleString(country, {
        currency: 'KRW',
      });
    } else {
      return price;
    }
  };

  //라우터
  const navigate = useNavigate();
  const [shipon, setShipon] = useState(true);
  const handleOpenModal = () => {
    setShipon(true);
  };

  const handleCloseModal = () => {
    setShipon(false);
  };

  return (
    <Detail_Order>
      {/* 일단 SHIPPING만 불러오기 */}
      {shipon && <Shipping_client shipoff={handleCloseModal} />}

      <Title>{productName}</Title>
      <InfoContain>
        <SizeBTN>OS</SizeBTN>
        <SizeBTN>S</SizeBTN>
        <SizeBTN>M</SizeBTN>
        <SizeBTN>L</SizeBTN>

        <SizeFitCheck>
          {/* SIZE & FIT 모달창 '비니'만 만들어놨는데 카테고리 별로 다르게 떠야함 */}
          <span>SIZE & FIT</span>
          <span className="material-symbols-outlined">open_in_new</span>
        </SizeFitCheck>
        <SizeFitCheck>
          {/* SIZE & FIT 모달창 '비니'만 만들어놨는데 카테고리 별로 다르게 떠야함 */}
          <span onClick={() => handleOpenModal}>SHIPPING</span>
          <span className="material-symbols-outlined">open_in_new</span>
        </SizeFitCheck>
        <DetailDesc>{detail}</DetailDesc>
        <DownInfoContain>
          <CountContainer>
            <Miners
              onClick={() =>
                count <= 1 ? setCount((cur) => 1) : setCount((cur) => cur - 1)
              }
            >
              -
            </Miners>
            <CountNumber>{count}</CountNumber>

            <Plus onClick={() => setCount((cur) => cur + 1)}> + </Plus>
          </CountContainer>

          <CartIcon className="material-symbols-rounded">
            add_shopping_cart
          </CartIcon>

          <AddCart onClick={addToCart}>Add Cart</AddCart>
          <br></br>
          <Buy
            onClick={async () => {
              await dispatch(single(singleDataSum(datas, count)));
              navigate(`/store/order`);
            }}
          >
            buy
          </Buy>
        </DownInfoContain>
        <SumPrice>₩ {frontPriceComma(count * price)}</SumPrice>
      </InfoContain>
    </Detail_Order>
  );
}
