import React from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.h2`
  position: absolute;
  top: 300px;
  z-index: 999;
`;

export default function Error404() {
  return (
    <div>
      <ErrorMessage>NOT FOUND 404err</ErrorMessage>
    </div>
  );
}
