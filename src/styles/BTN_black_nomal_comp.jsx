import React from 'react';
import styled from 'styled-components';

const Btn_blakc_nomal = styled.span`
  cursor: pointer;
  background-color: black;
  color: white;
  padding: 4px 10px;
  font-size: ${(props) => props.fontSize};
  border-radius: 5px;
  transform-origin: center;
  transition: 0.2s ease;
  text-align: center;
  &:hover {
    background-color: gray;
  }
  &:active {
    font-size: ${(props) => props.transFontSize};
    text-align: center;
  }
`;

export default function BTN_black_nomal_comp({
  children,
  onClickEvent,
  fontSize,
  transFontSize,
}) {
  return (
    <Btn_blakc_nomal
      transFontSize={transFontSize}
      fontSize={fontSize}
      onClick={onClickEvent}
    >
      {children}
    </Btn_blakc_nomal>
  );
}