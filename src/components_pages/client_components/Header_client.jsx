import React, { useEffect, useState } from 'react';
import '../../styles/header_client.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { importdb } from '../../store/modules/cart';
import CartModal from './CartModal';

export default function Header_client() {
  const [cartDataOrigin, setCartDataOrigin] = useState(null);
  //리덕스 디스패치(액션함수 전달용)
  const dispatch = useDispatch();
  const cartLength = useSelector((state) => state.cart.cartProductsLength);

  useEffect(() => {
    cartDataReq();
  }, []);

  const cartDataReq = async () => {
    try {
      const cartDataGet = await axios.get('http://localhost:4000');
      if (cartDataGet.status === 200) {
        await setCartDataOrigin((cur) => cartDataGet.data.length);
        dispatch(importdb(cartDataGet.data));
      } else {
        console.error(cartDataGet.status);
        console.log(cartDataGet.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();
  return (
    <>
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

      {/* 카트 모달 임 */}
      <CartModal />
    </>
  );
}
