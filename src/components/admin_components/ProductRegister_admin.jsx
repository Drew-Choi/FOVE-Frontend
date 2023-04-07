import React, { useRef } from 'react';
import '../styles/productRegister_admin.scss';
import axios from 'axios';

export default function ProductRegister_admin() {
  //input 값을 받을 useRef생성
  const pd_name = useRef();
  const pd_price = useRef();
  const pd_quantity = useRef();

  //클릭이벤트시 실행될 함수 생성
  //기능: 클릭 발생하면 axios로 서버에 해당 페이지 요청을 보냄
  //Post요청이므로 ref값에 접근하여 객체(혹은 배열)를 만들고 데이터를 담아서 보낸다.
  //express에서는 이 값을 req.body로 받는다.
  const newProductPost = async () => {
    //ref로 값이 잘 넘어왔는지 확인하기 위한 콘솔로그
    console.log(pd_name.current.value);
    console.log(pd_price.current.value);
    console.log(pd_quantity.current.value);

    //async/await를 이용해 axios 구현
    const newPdPostData = await axios.post(
      //요청할 페이지 날림 -> 이 서버 라우터에서 몽고디비에 인설트 하는 컨트롤을 가지고 있음
      'http://localhost:4000/pd_register/add_pd',
      //요청 페이지 다음에는 데이터를 담는다.(ref값 활용)
      {
        name: pd_name.current.value,
        price: pd_price.current.value,
        quantity: pd_quantity.current.value,
      },
    );
    //페이지 요청 성공하면 200번, 아니면 오류표시
    if (newPdPostData.status === 200) {
      //서버에서 res로 날라오는 내용을 로그로 띄움
      console.log(await newPdPostData);
    } else {
      //서버에서 res로 날라오는 내용을 로그로 띄움
      console.log(await newPdPostData);
    }
  };

  return (
    <section className="productRegister_admin">
      <div className="register_container">
        <div>
          <p>상품명</p>
          <input
            // input 값을 ref로 보내기
            ref={pd_name}
            type="text"
            name="name"
            placeholder="상품이름을 입력해주세요"
          />
        </div>
        <div>
          <p>가격&nbsp;&nbsp;&nbsp;</p>
          <input
            // input 값을 ref로 보내기
            ref={pd_price}
            type="number"
            name="price"
            placeholder="가격을 입력해주세요"
          />
        </div>
        <div>
          <p>수량&nbsp;&nbsp;&nbsp;</p>
          <input
            // input 값을 ref로 보내기
            ref={pd_quantity}
            type="number"
            name="quantity"
            placeholder="재고수량을 입력해주세요"
          />
        </div>
        {/* 클릭시 axios각 작동할 수 있게 위에 만든 함수를 넣어준다. */}
        <button onClick={newProductPost}>등록</button>
      </div>
    </section>
  );
}
