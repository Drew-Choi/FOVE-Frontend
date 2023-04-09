import React from 'react';
import styled from 'styled-components';

const Btn_blakc_nomal = styled.button`
  all: unset;
  cursor: pointer;
  background-color: black;
  color: white;
  padding: 4px 10px;
  font-size: 15px;
  border-radius: 5px;
  &:hover {
    background-color: gray;
  }
`;

export default function BTN_black_nomal_comp({ text, onClickEvent }) {
  return <Btn_blakc_nomal onClick={onClickEvent}>{text}</Btn_blakc_nomal>;
}
