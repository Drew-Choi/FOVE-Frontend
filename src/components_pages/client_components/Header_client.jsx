import React from 'react';
import '../../styles/header_client.scss';
import { useNavigate } from 'react-router-dom';

export default function Header_client() {
  const navigate = useNavigate();
  return (
    <header className="header_client">
      <p className="logo" onClick={() => navigate('#')}>
        FOVE
      </p>
      <p className="header_bar" onClick={() => navigate('#')}>
        <nav id="main_menu">
          <ul id="cate">
            <li id="cate_li">
              <a href="#">ABOUT US</a>
            </li>
            <li id="cate_li">
              <a href="#">STORE</a>
            </li>
            <li id="cate_li">
              <a href="#">COLLECTION</a>
            </li>
          </ul>
        </nav>
      </p>
    </header>
  );
}
