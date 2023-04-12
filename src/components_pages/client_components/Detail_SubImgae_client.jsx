import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Detail_Image_Layout_client from './Detail_Image_Layout_client ';

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

export default function Detail_SubImgae_client({ data }) {
  const [selectImgFileName, setSelectImgFileName] = useState(data[0].img[0]);

  return (
    <>
      <Detail_Sub_Image_Contain>
        <Detail_Sub_Image_PositionCenter>
          {data[0].img.map((el, index) => (
            <Sub_IMG
              onClick={() => setSelectImgFileName((cur) => el)}
              key={index}
              imgFileName={el}
            ></Sub_IMG>
          ))}
        </Detail_Sub_Image_PositionCenter>
      </Detail_Sub_Image_Contain>

      <div className="image_area">
        <Detail_Image_Layout_client imgFileData={selectImgFileName} />
      </div>
    </>
  );
}
