import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { add } from '../../store/modules/cart';

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
  padding: 20px 0px;
  font-size: 12px;
  font-weight: 500p;
  letter-spacing: 2px;
  cursor: pointer;
  &:hover {
    color: #a8a8a8;
  }
  &:active {
    color: #d7d7d7;
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

const BuyCart = styled.button`
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
  padding-right: 15px;
  cursor: pointer;
  &:active {
    color: #b4b4b4;
  }
`;

const Miners = styled.span`
  font-size: 22px;
  font-weight: 500;
  transform: translateY(-2px);
  padding-left: 15px;
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
          productData: datas.productData,
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

  const [count, setCount] = useState(1);

  const country = navigator.language;
  const frontPriceComma = (price) => price.toLocaleString(country);

  return (
    <Detail_Order>
      <Title>{productName}</Title>
      <InfoContain>
        <SizeBTN>OS</SizeBTN>
        <SizeBTN>S</SizeBTN>
        <SizeBTN>M</SizeBTN>
        <SizeBTN>L</SizeBTN>
        <SizeFitCheck>Size Fit*</SizeFitCheck>
        <DetailDesc>{detail}</DetailDesc>
        <DownInfoContain>
          <CountContainer>
            <Plus onClick={() => setCount((cur) => cur + 1)}> + </Plus>

            <CountNumber>{count}</CountNumber>
            <Miners
              onClick={() =>
                count <= 1 ? setCount((cur) => 1) : setCount((cur) => cur - 1)
              }
            >
              -
            </Miners>
          </CountContainer>

          <CartIcon className="material-symbols-rounded">
            add_shopping_cart
          </CartIcon>

          <AddCart onClick={addToCart}>Add Cart</AddCart>
          <br></br>
          <BuyCart>buy</BuyCart>
        </DownInfoContain>
        <SumPrice>₩ {frontPriceComma(count * price)}</SumPrice>
      </InfoContain>
    </Detail_Order>
  );
}
