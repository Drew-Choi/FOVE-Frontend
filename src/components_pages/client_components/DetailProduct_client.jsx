import React, { useEffect, useState } from 'react';
import '../../styles/detailProduct_client.scss';
import Detail_Product_Layoutclient from './Detail_Product_Layoutclient ';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function DetailProduct_client() {
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

  console.log(id);
  console.log(productData);

  return (
    <section className="pd_detail">
      {productData && (
        <Detail_Product_Layoutclient imgFileName={productData[0].img[0]} />
      )}
    </section>
  );
}
