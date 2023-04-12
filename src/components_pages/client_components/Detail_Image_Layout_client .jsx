import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  top: 40px;
  background-color: white;
  display: inline-block;
  height: 540px;
  width: 400px;
  z-index: 1;
`;

const ImageLayout = styled.img`
  display: inline-block;
  width: 400px;
  z-index: 1;
  transition: 0.3s ease;
`;

export default function Detail_Image_Layout_client({ imgFileData }) {
  return (
    <>
      <ImageContainer>
        {/* 위에서 선별된 이미지를 실제로 쏴준다. */}
        <ImageLayout
          src={`http://localhost:4000/uploads/${imgFileData}`}
          alt="main_preview"
        />
      </ImageContainer>
    </>
  );
}
