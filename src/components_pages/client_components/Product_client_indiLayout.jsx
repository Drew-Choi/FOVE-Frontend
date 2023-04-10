import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  background-color: white;
  display: inline-block;
`;

const ImageLayout = styled.img`
  width: 180px;
  display: inline-block;
`;

const ProductName = styled.p`
  text-align: center;
  font-size: 15px;
  color: black;
  font-weight: 700;
  margin: 0px;
`;

const ProductPrice = styled.p`
  text-align: center;
  font-size: 15px;
  color: black;
  font-weight: 500;
  margin: 0px;
  margin-bottom: 10px;
`;

export default function Product_client_indiLayout() {
  return (
    <ImageContainer>
      <ImageLayout src="/images/beanie_black_1.jpg" alt="product_img" />
      <ProductName>Beanie</ProductName>
      <ProductPrice>₩ 32,000</ProductPrice>
    </ImageContainer>
  );
}
