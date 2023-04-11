import React, { useState } from 'react';
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

export default function Product_client_indiLayout({
  imgFileName,
  onMouseEnterEvent,
  onMouseLeaveEvent,
  onClickEvent,
}) {
  return (
    <ImageContainer
      onMouseEnter={onMouseEnterEvent}
      onMouseLeave={onMouseLeaveEvent}
      onClick={onClickEvent}
    >
      {/* 위에서 선별된 이미지를 실제로 쏴준다. */}
      <ImageLayout src={`http://localhost:4000/uploads/${imgFileName}`} />
    </ImageContainer>
  );
}
