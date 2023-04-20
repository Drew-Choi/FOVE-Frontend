import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* position: relative;
  /* top: 100px; */
  /* margin-bottom: 100px; */
`;

const DIV = styled.div`
  /* position: relative; */
`;

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
      <Container>
        <DIV>
          <div
            style={{
              fontStyle: 'italic',
              fontWeight: 'bolder',
              fontSize: '16px',
            }}
          >
            주문번호 :{item?._id}{' '}
          </div>
          <div
            key={item?._id}
            style={{
              width: '1000px',
              border: '1px solid black',
              margin: '20px',
              padding: '20px',
            }}
          >
            {/* <input placeholder={item?._id} /> */}
            {/* <div
            style={{ border: '0.1px solid black ', margin: '10px 0px' }}
          ></div> */}
            Date : {}
            <input
              placeholder={item?.payments.approvedAt}
              style={{ width: '300px', fontSize: '13px' }}
              disabled={true}
            />
            {/* <div
            style={{ border: '0.1px solid black ', margin: '10px 0px' }}
          ></div> */}
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
            {/* <h3>소비자 정보</h3> */}
            <div style={{ padding: '7px' }}></div>
            Name:{' '}
            <input
              style={{ width: '300px', fontSize: '13px' }}
              // width={'1000px'}
              // ref={(el) => (os.current[index] = el)}
              key={item?.id}
              type="text"
              name={name}
              placeholder={item?.recipient.recipientName}
              // style={{ fontSize: '12px' }}
              disabled={true}
            />{' '}
            {item?.products.map((product, i) => (
              <div key={i}>
                <div style={{ padding: '7px' }}></div>
                <li style={{ margin: '0 20px ' }}>
                  {' '}
                  ProductName :
                  <input
                    placeholder={`${product.productName}`}
                    style={{ width: '220px', fontSize: '13px' }}
                    disabled={true}
                  />
                  <div></div> <div style={{ padding: '7px' }}></div>
                </li>

                <div style={{ padding: '0 27px' }}>
                  {' '}
                  Price:{'  '} {'  '}{' '}
                  <input
                    placeholder={`${product.price}`}
                    style={{ width: '280px', fontSize: '13px' }}
                    disabled={true}
                  />
                </div>
                <div></div>
                {'  '}
              </div>
            ))}
            <div style={{ padding: '7px' }}></div>
            <div style={{ padding: '7px' }}></div>
            Method :
            <input
              // ref={(el) => (os.current[index] = el)}
              key={item?.id}
              type="text"
              name={name}
              placeholder={item?.payments.method}
              style={{ width: '300px', fontSize: '13px' }}
              disabled={true}
            />{' '}
            <div style={{ padding: '7px' }}></div>
            Message :
            <input
              // ref={(el) => (os.current[index] = el)}
              key={item?.id}
              type="text"
              name={name}
              placeholder={item?.message}
              style={{ width: '300px', fontSize: '13px' }}
              disabled={true}
            />{' '}
            <div style={{ padding: '7px' }}></div>
            TotalAmount :
            <input
              // ref={(el) => (os.current[index] = el)}
              key={item?.id}
              type="text"
              name={name}
              placeholder={item?.payments.totalAmount}
              style={{ width: '300px', fontSize: '13px' }}
              disabled={true}
            />{' '}
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
          </div>
        </DIV>
      </Container>
    </>
  ));
  // alert('jio');
  return (
    <div
      style={{
        position: 'relative',
        top: '100px',
        width: '100vw',
        backgroundcolor: 'red',
        paddingBottom: '200px',
      }}
    >
      <ul>{orderList}</ul>
    </div>
  );
}
