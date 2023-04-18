import React from 'react';
import '../../styles/mypage_client.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Mypage_client() {
  const navigate = useNavigate();
  const userNameEncoded = useSelector((state) => state.user.userName);

  return (
    <>
      {/* ACCOUNT 제목 위치 */}
      <div className="titleArea">
        <h2 className="subtitle">ACCOUNT</h2>
      </div>
      <div className="account_inner">
        <div className="account_wrap">
          {/* 회원 등급 박스 */}
          <div className="information">
            <p className="thumbnail">
              <img src="/images/standard.jpg"></img>
            </p>
            <div className="description">
              <span>
                저희 쇼핑몰을 이용해주셔서 감사합니다.
                <br />
                <span className="name">{userNameEncoded}</span> 님은
                <span className="namegrade"> STANDARD </span>
                회원이십니다.
                <br />
                <span className="price"> KRW 10,000 이상</span> 구매시
                <span className="percent"> 5% </span>을 추가할인 받으실 수
                있습니다. (최대 KRW 9,999,999)
                <br />
                <span className="price"> KRW 10,000 이상</span> 구매시
                <span className="percent"> 5% </span>을 추가적립 받으실 수
                있습니다. (최대 KRW 9,999,999)
              </span>
            </div>
          </div>
          {/* 나의 주문처리 현황 박스 */}
          <div className="orderstate">
            <div className="orderstate_box">
              <div className="title">
                <div className="title_order">
                  <h3>
                    나의 주문처리 현황 <span>(최근 3개월 기준)</span>
                  </h3>
                </div>
              </div>
              <div className="state">
                <div className="orderbox">
                  <ul className="order">
                    {/* order 리스트 4개 */}
                    <li>
                      <a href="#">
                        <span onClick={() => navigate('#')}>입금전</span>
                        <strong className="count">
                          <strong id="count">0</strong>
                        </strong>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span onClick={() => navigate('#')}>배송준비중</span>
                        <strong className="count">
                          <strong id="count">0</strong>
                        </strong>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span onClick={() => navigate('#')}>배송중</span>
                        <strong className="count">
                          <strong id="count">0</strong>
                        </strong>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span onClick={() => navigate('#')}>배송완료</span>
                        <strong className="count">
                          <strong id="count">0</strong>
                        </strong>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="csbox">
                  <ul className="cs">
                    {/* cs 리스트 3개 */}
                    <li>
                      <a href="#">
                        <span onClick={() => navigate('#')}>취소 : </span>
                        <strong className="count">
                          <strong id="count">0</strong>
                        </strong>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span onClick={() => navigate('#')}>교환 : </span>
                        <strong className="count">
                          <strong id="count">0</strong>
                        </strong>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span onClick={() => navigate('#')}>반품 : </span>
                        <strong className="count">
                          <strong id="count">0</strong>
                        </strong>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* 박스 4개 */}
          <div className="fourbox">
            <div className="line_one">
              <div
                onClick={() => navigate('/mypage/orderlist')}
                className="shopmain_order"
              >
                <p>주문 조회</p>
                <span className="material-symbols-outlined">
                  local_shipping
                </span>
              </div>
              <div
                onClick={() => navigate('/mypage/editInfo')}
                className="shopmain_profile"
              >
                <p>회원 정보 수정</p>
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
            <div className="line_two">
              <div
                onClick={() => navigate('/mypage/checkAddress')}
                className="shopmain_address"
              >
                <p>배송 주소록</p>
                <span className="material-symbols-outlined">home</span>
              </div>
              <div onClick={() => navigate('#')} className="shopmain_mypick">
                <p>MY STYLING PICK</p>
                <span className="material-symbols-outlined">favorite</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
