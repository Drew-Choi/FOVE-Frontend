import axios from 'axios';
import { relative } from 'path-browserify';
// import '../../styles/productList_admin.scss';

import { useEffect, useRef, useState } from 'react';
axios;
import { useMemo } from 'react';
import BTN_black_nomal_comp from '../../styles/BTN_black_nomal_comp';
import '../../styles/productRegister_admin.scss';
import styled from 'styled-components';

export default function ProductList_admin() {
  const [data, setData] = useState([]);
  const [disa, setDisa] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const productName = useRef([]);
  const os = useRef([]);
  const s = useRef([]);
  const m = useRef([]);
  const l = useRef([]);
  const price = useRef([]);

  console.log('data.index', data.index);

  // 수정 버튼 누를시
  const productUpdate = async (index) => {
    setDisa((prevState) => {
      const newState = [...prevState];
      for (let i = 0; i < newState.length; i++) {
        newState[i] = true;
      }
      newState[index] = false;
      return newState;
    });
  };

  console.log('hi');

  // 삭제기능
  const productDelete = async (id) => {
    // alert(id);
    try {
      await axios.post(`http://localhost:4000/admin/productlist/delete/${id}`);
      alert('삭제되었습니다');
      setRedirect((cur) => !cur);
    } catch (error) {
      console.log('hi');
    }
  };

  // 수정이후 확인
  const updateSubmit = async (prodCode, index) => {
    try {
      const result = () => {
        console.log('data[index]', data[index]);
        return {
          os:
            os.current[index].value === ''
              ? data[index].size.OS
              : os.current[index].value,
          s:
            s.current[index].value === ''
              ? data[index].size.S
              : s.current[index].value,
          m:
            m.current[index].value === ''
              ? data[index].size.M
              : m.current[index].value,
          l:
            l.current[index].value === ''
              ? data[index].size.L
              : l.current[index].value,
          productName:
            productName.current[index].value === ''
              ? data[index].productName
              : productName.current[index].value,
          price:
            price.current[index].value === ''
              ? data[index].price
              : price.current[index].value,
        };
        // formData.append('image', imageFile); // 이미지 파일
      };

      const Result = await result();
      console.log('hihihiihihihi', Result);
      // handelSubmit(Result);

      // alert(Result);
      console.log('아라라라랄ㄹㄹ', Result);
      console.log(1);

      // 객체로 stock 받음

      // //이미지 외 자료들 formdata에 담음
      const size = {
        OS: Result.os,
        S: Result.s,
        M: Result.m,
        L: Result.l,
      };

      // formData.append(
      //   'data',
      //   //제이슨 형식으로 바꿔줘야함
      //   JSON.stringify({
      //     productName: Result.productName,
      //     price: Result.price,
      //     size: size,
      //     // size: pdSize,
      //     // color: pdColor,
      //     // category: pdCategory,
      //     // detail: pdDetail,
      //   }),
      // );

      // const response = await fetch(
      //   //요청할 페이지 날림 -> 이 서버 라우터에서 몽고디비에 인설트 하는 컨트롤을 가지고 있음
      //   `http://localhost:4000/admin/productlist/modify/${prodCode}`,
      //   {
      //     method: 'POST',
      //     headers: {},
      //     //여기가 데이터 담아 보내는 것
      //     body: formData,
      //   },
      // );

      // setRedirect(true);

      const formData = new FormData();

      formData.append(
        'data',
        //제이슨 형식으로 바꿔줘야함
        JSON.stringify({
          productName: Result.productName,
          size: size,
          price: Result.price,
        }),
      );

      const response = await fetch(
        //요청할 페이지 날림 -> 이 서버 라우터에서 몽고디비에 인설트 하는 컨트롤을 가지고 있음
        `http://localhost:4000/admin/productlist/modify/${prodCode}`,
        {
          method: 'POST',
          headers: {},
          //여기가 데이터 담아 보내는 것
          body: formData,
        },
      );

      // const response = await axios.post(
      //   `http://localhost:4000/admin/productlist/modify/${prodCode}`,
      //   {
      //     // formData.append(
      //     //   'data',
      //     //   //제이슨 형식으로 바꿔줘야함
      //     //   JSON.stringify({
      //     //     productName: Result.productName,
      //     //     price: Result.price,
      //     //     size: size,
      //     //     // size: pdSize,
      //     //     // color: pdColor,
      //     //     // category: pdCategory,
      //     //     // detail: pdDetail,
      //     //   }),
      //     // );
      //     // formData,
      //     // img[0]: firstImage,
      //     // img[1]: firstImage,
      //   },
      // );
      console.log(2);

      setData((prevState) => {
        const newData = [...prevState];
        newData[index] = response.data;
        return newData;
      });
      console.log('prev');
      alert('수정되었습니다');
      setRedirect((cur) => !cur);
      // alert('hh');

      // setDisa((prevState) => {
      //   const newState = [...prevState];
      //   newState[index] = true;
      //   return newState;
      // });

      // alert('수정되었습니다');
    } catch (error) {
      // alert('실패');

      console.error(error);
    }
  };

  // 컴포넌트가 마운트될때 API 요청을 보냄
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'http://localhost:4000/admin/productlist',
        );

        console.log('$$$$$$$$$$$$$$$$$$', response.data);

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
      <div key={item?._id} className="pdlist_wrap">
        <li>
          <div style={{}}>
            {/* <input
              type="file"
              onChange={() => {
                handleFirstImageChange;
              }}
              disabled={disa[index]}
            /> */}
            {/* <img
              style={{ width: '60px' }}
              src={`http://localhost:4000/uploads/${item.img[1]}`}
            ></img>{' '} */}
            {/* <input
              type="file"
              onChange={() => {
                handleSecondImageChange;
              }}
              disabled={disa[index]}
            /> */}
            {/* 상품이미지 등록 */}
            {/* <div>
              {showImage}
              <p>파일업로드</p>&nbsp;&nbsp;&nbsp;&nbsp;
              <form> */}
            {/* <input
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  ref={fileInputRef}
                  onChange={uploadProfile}
                  name="imgMain"
                  multiple
                /> */}
            {/* <BTN_black_nomal_comp
                  className="select_btn"
                  type="button"
                  onClick={handleClickFileInput}
                  fontSize="12px"
                >
                  파일선택
                </BTN_black_nomal_comp> */}
            {/* </form>
            </div> */}
            {/* 상품이미지 등록 */}
            {/* <Container>
              <Layout>{showImage}</Layout>
              <Text>
                {' '}

                <img
                  style={{ width: '60px' }}
                  src={`http://localhost:4000/uploads/${item.img[0]}`}
                ></img>{' '}
                
              </Text>
              <Text>
                {' '}
                <img
                  style={{ width: '60px' }}
                  src={`http://localhost:4000/uploads/${item.img[0]}`}
                ></img>{' '}
              </Text> */}
            {/* <Text>서브2</Text>
              <Text>서브3</Text>
              <Text>서브4</Text> */}
            {/* <input
                style={{ display: 'none' }}
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                ref={fileInputRef}
                onChange={uploadProfile}
                name="img"
                multiple
              />
              <BTN_black_nomal_comp
                className="select_btn"
                onClickEvent={handleClickFileInput}
                fontSize="12px"
              >
                파일선택
              </BTN_black_nomal_comp>
            </Container> */}
          </div>
          <div></div>
          {/* {index + 1} */}
          번호 :{}
          <input
            type="text"
            name={name}
            // placeholder={item.productCode}
            style={{ fontSize: '12px' }}
            disabled={true}
          />
          이름 :{' '}
          <input
            ref={(el) => (productName.current[index] = el)}
            key={item?.id}
            type="text"
            name={name}
            placeholder={item?.productName}
            style={{ fontSize: '12px' }}
            disabled={disa[index]}
          />{' '}
          OS수량 :{' '}
          <input
            ref={(el) => (os.current[index] = el)}
            key={item?.id}
            type="text"
            name={name}
            placeholder={item?.size.OS}
            style={{ fontSize: '12px' }}
            disabled={disa[index]}
          />{' '}
          S수량 :{' '}
          <input
            ref={(el) => (s.current[index] = el)}
            key={item?.id}
            type="text"
            name={name}
            placeholder={item?.size.S}
            style={{ fontSize: '12px' }}
            disabled={disa[index]}
          />{' '}
          M수량 :{' '}
          <input
            ref={(el) => (m.current[index] = el)}
            key={item?.id}
            type="text"
            name={name}
            placeholder={item?.size.M}
            style={{ fontSize: '12px' }}
            disabled={disa[index]}
          />{' '}
          L수량 :{' '}
          <input
            ref={(el) => (l.current[index] = el)}
            key={item?.id}
            type="text"
            name={name}
            placeholder={item?.size.L}
            style={{ fontSize: '12px' }}
            disabled={disa[index]}
          />{' '}
          가격 :
          <input
            ref={(el) => (price.current[index] = el)}
            key={item?.id}
            type="text"
            name={name}
            placeholder={item?.price}
            style={{ fontSize: '12px' }}
            disabled={disa[index]}
          />{' '}
          <button onClick={() => productUpdate(index)}>수정</button>{' '}
          <button
            onClick={() => {
              const result = updateSubmit(item?._id, index);
              alert(item._id);
            }}
          >
            {' '}
            완료
          </button>{' '}
          <button onClick={() => productDelete(item?._id)}>삭제</button>
          {/* <button onClick={() => productUpdate()}> 삭제 </button> */}
          <div></div>
          <div
            style={{ border: '0.1px solid black ', margin: '10px 0px' }}
          ></div>
        </li>
      </div>
      <div> </div>
    </>
  ));

  return (
    <div style={{ position: 'relative', top: '100px' }}>
      <ul>{productList}</ul>
    </div>
  );
}
