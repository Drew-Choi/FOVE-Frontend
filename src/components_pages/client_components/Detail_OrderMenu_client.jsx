import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Detail_Order = styled.div`
  position: absolute;
  top: 40px;
  right: 150px;
  /* box-shadow: 0.5px 0.5px 2px 2px rgba(58, 58, 58, 0.2); */
  border-radius: 10px;
  border: 1px solid black;
  width: 300px;
  height: 550px;
`;

const Title = styled.p`
  position: relative;
  top: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
`;

const Price = styled.p`
  position: relative;
  top: 40px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 1px;
`;

const InfoContain = styled.div`
  position: absolute;
  top: 120px;
  left: 65px;
`;

const SizeBTN = styled.button`
  all: unset;
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

export default function Detail_OrderMenu_client({
  productName,
  size,
  price,
  detail,
  data,
}) {
  const { id } = useParams();
  const addToCart = async () => {
    try {
      const reqData = await axios.post(
        `http://localhost:4000/store/productId/6434f6e0354e918b1d7453f4`,
        {
          productData: data.productData,
          img: data.img[0],
          price: data.price,
          size: data.size,
          color: data.color,
          quantity: 4,
          unitSumPrice: data.price * 4,
          _id: id,
        },
      );
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <Detail_Order>
      <Title>{productName}</Title>
      <Price>₩ {price}</Price>
      <InfoContain>
        <SizeBTN>OS</SizeBTN>
        <SizeBTN>S</SizeBTN>
        <SizeBTN>M</SizeBTN>
        <SizeBTN>L</SizeBTN>
        <SizeFitCheck>Size Fit*</SizeFitCheck>
        <DetailDesc>{detail}</DetailDesc>
        <CartIcon className="material-symbols-rounded">
          add_shopping_cart
        </CartIcon>
        <AddCart onClick={addToCart}>Add Cart</AddCart>
        <br></br>
        <BuyCart>buy</BuyCart>
      </InfoContain>
    </Detail_Order>
  );
}
