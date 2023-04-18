import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function OrderList_admin() {
  const [orderdata, setorderData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'http://localhost:4000/admin/orderlist',
        );
        console.log('ss');
        setorderData(response.data);
        console.log(response);
        // alert(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  console.log(orderdata);

  const orderList = orderdata.map((item) => (
    // console.log();
    // const data = [
    //   'payments',
    //   'user',
    //   'products',
    //   'recipient',
    //   'message',
    //   'isOrdered',
    //   'isShipping',
    //   'isDelivered',
    //   'isReturn',
    //   'paymentMethod',
    //   'sumPrice',
    // ];

    // console.log(item.products[0].productName)
    <>
      <div key={item?._id}>
        <li>
          날짜 : {}
          <input placeholder={item?.payments.approvedAt} disabled={true} />
          {/* 결제수단 :{}
          <input
            type="text"
            name={name}
            placeholder={item?.isDelivered.toString()}
            style={{ fontSize: '12px' }}
            disabled={true}
          /> */}
          {/* 할인금액 :{' '}
          <input
            // ref={(el) => (productName.current[index] = el)}
            key={item?.id}
            type="text"
            name={name}
            // placeholder={item?.payments.discount}
            style={{ fontSize: '12px' }}
            disabled={true}
          />{' '} */}
          <h3>소비자 정보</h3>
          이름 :{' '}
          <input
            // ref={(el) => (os.current[index] = el)}
            key={item?.id}
            type="text"
            name={name}
            placeholder={item?.recipient.recipientName}
            style={{ fontSize: '12px' }}
            disabled={true}
          />{' '}
          <h3>상품정보</h3>: 이름 :{' '}
          {/* {item?.products.map((product, index) => (
            <span key={index}>
              <div>product.productName</div>
            </span>
          ))} */}
          {/* <input
            // ref={(el) => (os.current[index] = el)}
            key={item?.id}
            type="text"
            name={name}
            placeholder={item?.products.productName}
            style={{ fontSize: '12px' }}
            disabled={true}
          />{' '}
          가격 :{' '}
          <input
            // ref={(el) => (os.current[index] = el)}
            key={item?.id}
            type="text"
            name={name}
            placeholder={item?.data[2].price}
            style={{ fontSize: '12px' }}
            disabled={true}
          />{' '}
          이름 :{' '}
          <input
            // ref={(el) => (os.current[index] = el)}
            key={item?.id}
            type="text"
            name={name}
            placeholder={item?.data[2].name}
            style={{ fontSize: '12px' }}
            disabled={true}
          />{' '} */}
        </li>
      </div>
    </>
  ));
  // alert('jio');
  return (
    <div style={{ top: '1000px', backgroundcolor: 'red' }}>
      asda<ul>{orderList}</ul>OrderList_admin
    </div>
  );
}
