import React from 'react';
import '../../styles/mypage_client.scss';
import { useNavigate } from 'react-router-dom';

export default function Mypage_client() {
  const navigate = useNavigate();
  return (
    <>
      <div className="inner">
        <div className="account_wrap">
          {/* ACCOUNT 제목 위치 */}
          <div className="titleArea">
            <h2 className="subtitle">ACCOUNT</h2>
          </div>
          {/* STANDAR 등급 두번째 박스 */}
          <div className="inforamtion">
            <p className="thumbnail"></p>
            <div className="description">
              <span>
                저희 쇼핑몰을 이용해주셔서 감사합니다.
                <br />
                <span className="name">김영호</span> 님은{' '}
                <img src="#" alt="grade"></img> 회원이십니다.
                <br />
                <span className="price"> KRW 10,000 이상</span> 구매시
                <span className="percent">5%</span>을 추가할인 받으실 수
                있습니다. (최대 KRW 9,999,999)
                <br />
                <span className="price"> KRW 10,000 이상</span> 구매시
                <span className="percent">5%</span>을 추가적립 받으실 수
                있습니다. (최대 KRW 9,999,999)
              </span>
            </div>
          </div>
          {/* 나의 주문처리 현황 박스 */}
          <div className="orderstate">
            <div className="title">
              <h3>
                나의 주문처리 현황 <span>(최근 3개월 기준)</span>
              </h3>
            </div>
            <div className="state">
              <ul className="order">
                {/* order 리스트 4개 */}
                <li>
                  <a href="#">
                    <strong>입금전</strong>
                    <span className="count">
                      <span id="count">0</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <strong>입금전</strong>
                    <span className="count">
                      <span id="count">0</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <strong>입금전</strong>
                    <span className="count">
                      <span id="count">0</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <strong>입금전</strong>
                    <span className="count">
                      <span id="count">0</span>
                    </span>
                  </a>
                </li>
              </ul>
              {/* cs 리스트 3개 */}
              <ul className="cs">
                <li>
                  <a href="#">
                    <strong>취소 : </strong>
                    <span className="count">
                      <span id="count">0</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <strong>취소 : </strong>
                    <span className="count">
                      <span id="count">0</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <strong>취소 : </strong>
                    <span className="count">
                      <span id="count">0</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
