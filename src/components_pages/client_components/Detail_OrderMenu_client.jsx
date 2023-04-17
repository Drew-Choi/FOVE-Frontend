import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { add } from '../../store/modules/cart';
import { useNavigate, useParams } from 'react-router-dom';
import { single } from '../../store/modules/order';
import GoogleIcon from './GoogleIcon';
import Shipping_client from './Shipping_client';
import ModalContainer_client from './ModalContainer_client';
import ModalContainer_client2 from './ModalContainer_client2';

const Detail_Order = styled.div`
  position: absolute;
  top: 40px;
  right: 150px;
  /* box-shadow: 0.5px 0.5px 2px 2px rgba(58, 58, 58, 0.2); */
  border-radius: 10px;
  border: 1px solid black;
  width: 300px;
  height: 550px;
  z-index: 3;
`;

const Title = styled.p`
  position: relative;
  top: 50px;
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 1px;
`;

const InfoContain = styled.div`
  position: absolute;
  top: 120px;
  left: 51px;
`;

const SizeBTN = styled.button`
  all: unset;
  position: relative;
  bottom: 10px;
  /* background-color: #000000; */
  color: black;
  border: 1.5px solid black;
  width: 40px;
  margin-right: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 15px;
  transition: 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
  &:active {
    background-color: black;
    color: white;
    transform: scale(1.2);
  }
`;

const SizeFitCheck = styled.p`
  /* padding: 0px; */
  /* margin-top: 20px; */
  font-size: 13px;
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: 1px;
  cursor: pointer;

  &:hover {
    color: #a8a8a8;
  }
  &:active {
    color: #d7d7d7;
  }

  .material-symbols-outlined {
    font-size: 18px;
    font-weight: 500;
    margin-left: 5px;
  }
`;

const DetailDesc = styled.div`
  margin-bottom: 70px;
  font-size: 15px;
  font-weight: 500p;
  letter-spacing: 1px;
`;

const AddCart = styled.button`
  position: absolute;
  all: unset;
  border: 2px solid black;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-left: 45px;
  letter-spacing: 2px;
  font-weight: 500;
  color: white;
  background-color: black;
  transition: 0.2s ease;
  cursor: pointer;
  &:active {
    background-color: white;
    color: black;
  }
`;

const Buy = styled.button`
  position: absolute;
  all: unset;
  border: 2px solid black;
  padding: 10px 66px;
  border-radius: 5px;
  margin-bottom: 20px;
  letter-spacing: 2px;
  font-weight: 600;
  color: white;
  background-color: black;
  transition: 0.2s ease;
  cursor: pointer;
  &:active {
    background-color: white;
    color: black;
  }
`;

const CartIcon = styled.span`
  font-size: 30px;
  position: absolute;
  bottom: 90px;
  left: 3px;
`;

const CountContainer = styled.div`
  position: relative;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Plus = styled.span`
  font-size: 20px;
  padding-left: 15px;
  cursor: pointer;
  &:active {
    color: #b4b4b4;
  }
`;

const Miners = styled.span`
  font-size: 22px;
  font-weight: 500;
  transform: translateY(-2px);
  padding-right: 15px;
  cursor: pointer;
  &:active {
    color: #b4b4b4;
  }
`;

const CountNumber = styled.span`
  font-size: 20px;
`;

const SumPrice = styled.p`
  position: relative;
  font-size: 25px;
  letter-spacing: 3px;
  bottom: 30px;
  left: 25px;
`;

const DownInfoContain = styled.div`
  transform: translateY(-25px);
