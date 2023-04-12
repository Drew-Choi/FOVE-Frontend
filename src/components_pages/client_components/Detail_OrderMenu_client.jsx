import React from 'react';
import styled from 'styled-components';

const Detail_Order = styled.div`
  position: absolute;
  top: 70px;
  right: 150px;
  /* box-shadow: 0.5px 0.5px 2px 2px rgba(58, 58, 58, 0.2); */
  border-radius: 10px;
  border: 1px solid black;
  width: 300px;
  height: 500px;
`;

const Title = styled.p`
  position: relative;
  top: 50px;
  text-align: center;
  font-size: 20px;
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

const DetailDesc = styled.p`
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

export default function Detail_OrderMenu_client({ productName, size, detail }) {
  return (
    <Detail_Order>
      <Title>타이틀1111111111</Title>
      <InfoContain>
        <SizeBTN>OS</SizeBTN>
        <SizeBTN>S</SizeBTN>
        <SizeBTN>M</SizeBTN>
        <SizeBTN>L</SizeBTN>
        <SizeFitCheck>Size Fit*</SizeFitCheck>
        <DetailDesc>상세설명</DetailDesc>
        <CartIcon className="material-symbols-rounded">
          add_shopping_cart
        </CartIcon>
        <AddCart>Add Cart</AddCart>
        <br></br>
        <BuyCart>buy</BuyCart>
      </InfoContain>
    </Detail_Order>
  );
}
