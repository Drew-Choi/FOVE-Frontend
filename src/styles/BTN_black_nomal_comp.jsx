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
    background-color: #97979728;
    color: black;
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
  type,
  className,
}) {
  return (
    <Btn_blakc_nomal
      transFontSize={transFontSize}
      fontSize={fontSize}
      onClick={onClickEvent}
      type={type}
      className={className}
    >
      {children}
    </Btn_blakc_nomal>
  );
}

BTN_black_nomal_comp.defaultProps = {
  fontSize: '15px',
};
