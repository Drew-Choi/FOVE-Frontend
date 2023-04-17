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
import GoogleIcon from './GoogleIcon';

export default function Header_client() {
  const isAdmin = useSelector((state) => state.user.isAdmin);
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

  // 장바구니 버튼(Shopping Bag) - 로그인 상태에서 사용 가능하게
  const clickShoppingBag = () => {
    if (!isLogin) {
      alert('로그인이 필요한 서비스입니다.');
      return navigate(`/login`);
    }
    dispatch(offon());
  };


  console.log(`관리자인가요? ${isAdmin}`); // ////////////////////////////////////////////
  console.log(`로그인 상태? ${isLogin}`);

  //서칭용 상태관리
  const [searchOnOff, setSearchOnOff] = useState('off');
  //서칭용 엔터 핸들러
  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      // 검색 로직 실행
      await setSearchText(event.target.value);
      searchReq();
    }
  };
  //검색어 담기
  const [searchText, setSearchText] = useState('');

  const searchReq = async () => {
    try {
      console.log('인풋값:' + typeof searchText);
      const searchDataGet = await axios.post(
        'http://localhost:4000/store/search',
        {
          searchText: searchText,
        },
      );
      console.log(searchDataGet.data.searchedProduct);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <header className="header_client">
        <p className="logo" onClick={() => navigate('/')}>
          FOVE
        </p>

        {/* 관리자 페이지 이동 버튼 - test 중 */}
        {isAdmin && (
          <button onClick={() => navigate('/admin')}>관리자 페이지</button>
        )}

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
          <li id="search_container">
            <input
              className={`searchInput ${searchOnOff}`}
              type="text"
              placeholder="상품검색"
              onKeyPress={handleKeyPress}
            />
            <span
              className="material-symbols-outlined search"
              onClick={(cur) =>
                searchOnOff === 'off'
                  ? setSearchOnOff('on')
                  : setSearchOnOff('off')
              }
            >
              search
            </span>
          </li>
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
            <p onClick={clickShoppingBag}>SHOPPING BAG / {cartLength}</p>
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
