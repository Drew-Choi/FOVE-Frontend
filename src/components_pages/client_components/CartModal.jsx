import React from 'react';
import styled from 'styled-components';

const CartModal_Layout = styled.div`
  position: absolute;
  background-color: white;
  top: 69.5px;
  width: 350px;
  height: 700px;
  z-index: 999;
  right: 0px;
  border: 0.5px solid black;
  padding: 10px;
`;

const CartTitle = styled.span`
  position: relative;
  font-size: 12px;
  font-weight: 700;
  padding: 20px;
`;

const CloseIcon = styled.span`
  top: 12px;
  position: relative;
  display: inline-block;
  font-size: 30px;
  left: 145px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  top: 10px;
  position: relative;
  background-color: beige;
  width: 300px;
  height: 100px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
`;

const Img = styled.div`
  position: absolute;
  top: 0px;
  width: 100px;
  height: 100px;
  background-image: url('/images/beanie_black_1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Pd_name = styled.p`
  position: relative;
  font-weight: 500;
  font-size: 15px;
  right: 50%;
  transform: translateX(50%);
  letter-spacing: 2px;
`;
const Pd_color = styled.p`
  font-size: 15px;
`;

export default function CartModal() {
  return (
    <CartModal_Layout>
      <CartTitle>ORDER SUMMERY</CartTitle>
      <CloseIcon className="material-symbols-outlined">close</CloseIcon>
      <ContentContainer>
        <Img></Img>
        <Pd_name>타이틀</Pd_name>
        <Pd_color>색상</Pd_color>
      </ContentContainer>
    </CartModal_Layout>
  );
}
