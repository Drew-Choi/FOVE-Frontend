import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  background-color: white;
  display: inline-block;
  height: 270px;
  width: 180px;
`;

const ImageLayout = styled.img`
  display: inline-block;
  width: 180px;
`;

const ProductInfoLayout = styled.div`
  position: absolute;
  right: 0px;
  left: 0px;
  bottom: 0px;
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
`;

export default function Product_client_indiLayout({
  imgFileName,
  productName,
  price,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <ImageContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <ImageLayout src={'http://localhost:4000/uploads/' + imgFileName} />
      <ProductInfoLayout>
        <ProductName>{productName}</ProductName>
        <ProductPrice>₩ {price}</ProductPrice>
      </ProductInfoLayout>
    </ImageContainer>
  );
}
