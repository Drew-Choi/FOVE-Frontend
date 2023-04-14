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
  menu6,
  menu7,
  bottom,
  top,
  onClickEvent1,
  onClickEvent2,
  onClickEvent3,
  onClickEvent4,
  onClickEvent5,
  onClickEvent6,
  onClickEvent7,
}) {
  return (
    <NavBar bottom={bottom} top={top}>
      <Ul>
        <Li onClick={onClickEvent1}>{menu1}</Li>
        <Li onClick={onClickEvent2}>{menu2}</Li>
        <Li onClick={onClickEvent3}>{menu3}</Li>
        <Li onClick={onClickEvent4}>{menu4}</Li>
        <Li onClick={onClickEvent5}>{menu5}</Li>
        <Li onClick={onClickEvent6}>{menu6}</Li>
        <Li onClick={onClickEvent7}>{menu7}</Li>
      </Ul>
    </NavBar>
  );
}
