import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { reset, update } from '../../store/modules/cart';
import { offon } from '../../store/modules/cartmodal';
import BTN_black_nomal_comp from '../../styles/BTN_black_nomal_comp';
import '../../styles/cartModal.scss';
import { useNavigate, useParams } from 'react-router-dom';

const CartModal_Layout = styled.div`
  position: fixed;
  background-color: white;
  top: 69.5px;
  width: 350px;
  height: 77.5%;
  z-index: 999;
  right: 0px;
  border: 0.5px solid black;
  padding: 10px;
  overflow: scroll;
`;

const CartTitle = styled.span`
  position: relative;
  font-size: 12px;
  font-weight: 700;
  padding: 20px;
`;

const ExtraTextContainer = styled.div`
  position: relative;
  /* background-color: aqua; */
  display: block;
  width: 270px;
  height: 10px;
`;

const UnitSum = styled.span`
  position: relative;
  display: inline-block;
  top: -5px;
  left: 20px;
  font-size: 11px;
  font-weight: 500;
  margin-right: 5px;
`;

const UnitSumNum = styled.span`
  position: relative;
  top: -5px;
  left: 20px;
  font-size: 11px;
  font-weight: 600;
  margin-right: 5px;
`;

const AllRemove = styled.p`
  position: absolute;
  display: inline-block;
  top: 20px;
  left: 21px;
  font-size: 10px;
  font-weight: 500;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    color: #ff5858;
  }
  &:active {
    color: #ffe0e0;
  }
`;

const CloseIcon = styled.span`
  top: 12px;
  position: relative;
  display: inline-block;
  font-size: 30px;
  left: 145px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  top: 10px;
  position: relative;
  /* background-color: beige; */
  width: 300px;
  height: 120px;
  padding: 10px;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
`;

const Img = styled.div`
  position: absolute;
  margin-top: auto;
  margin-bottom: auto;
  left: 0px;
  width: 100px;
  height: 100px;
  ${(props) =>
    props.imgURL &&
    `background-image: url('http://localhost:4000/uploads/${props.imgURL}');`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Pd_name = styled.p`
  position: relative;
  width: 200px;
  left: 100px;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 2px;
  margin-bottom: 3px;
`;
const Pd_color = styled.p`
  width: 200px;
  position: relative;
  left: 100px;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 0px;
`;

const Pd_size = styled.p`
  width: 200px;
  position: relative;
  left: 100px;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 3px;
`;

const Pd_price = styled.p`
  width: 200px;
  position: relative;
  left: 100px;
  font-weight: 500;
  font-size: 13px;
  top: 45px;
  letter-spacing: 2px;
  margin-bottom: 3px;
`;

const Pd_quantity_contain = styled.div`
  position: relative;
  display: grid;
  grid-template-areas: 'plus count miners';
  bottom: 10px;
  left: 100px;
  width: 90px;
  height: 20px;
  /* background-color: #ffaeae; */
  /* border: 0.5px solid black; */
`;

const Pd_miners = styled.span`
  font-size: 18px;
  font-weight: 550;
  grid-column: 1/1;
  transform: translateY(-2px);
  grid-row: 1/1;
  justify-self: center;
  align-self: center;
  cursor: pointer;
  &:active {
    color: #b4b4b4;
  }
`;

const Pd_plus = styled.span`
  font-size: 15px;
  justify-self: center;
  align-self: center;
  grid-column: 3/3;
  grid-row: 1/1;
  cursor: pointer;
  &:active {
    color: #b4b4b4;
  }
`;

const Pd_count = styled.span`
  justify-self: center;
  align-self: center;
  grid-column: 2/2;
  grid-row: 1/1;
  font-size: 15px;
  transform: translateY(-1px);
`;

const Line1 = styled.div`
  grid-area: miners;
  border: 0.5px solid black;
`;

const Line2 = styled.div`
  grid-area: plus;
  border: 0.5px solid black;
`;

const Line3 = styled.div`
  grid-area: count;
  border: 0.5px solid black;
`;

const RemoveIcon = styled.span`
  font-size: 25px;
  position: relative;
  left: 260px;
  bottom: 105px;
  cursor: pointer;
  &:hover {
    color: #ff5858;
  }
  &:active {
    color: #b4b4b4;
  }
