import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModalContainer_client1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(76, 76, 76, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBtn = styled.button``;

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  padding: 0 4rem;
  background-color: white;
  border: 2px solid black;
  justify-content: center;
  color: #121924;
  font-size: 30px;
  margin-bottom: 60px;

  .sizing {
    justify-content: space-between;
    font-size: 14px;
    font-weight: bold;
    color: black;
    padding-top: 30px;
  }

  span {
    margin: auto;
  }

  button {
    background: none;
    text-decoration: underline;
    border: none;
    font-weight: bold;
    margin-left: 300px;
  }

  .ship_des {
    position: relative;
    font-size: 14px;
    box-sizing: border-box;
    display: block;
    width: 400px;
    padding-top: 30px;

    .ship_letter {
      padding-bottom: 30px;
    }
  }
`;

export default function Shipping_client({ handleCloseModal }) {
  return (
    <>
      <ModalContainer_client1>
        <ModalBackdrop>
          <ModalView>
            <div className="sizing">
              <span>SHIPPING</span>
              <button onClick={handleCloseModal}>CLOSE</button>
            </div>
            <div className="ship_des">
              <div className="ship_letter">
                <strong>일반배송 서비스 (CJ 대한통운)</strong>
                <br />
                <br />
                <span>배송비: 무료</span>
                <br />
                <span>배송기간: 2 - 4 영업일</span>
                <br />
                <br />
                <span>
                  * 상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.
                </span>
              </div>
            </div>
          </ModalView>
        </ModalBackdrop>
      </ModalContainer_client1>
    </>
  );
}
