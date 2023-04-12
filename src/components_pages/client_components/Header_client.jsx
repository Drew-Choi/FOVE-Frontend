import React, { useEffect, useState } from 'react';
import '../../styles/header_client.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import cartdatas from '../../store/modules/cartdata';

export default function Header_client() {
  const cartLength = useSelector((state) => state.cartdata.length);
  const cartProductsData = useSelector((state) => state.cartdata.products);
  const [cartDataOrigin, setCartDataOrigin] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    cartDataReq();
  }, []);

  const cartDataReq = async () => {
    try {
      const cartDateGet = await axios.get('http://localhost:4000');
      await setCartDataOrigin((cur) => cartDateGet.data);
      console.log('성공');
      if (cartDateGet.status === 200) {
        dispatch(cartdatas(cartDataOrigin));
      }
    } catch (err) {
      alert(err.response.data);
    }
  };

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
          <p onClick={() => navigate('#')}>SHOPPING BAG / {cartLength}</p>
          {/* 0 이라는 숫자 장바구니에 넣을 때 올라가야 함 */}
        </li>
      </ul>
    </header>
  );
}
