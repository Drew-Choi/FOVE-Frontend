import React from 'react';
import '../../styles/header_admin.scss';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Home = styled.span`
  position: relative;
  left: 325px;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    color: darkgray;
  }
  &:active {
    color: white;
  }
`;

const Emogy = styled.span`
  font-size: 20px;
  cursor: pointer;
`;

export default function Header_admin() {
  const navigate = useNavigate();
  return (
    <header className="header_admin">
      <p className="logo" onClick={() => navigate('/admin')}>
        FOVE Admin
      </p>
      <strong style={{ position: 'relative', left: '600px' }}>
        관리자 페이지
      </strong>
      <Home onClick={() => navigate('/')}> STORE HOME </Home>
      <Emogy>⇥</Emogy>
    </header>
  );
}
