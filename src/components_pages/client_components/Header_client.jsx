import React, { useEffect, useState } from 'react';
import '../../styles/header_client.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { importdb } from '../../store/modules/cart';
import CartModal from './CartModal';
import { offon } from '../../store/modules/cartmodal';
import MenuAccount from './MenuAccount';
import { clickMenu } from '../../store/modules/menuAccount';

export default function Header_client() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const menuClicked = useSelector((state) => state.menuAccount.clicked);

  //리덕스 디스패치(액션함수 전달용)
  const dispatch = useDispatch();
  const cartLength = useSelector((state) =>
    state.cart.cartProductsLength === 0 ? 0 : state.cart.cartProductsLength,
  );

  useEffect(() => {
    cartDataReq();
  }, []);

  const cartDataReq = async () => {
    try {
      const cartDataGet = await axios.get('http://localhost:4000');
      if (cartDataGet.status === 200) {
        await dispatch(importdb(cartDataGet.data));
      } else {
        console.error(cartDataGet.status);
        console.log(cartDataGet.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();

  //모달을 위한 state
  const offonKey = useSelector((state) => state.cartmodal.offon);

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
            {isLogin ? (
              <p
                onClick={() => {
                  dispatch(clickMenu());
                }}
              >
                ACCOUNT
              </p>
            ) : (
              <p
                onClick={() => {
                  navigate(`/login`);
                }}
              >
                LOG IN
              </p>
            )}
          </li>
          <li id="cate_li2_shopbag">
            <p onClick={() => dispatch(offon())}>SHOPPING BAG / {cartLength}</p>
            {/* 0 이라는 숫자 장바구니에 넣을 때 올라가야 함 */}
          </li>
        </ul>
      </header>

      {/* 카트 모달 임 */}
      <CartModal className={`cart_modal ${offonKey}`} />

      {/* ACCOUNT 메뉴 */}
      {menuClicked && <MenuAccount />}
    </>
  );
}
