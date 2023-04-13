import React from 'react';
import styled from 'styled-components';

const CartModal_Layout = styled.div`
  position: fixed;
  background-color: white;
  top: 69.5px;
  width: 350px;
  height: 77.5%;
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
  /* background-color: beige; */
  width: 300px;
  height: 120px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
`;

const Img = styled.div`
  position: absolute;
  margin-top: auto;
  margin-bottom: auto;
  left: 0px;
  width: 100px;
  height: 100px;
  background-image: url('/images/beanie_black_1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Pd_name = styled.p`
  position: relative;
  left: 100px;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 2px;
  margin-bottom: 3px;
`;
const Pd_color = styled.p`
  position: relative;
  left: 100px;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 0px;
`;

const Pd_size = styled.p`
  position: relative;
  left: 100px;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 3px;
`;

const Pd_pice = styled.p`
  position: relative;
  left: 200px;
  font-weight: 500;
  font-size: 13px;
  top: 15px;
  letter-spacing: 2px;
  margin-bottom: 3px;
`;

const Pd_quantity_contain = styled.div`
  position: relative;
  display: grid;
  grid-template-areas: 'plus count miners';
  bottom: 10px;
  left: 100px;
  width: 90px;
  height: 20px;
  /* background-color: #ffaeae; */
  /* border: 0.5px solid black; */
`;

const Pd_miners = styled.span`
  font-size: 18px;
  font-weight: 550;
  grid-column: 3/3;
  transform: translateY(-2px);
  grid-row: 1/1;
  justify-self: center;
  align-self: center;
  cursor: pointer;
  &:active {
    color: #b4b4b4;
  }
`;

const Pd_plus = styled.span`
  font-size: 15px;
  justify-self: center;
  align-self: center;
  grid-column: 1/1;
  grid-row: 1/1;
  cursor: pointer;
  &:active {
    color: #b4b4b4;
  }
`;

const Pd_count = styled.span`
  justify-self: center;
  align-self: center;
  grid-column: 2/2;
  grid-row: 1/1;
  font-size: 15px;
  transform: translateY(-1px);
`;

const Line1 = styled.div`
  grid-area: miners;
  border: 0.5px solid black;
`;

const Line2 = styled.div`
  grid-area: plus;
  border: 0.5px solid black;
`;

const Line3 = styled.div`
  grid-area: count;
  border: 0.5px solid black;
`;

export default function CartModal({ className }) {
  return (
    <>
      <CartModal_Layout className={className}>
        <CartTitle>ORDER SUMMERY</CartTitle>
        <CloseIcon className="material-symbols-outlined">close</CloseIcon>
        <ContentContainer>
          <Img></Img>
          <Pd_name>타이틀zz11111</Pd_name>
          <Pd_color>색상</Pd_color>
          <Pd_size>size S</Pd_size>
          <Pd_pice>₩ 1000000</Pd_pice>
          <Pd_quantity_contain>
            <Line1></Line1>
            <Line2></Line2>
            <Line3></Line3>
            <Pd_plus>+</Pd_plus>
            <Pd_count>1</Pd_count>
            <Pd_miners>-</Pd_miners>
          </Pd_quantity_contain>
        </ContentContainer>
      </CartModal_Layout>
    </>
  );
}
