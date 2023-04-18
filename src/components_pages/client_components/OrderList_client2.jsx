import React, { useState } from 'react';
import '../../styles/orderlist_client2.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function OrderList_client2() {
  const navigate = useNavigate();
  const userNameEncoded = useSelector((state) => state.user.userName);
  const [isSpanClicked, setIsSpanClicked] = useState(false);
  const handleSpanClick = () => {
    setIsSpanClicked(true);
  };

  return (
    <>
      {/* 주문조회 (ORDER LIST) 제목 위치 */}
      <div className="titleArea">
        <h2 className="subtitle">ORDER LIST</h2>
      </div>

      <div className="account_inner">
        <div className="orderstatus1">
          <span
            className="ordersuc"
            style={{
              fontWeight: isSpanClicked ? 'bold' : 'normal',
              textDecoration: isSpanClicked ? 'underline' : 'none',
            }}
            onClick={() => {
              window.location.href = '/mypage/orderlist';
            }}
          >
            주문내역조회
            <span>(1)</span>
          </span>
          <span
            className="ordercan"
            style={{ borderBottom: '1px solid black' }}
            onClick={() => navigate('/mypage/orderlist2')}
          >
            취소/반품/교환 내역
            <span>(0)</span>
          </span>
        </div>
        <div className="orderlist_wrap">
          {/* 주문 조회 내역 */}
          <div className="orderlist_info">
            <div className="ol_des">
              <span className="ol_date">
                <strong>2023-04-18</strong> (20230413-0000115)
              </span>
              <p className="olthumb">
                <br />
                <img
                  className="olimg"
                  src="../product_images/beanie_pd/be10_blk.jpg"
                ></img>
                <br />
                [옵션: 1]
              </p>
              <div className="pdnameprice">
                <span className="pdname">
                  Star Logo Jacquard Beanie - BLACK
                </span>
                <br />
                <span className="pdprice">
                  KRW <strong>89,000 1</strong>개
                </span>
              </div>
              <strong className="status">입금전취소</strong>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
