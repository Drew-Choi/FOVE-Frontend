import { useState } from 'react';
import styled from 'styled-components';

export const ModalContainer_client = styled.div`
  // TODO : Modal을 구현하는데 전체적으로 필요한 CSS를 구현합니다.
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ModalBackdrop = styled.div`
  // TODO : Modal이 떴을 때의 배경을 깔아주는 CSS를 구현합니다.
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBtn = styled.button`
  background-color: #45579c;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog',
}))`
  width: 300px;
  height: 150px;
  padding: 10px;

  position: absolute;

  background-color: #d2d7ed;
  border: none;
  border-radius: 30px;

  text-align: center;
  color: #121924;
  font-size: 30px;

  cursor: grab;
  > button {
    background: none;
    color: white;
    font-size: 1rem;
    border: none;
  }
  > p {
    color: white;
  }
`;

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ModalContainer_client>
        <ModalBtn onClick={openModalHandler}>
          {/* TODO : 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때는 ModalBtn의 내부 텍스트가 'Opened!' 로 Modal이 닫힌 상태(isOpen이 false인 상태)일 때는 ModalBtn 의 내부 텍스트가 'Open Modal'이 되도록 구현해야 합니다. */}
          {isOpen ? 'Opened!' : 'Open Modal'}
        </ModalBtn>
        {/* TODO : 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현해야 합니다. */}
        {isOpen && (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <button onClick={openModalHandler}>X</button>
              <p>Hello Codestates!</p>
            </ModalView>
          </ModalBackdrop>
        )}
      </ModalContainer_client>
    </>
  );
};
