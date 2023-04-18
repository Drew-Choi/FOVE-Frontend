import React, { useEffect, useState } from 'react';
import '../../styles/header_client.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { importdb } from '../../store/modules/cart';
import CartModal from './CartModal';
import { offon } from '../../store/modules/cartmodal';
import MenuAccount from './MenuAccount';
import { clickMenu } from '../../store/modules/menuAccount';
import GoogleIcon from './GoogleIcon';
import { searchinput } from '../../store/modules/search';

export default function Header_client() {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isLogin = useSelector((state) => state.user.isLogin);
  const menuClicked = useSelector((state) => state.menuAccount.clicked);
  const navigate = useNavigate();

  //리덕스 디스패치(액션함수 전달용)
  const dispatch = useDispatch();
  //상품정보 state
  const cartLength = useSelector((state) =>
    state.cart.cartProductsLength === 0 ? 0 : state.cart.cartProductsLength,
  );
  //유저정보 state
  const userID = useSelector((state) =>
    state.user.userID === 0 ? 0 : state.user.userID,
  );

  const location = useLocation();
  const currentURL = location.pathname;

  const cartDataReq = async () => {
    try {
      const cartDataGet = await axios.post(
        `http://localhost:4000/cart/list/${userID}`,
      );
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

  useEffect(() => {
    cartDataReq();
  });

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

  //서칭용 상태관리
  const [searchOnOff, setSearchOnOff] = useState('off');
  //인풋값 담기
  const [searchText, setSearchText] = useState('');
  //검색창에 검색 안할떄
  const [empty, setEmpty] = useState('상품검색');

  //서칭용 엔터 핸들러
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // 검색 로직 실행
      dispatch(searchinput(e.target.value));
      // setSearchText(e.target.value);
      // navigate(`/store?keyword=${searchText}`);
    }
  };

  return (
    <>
      <header className="header_client">
        <p className="logo" onClick={() => navigate('/')}>
          FOVE
        </p>

        {/* 관리자 페이지 이동 버튼 */}
        {isAdmin && (
          <button onClick={() => navigate('/admin/register')}>
            👩‍💻 관리자 페이지
          </button>
        )}

        <ul id="cate">
          <li id="cate_li">
            <p onClick={() => navigate('/aboutus')}>ABOUT US</p>
          </li>
          <li id="cate_li">
            <p onClick={() => navigate('/store')}>STORE</p>
          </li>
          {/* <li id="cate_li">
            <p onClick={() => navigate('#')}>COLLECTION</p>
          </li> */}
        </ul>
        <ul id="cate2">
          <li id="search_container">
            <input
              className={`searchInput ${searchOnOff}`}
              type="text"
              placeholder={empty}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            {currentURL === '/' ? (
              <></>
            ) : (
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
            )}
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
