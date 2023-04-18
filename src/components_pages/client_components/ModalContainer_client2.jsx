import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  z-index: 100;
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
  position: absolute;
  z-index: 5;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  padding: 0 3rem;
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
    margin-right: 200px;
  }

  button {
    background: none;
    text-decoration: underline;
    border: none;
    font-weight: bold;
    margin-left: 70px;
  }

  .middle_line {
    position: fixed;
    width: 500px;
    height: 53px;
    border-bottom: 1.5px solid darkgray;
    z-index: 1;
  }

  .size_img_wrap {
    position: relative;
    z-index: 5;
    img {
      width: 500px;
    }
  }

  .size_os_wrap {
    display: grid;
    grid-template-columns: 200px 200px;
    justify-content: flex-end;
    border-top: 1.5px solid darkgray;
    border-bottom: 1.5px solid darkgray;
    margin-bottom: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    gap: 20px;

    .size_os1 {
      position: relative;

      /* Depth */
      .box2_os {
        position: absolute;
        top: 46px;
        text-align: center;
        font-weight: 300;
      }
    }

    .size_os2 {
      display: grid;
      gap: 20px;
      box-sizing: border-box;
      margin-left: 150px;

      /* OS */
      .box3_os {
        position: relative;
        bottom: 4px;
        font-weight: 300;
      }

      /* 16 */
      .box4_os {
        position: relative;
        top: 5px;
        font-weight: 300;
      }
    }
  }

  .cen_inc {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 22px;
    gap: 10px;
    font-weight: bold;

    .centi {
      font-weight: bold;
      transition: color 0.3s ease-in-out;
      color: gray;
      cursor: pointer;

      &:hover {
        color: black;
        font-weight: bold;
      }
    }

    .inch {
      font-weight: bold;
      transition: color 0.3s ease-in-out;
      color: black;
    }
  }
`;

export default function ModalContainer_client2({ handleCloseModa2 }) {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

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
                <button onClick={handleCloseModa2}>CLOSE</button>
                <div className="size-detail">
                  <div className="size_img_wrap">
                    <img src="/images/bnsize.jpg" alt="beanie size artwork" />
                  </div>
                  <div className="middle_line"></div>
                  <div className="size_os_wrap">
                    <div className="size_os1">
                      <div className="size_box1">
                        <span></span>
                      </div>
                      <div className="size_box2">
                        <span className="box2_os">Depth</span>
                      </div>
                    </div>
                    <div className="size_os2">
                      <div className="size_box3">
                        <span className="box3_os">OS</span>
                      </div>
                      <div className="size_box4">
                        <span className="box4_os">16</span>
                      </div>
                    </div>
                  </div>
                  <div className="cen_inc">
                    {/*<a
                      className="centi"
                      onClick={() => navigate('/sizemodal_cm')}
                    >
                      CENTIMETERS
                    </a> */}
                    <a className="inch" href="#">
                      CENTIMETERS
                    </a>
                  </div>
                </div>
              </div>
            </ModalView>
          </ModalBackdrop>
        )}
      </ModalContainer_client1>
    </>
  );
}
