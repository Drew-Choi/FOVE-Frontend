import React from 'react';
import styled from 'styled-components';

export default function FileUpload_img_madal({
  key,
  src,
  alt,
  onClickEvent,
  imageFilesData,
}) {
  return (
    <div>
      {imageFilesData.map((el, index) => (
        <img key={key} src={src} alt={alt} onClick={onClickEvent} />
      ))}
    </div>
  );
}
