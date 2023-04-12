import React, { useRef } from 'react';
import styled from 'styled-components';

const Detail_Sub_Image_Contain = styled.div`
  position: absolute;
  display: flex;
  top: 70px;
  left: 150px;
  width: 300px;
  height: 500px;
  /* background-color: beige; */
  justify-content: right;
  align-items: center;
`;

const Detail_Sub_Image_PositionCenter = styled.div`
  position: absolute;
`;

const Sub_IMG = styled.div`
  ${(props) =>
    props.imgFileName &&
    `background-image: url('http://localhost:4000/uploads/${props.imgFileName}');`}
  width: 50px;
  height: 50px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 20px;
  opacity: 1;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 0.3;
  }
`;

export default function Detail_SubImgae_client({ imgFileName }) {
  return (
    <Detail_Sub_Image_Contain>
      <Detail_Sub_Image_PositionCenter>
        {imgFileName[0].img.map((el, index) => (
          <Sub_IMG key={index} imgFileName={el}></Sub_IMG>
        ))}
      </Detail_Sub_Image_PositionCenter>
    </Detail_Sub_Image_Contain>
  );
}
