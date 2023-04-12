import React, { useEffect, useState } from 'react';
import '../../styles/header_client.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Header_client() {
  const [cartProductsLength, setCartProductsLength] = useState(null);

  useEffect(async () => {
    try {
      const cartDateGet = await axios.get('http://localhost:4000');
      await setCartProductsLength((cur) => cartDateGet.data.length);
      console.log('성공');
      console.log(cartDateGet.data.product);
    } catch (err) {
      alert(err.response.data);
    }
  }, []);

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
          <p onClick={() => navigate('#')}>ACCOUNT</p>
        </li>
        <li id="cate_li2_shopbag">
          <p onClick={() => navigate('#')}>
            SHOPPING BAG / {cartProductsLength}
          </p>
          {/* 0 이라는 숫자 장바구니에 넣을 때 올라가야 함 */}
        </li>
      </ul>
    </header>
  );
}
