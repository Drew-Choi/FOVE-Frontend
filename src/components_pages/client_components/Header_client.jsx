import React from 'react';
import '../../styles/header_client.scss';
import { useNavigate } from 'react-router-dom';

export default function Header_client() {
  const navigate = useNavigate();
  return (
    <header className="header_client">
      <p className="logo" onClick={() => navigate('/')}>
        FOVE
      </p>
      <ul id="cate">
        <li id="cate_li">
          <p onClick={() => navigate('/aboutus')}>ABOUT US</p>
        </li>
        <li id="cate_li">
          <p onClick={() => navigate('/store')}>STORE</p>
        </li>
        <li id="cate_li">
          <p onClick={() => navigate('#')}>COLLECTION</p>
        </li>
      </ul>
      <ul id="cate2">
        <li id="cate_li2">
          <p onClick={() => navigate('/dropdown')}>ACCOUNT</p>
        </li>
        <li id="cate_li2">
          <p onClick={() => navigate('#')}>SHOPPING BAG /0</p>
          {/* 0 이라는 숫자 장바구니에 넣을 때 올라가야 함 */}
        </li>
      </ul>
    </header>
  );
}
