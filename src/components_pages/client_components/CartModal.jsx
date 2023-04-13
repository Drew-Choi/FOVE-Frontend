import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { reset, update } from '../../store/modules/cart';

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
  left: 100px;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 2px;
  margin-bottom: 3px;
`;
const Pd_color = styled.p`
  position: relative;
  left: 100px;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 0px;
`;

const Pd_size = styled.p`
  position: relative;
  left: 100px;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 3px;
`;

const Pd_pice = styled.p`
  position: relative;
  left: 200px;
  font-weight: 500;
  font-size: 13px;
  top: 15px;
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
  grid-column: 3/3;
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
  grid-column: 1/1;
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
    color: red;
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
  const cartProducts = useSelector((state) =>
    !state.cart.cartProducts ? [] : state.cart.cartProducts,
  );

  const deletePD = async (identity_id) => {
    try {
      const deleteID = await axios.post(
        `http://localhost:4000/cart/productId/${identity_id}`,
      );
      if (deleteID.status === 200) {
        console.log(deleteID.data.updatedCart);
        dispatch(update(deleteID.data.updatedCart));
        console.log('성공');
      } else {
        console.log('실패');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <CartModal_Layout className={className}>
        <CartTitle>ORDER SUMMERY</CartTitle>
        <CloseIcon className="material-symbols-outlined">close</CloseIcon>
        {cartProducts.map((el, index) => (
          <ContentContainer key={index}>
            <Img imgURL={el.img}></Img>
            <Pd_name>{el.productName}</Pd_name>
            <Pd_color>{el.color}</Pd_color>
            <Pd_size>size {el.size}</Pd_size>
            <Pd_pice>₩ {frontPriceComma(el.unitSumPrice)}</Pd_pice>
            <Pd_quantity_contain>
              <Line1></Line1>
              <Line2></Line2>
              <Line3></Line3>
              <Pd_plus>+</Pd_plus>
              <Pd_count>{el.quantity}</Pd_count>
              <Pd_miners>-</Pd_miners>
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
