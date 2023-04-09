import React from 'react';
import styled from 'styled-components';
import BTN_black_nomal_comp from '../styles/BTN_black_nomal_comp';

const Section = styled.section`
  width: 100vw;
  height: 100vw;
  background-color: beige;
  display: flex;
  justify-content: center;
`;

const ImageModalLayout = styled.div`
  position: absolute;
  background-color: aqua;
  width: 500px;
  height: 700px;
`;

const ImagePrevew = styled.img`
  width: 100px;
`;

export default function FileUpload_img_madal({
  imgOnClickEvent,
  inputOnChangeEvent,
  imageFilesData,
  inputRef,
  BtnOnClickEvent,
}) {
  return (
    <Section>
      <ImageModalLayout>
        {imageFilesData.map((el, index) => (
          <ImagePrevew
            key={index}
            src={el.thumbnail}
            alt={el.type}
            onClick={imgOnClickEvent}
          />
        ))}

        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          ref={inputRef}
          onChange={inputOnChangeEvent}
          multiple
        />
        <BTN_black_nomal_comp
          type="button"
          onClickEvent={BtnOnClickEvent}
          fontSize="12px"
        >
          파일선택
        </BTN_black_nomal_comp>
      </ImageModalLayout>
    </Section>
  );
}