`;

export default function Detail_OrderMenu_client({
  productName,
  size,
  price,
  detail,
  datas,
}) {
  //리덕스 state 모음
  const user_ID = useSelector((state) => state.user);
  console.log(user_ID);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그인 여부 확인 - 장바구니 담기, 바로 구매 가능 여부 판단
  const isLogin = useSelector((state) => state.user.isLogin);

  //카트에 추가하는 Post 요청
  const addToCart = async () => {
    // 로그인 상태가 아니면, 로그인 페이지로 이동
    if (!isLogin) {
      alert('로그인이 필요한 서비스입니다.');
      return navigate(`/login`);
    }

    try {
      const reqData = await axios.post(
        `http://localhost:4000/cart/add/${user_ID.userID}`,
        {
          productName: datas.productName,
          img: datas.img[0],
          price: datas.price,
          size: datas.size,
          color: datas.color,
          quantity: count,
          unitSumPrice: datas.price * count,
          _id: datas._id,
        },
      );
      if (reqData.status === 200) {
        updateCart();
        console.log('성공');
      } else {
        console.error(reqData.status);
        console.log(reqData.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //카트 업데이트용 겟요청. => 이 데이터를 리덕스 리듀서로 보내서 데이터 업데이트 해줌
  const updateCart = async () => {
    try {
      const reqUpdat = await axios.get('http://localhost:4000');
      if (reqUpdat.status === 200) {
        dispatch(add(reqUpdat.data));
        console.log('성공');
      } else {
        console.error(reqUpdat.status);
        console.log(reqUpdat.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //주문으로 자료 넘기려는 용도
  const [count, setCount] = useState(1);

  //싱글상품 데이터
  const singleDataSum = (datas, count) => {
    let sumData = {
      productName: datas.productName,
      price: datas.price,
      quantity: count,
      size: datas.size,
      totalPrice: datas.price * count,
      img: datas.img[0],
      color: datas.color,
    };
    return sumData;
  };

  //콤마 찍기
  const country = navigator.language;
  const frontPriceComma = (price) => {
    if (price && typeof price.toLocaleString === 'function') {
      return price.toLocaleString(country, {
        currency: 'KRW',
      });
    } else {
      return price;
    }
  };

  //라우터
  const [shipon, setShipon] = useState(false);
  const handleOpenModal = () => {
    setShipon(true);
  };

  const handleCloseModal = () => {
    setShipon(false);
  };

  // 바로 구매 시(Buy 버튼)
  const buyNow = async () => {
    // 로그인 상태가 아니면, 로그인 페이지로 이동
    if (!isLogin) {
      alert('로그인이 필요한 서비스입니다.');
      return navigate(`/login`);
    }

    await dispatch(single(singleDataSum(datas, count)));
    navigate(`/store/order`);
  };

  const [beanieSizeOn, setBeanieSizeOn] = useState(false);
  const handleOpenModal2 = () => {
    setBeanieSizeOn(true);
  };

  const handleCloseModa2 = () => {
    setBeanieSizeOn(false);
  };

  return (
    <Detail_Order>
      {/* 일단 SHIPPING만 불러오기 */}
      {shipon && <Shipping_client handleCloseModal={handleCloseModal} />}
      {beanieSizeOn && (
        <>
          <ModalContainer_client handleCloseModa2={handleCloseModa2} />{' '}
          <ModalContainer_client2 handleCloseModa2={handleCloseModa2} />
        </>
      )}

      <Title>{productName}</Title>
      <InfoContain>
        <SizeBTN>OS</SizeBTN>
        <SizeBTN>S</SizeBTN>
        <SizeBTN>M</SizeBTN>
        <SizeBTN>L</SizeBTN>
        <DetailDesc>{detail}</DetailDesc>
        <SizeFitCheck>
          {/* SIZE & FIT 모달창 '비니'만 만들어놨는데 카테고리 별로 다르게 떠야함 */}
          <span onClick={handleOpenModal2}>SIZE & FIT</span>
          <span className="material-symbols-outlined">open_in_new</span>
        </SizeFitCheck>
        <SizeFitCheck>
          {/* SIZE & FIT 모달창 '비니'만 만들어놨는데 카테고리 별로 다르게 떠야함 */}
          <span onClick={handleOpenModal}>SHIPPING</span>
          <span className="material-symbols-outlined">open_in_new</span>
        </SizeFitCheck>

        <DownInfoContain>
          <CountContainer>
            <Miners
              onClick={() =>
                count <= 1 ? setCount((cur) => 1) : setCount((cur) => cur - 1)
              }
            >
              -
            </Miners>
            <CountNumber>{count}</CountNumber>

            <Plus onClick={() => setCount((cur) => cur + 1)}> + </Plus>
          </CountContainer>

          <CartIcon className="material-symbols-rounded">
            add_shopping_cart
          </CartIcon>

          <AddCart onClick={addToCart}>Add Cart</AddCart>
          <br></br>
          <Buy onClick={buyNow}>Buy</Buy>
        </DownInfoContain>
        <SumPrice>₩ {frontPriceComma(count * price)}</SumPrice>
      </InfoContain>
    </Detail_Order>
  );
}
