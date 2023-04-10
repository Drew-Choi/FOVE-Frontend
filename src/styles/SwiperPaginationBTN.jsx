import React from 'react';
import styled from 'styled-components';

const PaginationNum = styled.span`
  font-size: ${(props) => props.fontSize};
  padding: 10px;
  cursor: pointer;
  color: ${(props) => props.color};
  &:hover {
    color: ${(props) => props.hoverColor};
  }
`;

export default function SwiperPaginationBTN({
  children,
  onClickEvent,
  fontSize,
  color,
  hoverColor,
  useRef,
  className,
}) {
  return (
    <PaginationNum
      className={className}
      onClick={onClickEvent}
      fontSize={fontSize}
      color={color}
      hoverColor={hoverColor}
      useRef={useRef}
    >
      {children}
    </PaginationNum>
  );
}

SwiperPaginationBTN.defaultProps = {
  fontSize: '15px',
  color: 'black',
  hoverColor: 'gray',
};
