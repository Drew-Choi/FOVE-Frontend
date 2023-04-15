import { useState } from 'react';
import styled from 'styled-components';

const ModalContainer_client1 = styled.div`
  // TODO : Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ModalBackdrop = styled.div`
  // TODO : Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
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
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있음
  role: 'dialog',
}))`
  display: flex;
  gap: 330px;
  width: 40rem;
  /* height: auto; */
  /* height: 30rem; */
  padding: 1.5rem 2rem 20rem;
  background-color: white;
  border: 1px solid black;
  justify-content: center;
  color: #121924;
  font-size: 30px;

  .sizing {
    display: flex;
    gap: 330px;
    font-size: 14px;
    font-weight: bold;
    color: black;
  }

  button {
    background: none;
    text-decoration: underline;
    border: none;
    font-weight: bold;
  }
`;

export default function ModalContainer_client() {
  const [isOpen, setIsOpen] = useState(true);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ModalContainer_client1>
        <ModalBtn onClick={openModalHandler}>
          {/* TODO : 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때는 ModalBtn의 내부 텍스트가 'Opened!' 로 Modal이 닫힌 상태(isOpen이 false인 상태)일 때는 ModalBtn 의 내부 텍스트가 'Open Modal'이 되도록 구현 */}
          {isOpen ? 'Opened!' : 'Open Modal'}
        </ModalBtn>
        {/* TODO : 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현 */}
        {isOpen && (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <div className="sizing">
                <span>PRODUCT MEASUREMENTS</span>
                <button onClick={openModalHandler}>CLOSE</button>
              </div>
            </ModalView>
          </ModalBackdrop>
        )}
      </ModalContainer_client1>
    </>
  );
}
