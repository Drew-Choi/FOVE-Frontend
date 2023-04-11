import React from 'react';
import styled from 'styled-components';

const NavBar = styled.nav`
  position: relative;
  top: ${(props) => props.top};
  background-color: white;
  border-bottom: solid 0.5px black;
  bottom: ${(props) => props.bottom};
`;
const Ul = styled.ul`
  display: flex;
  padding-top: 12px;
  padding-bottom: 2px;
  padding-left: 35px;
  align-items: center;
`;

const Li = styled.li`
  cursor: pointer;
  padding: 5px 20px 2px;
  font-size: 70%;
  list-style: none;
  color: rgb(84, 84, 84);
  &:hover {
    color: rgb(0, 0, 0);
  }
`;

export default function SubNav_client({
  menu1,
  menu2,
  menu3,
  menu4,
  menu5,
  bottom,
  top,
}) {
  return (
    <NavBar bottom={bottom} top={top}>
      <Ul>
        <Li>{menu1}</Li>
        <Li>{menu2}</Li>
        <Li>{menu3}</Li>
        <Li>{menu4}</Li>
        <Li>{menu5}</Li>
      </Ul>
    </NavBar>
  );
}
