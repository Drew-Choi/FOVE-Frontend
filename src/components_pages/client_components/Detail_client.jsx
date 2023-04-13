import React, { useEffect, useState } from 'react';
import '../../styles/detail_client.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Detail_OrderMenu_client from './Detail_OrderMenu_client';
import Detail_SubImgae_client from './Detail_SubImgae_client';
import SubNav_client from './SubNav_client';

export default function Detail_client() {
  const { id } = useParams();
  const [productData, setProductData] = useState();

  useEffect(() => {
    getSelectProduct();
  }, []);

  const getSelectProduct = async () => {
    const selectData = await axios.get(
      `http://localhost:4000/store/productId/${id}`,
    );
    if (selectData.status === 200) {
      await setProductData(selectData.data);
      return selectData.data;
    } else {
      return selectData.data;
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <SubNav_client
        onClickEvent1={() => navigate('/store')}
        onClickEvent3={() => navigate('/store/beanie')}
        onClickEvent4={() => navigate('/store/cap')}
        onClickEvent5={() => navigate('/store/training')}
        onClickEvent6={() => navigate('/store/windbreaker')}
        menu1="VIEW ALL"
        menu2="NEW ARRIVALS"
        menu3="BEANIE"
        menu4="CAP"
        menu5="TRAINING"
        menu6="WINDBREAKER"
        top="70px"
      />
      <section className="pd_detail">
        {/* 비동기 특성으로 map이 아니면 데이터 불러오는데 시간이 걸린다.
      그래서 아래와 같이 데이터가 들어오면 컴포넌트를 띄울 수 있게 순서적으로 처리해줘야함 */}
        {productData && (
          <>
            <Detail_OrderMenu_client
              productName={productData[0].productName}
              detail={productData[0].detail}
              price={productData[0].price}
              datas={productData[0]}
            />
            <Detail_SubImgae_client datas={productData} />
          </>
        )}
      </section>
    </>
  );
}