`;

export default function CartModal({ className }) {
  //천단위 콤마
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

  const dispatch = useDispatch();

  //리덕스
  //상품정보 state
  const cartProducts = useSelector((state) =>
    !state.cart.cartProducts ? [] : state.cart.cartProducts,
  );

  //유저정보 state
  const userID = useSelector((state) =>
    state.user.userID === 0 ? 0 : state.user.userID,
  );

  //카트 상품 수량 빼기
  const minersCartItem = async (identity_id) => {
    try {
      const downData = await axios.post(
        `http://localhost:4000/cart/qtyminus/${userID}/${identity_id}`,
      );
      if (downData.status === 200) {
        if (downData.data && downData.data.userCart) {
          // 'cartObj' 객체가 null이 아니고 'products' 속성이 존재하는 경우에만 실행
          // 이곳에서 'products' 속성을 사용하는 코드 작성
          dispatch(update(downData.data.userCart));
        }
        console.log('성공');
      } else {
        console.log('실패');
      }
    } catch (err) {
      dispatch(update(null));
      console.error(err);
    }
  };

  //카트 상품 수량 추가
  const plusCartItem = async (identity_id) => {
    try {
      const upData = await axios.post(
        `http://localhost:4000/cart/qtyplus/${userID}/${identity_id}`,
      );
      if (upData.status === 200) {
        dispatch(update(upData.data.userCart));
        console.log('성공');
      } else {
        console.log('실패');
      }
    } catch (err) {
      console.error(err);
    }
  };

  //개별 상품 삭제
  const deletePD = async (identity_id) => {
    try {
      const deleteID = await axios.post(
        `http://localhost:4000/cart/remove/${userID}/${identity_id}`,
      );
      if (deleteID.status === 200) {
        dispatch(update(deleteID.data.updatedCart));
        console.log('성공');
      } else {
        console.log('실패');
      }
    } catch (err) {
      console.error(err);
    }
  };

  //카트 함에 담긴 물품들 합산
  const unitSum = (el) => {
    let sum = 0;
    for (let i = 0; i < el.length; i += 1) {
      sum += el[i].unitSumPrice;
    }
    return sum;
  };

  //전체 삭제(카트 비움)
  const allRemove = async () => {
    try {
      const allRemoveCart = await axios.post(
        `http://localhost:4000/cart/clean/${userID}`,
      );
      if (allRemoveCart.status === 200) {
        // dispatch(update(allRemoveCart.data.updatedCart));
        console.log('성공');
        dispatch(update(allRemoveCart.data.userCart));
      } else {
        console.log('실패');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();

  const sumQuantity = (data) => {
    let sum = 0;
    data.map((el) => (sum += el.quantity));
    return sum;
  };

  return (
    <>
      <CartModal_Layout className={className}>
        <CartTitle>ORDER SUMMERY</CartTitle>

        <CloseIcon
          onClick={() => dispatch(offon())}
          className="material-symbols-outlined"
        >
          close
        </CloseIcon>
        <ExtraTextContainer>
          <UnitSum>Total:&nbsp;&nbsp;&nbsp;₩</UnitSum>
          <UnitSumNum>{frontPriceComma(unitSum(cartProducts))}</UnitSumNum>
          <UnitSum>/ {sumQuantity(cartProducts)} ea</UnitSum>
          <AllRemove onClick={allRemove}>All Remove</AllRemove>
          <BTN_black_nomal_comp
            className="cart_Btn"
            fontSize="12px"
            transFontSize="10px"
            padding="7px 30px"
            onClickEvent={() => {
              if (cartProducts.length === 0) {
                null;
              } else {
                navigate(`/store/cartorder`);
                dispatch(offon());
              }
            }}
          >
            Buy
          </BTN_black_nomal_comp>
        </ExtraTextContainer>

        {cartProducts.map((el, index) => (
          <ContentContainer key={index}>
            <Img imgURL={el.img}></Img>
            <Pd_name>{el.productName}</Pd_name>
            <Pd_color>{el.color}</Pd_color>
            <Pd_size>size {el.size}</Pd_size>
            <Pd_price>₩ {frontPriceComma(el.unitSumPrice)}</Pd_price>
            <Pd_quantity_contain>
              <Line1></Line1>
              <Line2></Line2>
              <Line3></Line3>
              <Pd_miners onClick={() => minersCartItem(el._id)}>-</Pd_miners>
              <Pd_count>{el.quantity}</Pd_count>
              <Pd_plus onClick={() => plusCartItem(el._id)}>+</Pd_plus>
            </Pd_quantity_contain>
            <RemoveIcon
              onClick={() => deletePD(el._id)}
              className="material-symbols-outlined"
            >
              remove
            </RemoveIcon>
          </ContentContainer>
        ))}
      </CartModal_Layout>
    </>
  );
}
