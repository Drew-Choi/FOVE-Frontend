import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
axios;
export default function ProductList_admin() {
  const [data, setData] = useState([]);
  const [disa, setDisa] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const productName = useRef([]);
  const stock = useRef([]);
  const price = useRef([]);

  const productUpdate = async (index) => {
    setDisa((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  const updateSubmit = async (prodCode, index) => {
    try {
      console.log(1);

      // const result = () => {
      //   productName.current[index].value == ''
      //     ? data[index].productName
      //     : productName.current[index].value;
      // };
      // result();

      const result = () => {
        return {
          stock:
            productName.current[index].value === ''
              ? data[index].stock
              : stock.current[index].value,
          productName:
            productName.current[index].value === ''
              ? data[index].productName
              : productName.current[index].value,
          price:
            productName.current[index].value === ''
              ? data[index].price
              : price.current[index].value,
        };
      };
      // setRedirect(false);

      const Result = await result();
      // alert(Result);
      console.log(Result);

      // setRedirect(true);

      const response = await axios.post(
        `http://localhost:4000/admin/productlist/modify/${prodCode}`,
        {
          stock: Number(Result.stock),
          productName: Result.productName,
          price: Number(Result.price),
        },
      );
      console.log(2);
      // setRedirect(true);
      setData((prevState) => {
        const newData = [...prevState];
        newData[index] = response.data;
        return newData;
      });
      console.log('prev');
      alert('수정되었습니다');
      setRedirect(true);
      alert('hh');

      setDisa((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });

      // alert('수정되었습니다');
    } catch (error) {
      // alert('실패');

      console.error(error);
    }
  };
  // const productUpdate = () => {
  //   alert('hi');
  //   setDisa(false);
  // };
  // function productUpdate() {
  //   alert('hi');
  // }

  // 컴포넌트가 마운트될때 API 요청을 보냄
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'http://localhost:4000/admin/productlist',
        );
        setData(response.data);
        setDisa(new Array(response.data.length).fill(true));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [redirect]);

  const productList = data.map((item, index) => (
    <>
      <div key={item._id}>
        <li>
          {/* {index + 1} */}
          번호 :{' '}
          <input
            type="text"
            name={name}
            placeholder={item.prodCode}
            style={{ fontSize: '12px' }}
            disabled={true}
          />
          이름 :{' '}
          <input
            ref={(el) => (productName.current[index] = el)}
            key={item.id}
            type="text"
            name={name}
            placeholder={item.productName}
            style={{ fontSize: '12px' }}
            disabled={disa[index]}
          />{' '}
          S수량 :{' '}
          <input
            ref={(el) => (stock.current[index] = el)}
            key={item.id}
            type="text"
            name={name}
            placeholder={item.stock}
            style={{ fontSize: '12px' }}
            disabled={disa[index]}
          />{' '}
          M수량 :{' '}
          <input
            key={item.id}
            type="text"
            name={name}
            placeholder={item.stock}
            style={{ fontSize: '12px' }}
            disabled={disa[index]}
          />{' '}
          L수량 :{' '}
          <input
            key={item.id}
            type="text"
            name={name}
            placeholder={item.stock}
            style={{ fontSize: '12px' }}
            disabled={disa[index]}
          />{' '}
          가격 :
          <input
            ref={(el) => (price.current[index] = el)}
            key={item.id}
            type="text"
            name={name}
            placeholder={item.price}
            style={{ fontSize: '12px' }}
            disabled={disa[index]}
          />{' '}
          <button onClick={() => productUpdate(index)}> 수정</button>{' '}
          <button onClick={() => updateSubmit(item.prodCode, index)}>
            {' '}
            완료
          </button>{' '}
          <button onClick={() => productUpdate()}> 삭제 </button>
        </li>
      </div>
      <div> </div>
    </>
    // <li key={item.id}>
    //   상품이름 :{item.productName}
    //   <button>수정</button>
    // </li>
  ));

  return <ol>{productList}</ol>;
}
