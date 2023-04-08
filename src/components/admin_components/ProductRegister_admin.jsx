import React, { useRef, useState } from 'react';
import '../../styles/productRegister_admin.scss';
import axios from 'axios';
import RadioGroup from './etc_elements/RadioGroup';
import RadioEl from './etc_elements/RadioEl';

export default function ProductRegister_admin() {
  //-------
  //가격 콤마용
  const [enterNumPrice, setEnterNumPrice] = useState('');
  //재고수량 콤마용
  const [enterNumQuantity, setEnterNumQuantity] = useState('');
  //천단위 콤마생성
  const changeEnteredNumComma = (el) => {
    const comma = (el) => {
      el = String(el);
      return el.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    };
    const uncomma = (el) => {
      el = String(el);
      return el.replace(/[^\d]+/g, '');
    };
    return comma(uncomma(el));
  };

  //콤마제거하고 연산 가능한 숫자로 바꾸기
  const resultCommaRemove = (el) => {
    return Number(el.split(',').reduce((curr, acc) => curr + acc, ''));
  };
  //-------

  //input 값을 받을 useRef생성
  const pd_name = useRef();
  const pd_price = useRef();
  const pd_size = useRef();
  const pd_quantity = useRef();

  //사이즈를 위한 state
  const [sizeType, setSizeType] = useState('');

  //클릭이벤트시 실행될 함수 생성
  //기능: 클릭 발생하면 axios로 서버에 해당 페이지 요청을 보냄
  //Post요청이므로 ref값에 접근하여 객체(혹은 배열)를 만들고 데이터를 담아서 보낸다.
  //express에서는 이 값을 req.body로 받는다.
  const newProductPost = async () => {
    const pdName = pd_name.current.value;
    const pdPrice = resultCommaRemove(pd_price.current.value);
    const pdSize = pd_size.current.value;
    const pdQuantity = resultCommaRemove(pd_quantity.current.value);

    //데이터 확인용 콘솔로그
    console.log(pdName);
    console.log(pdPrice);
    console.log(pdSize);
    console.log(pdQuantity);

    //빈 인풋이 없는 지 체크
    if (!pdName || !pdPrice || !pdQuantity || !pdSize)
      return alert('모든 필수 정보를 입력해 주세요.');
    //async/await를 이용해 axios 구현
    const newPdPostData = await axios.post(
      //요청할 페이지 날림 -> 이 서버 라우터에서 몽고디비에 인설트 하는 컨트롤을 가지고 있음
      'http://localhost:4000/pd_register/add_pd',
      //요청 페이지 다음에는 데이터를 담는다.(ref값 활용)
      {
        name: pdName,
        price: pdPrice,
        size: pdSize,
        quantity: pdQuantity,
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
    newPdPostData();
  };

  return (
    <section className="productRegister_admin">
      <form className="register_container">
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
            type="text"
            placeholder="가격을 입력해주세요."
            name="price"
            value={enterNumPrice}
            onChange={() =>
              setEnterNumPrice(changeEnteredNumComma(pd_price.current.value))
            }
          />
        </div>
        <RadioGroup style={{}}>
          사이즈 &nbsp;&nbsp;&nbsp;&nbsp;
          <RadioEl
            inputref={pd_size}
            name="size"
            value={sizeType}
            onClick={() => setSizeType((cur) => 'S')}
            defaultChecked
          >
            S
          </RadioEl>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <RadioEl
            inputref={pd_size}
            name="size"
            value={sizeType}
            onClick={() => setSizeType((cur) => 'M')}
          >
            M
          </RadioEl>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <RadioEl
            inputref={pd_size}
            name="size"
            value={sizeType}
            onClick={() => setSizeType((cur) => 'L')}
          >
            L
          </RadioEl>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </RadioGroup>
        <div>
          <p>수량&nbsp;&nbsp;&nbsp;</p>
          <input
            // input 값을 ref로 보내기
            ref={pd_quantity}
            type="text"
            placeholder="재고수량을 입력해주세요."
            name="quantity"
            value={enterNumQuantity}
            onChange={() =>
              setEnterNumQuantity(
                changeEnteredNumComma(pd_quantity.current.value),
              )
            }
          />
        </div>
        <div>
          <p>상품 메인 이미지</p>
          <input type="file" name="img" />
        </div>
        <div>
          <p>상품 서브 이미지1</p>
          <input type="file" name="img" />
        </div>
        <div>
          <p>상품 서브 이미지2</p>
          <input type="file" name="img" />
        </div>
        <div>
          <p>상품 서브 이미지3</p>
          <input type="file" name="img" />
        </div>
        <div>
          <p>상품 서브 이미지4</p>
          <input type="file" name="img" />
        </div>
        <div>
          <p>상품 서브 이미지5</p>
          <input type="file" name="img" />
        </div>
        {/* 클릭시 axios각 작동할 수 있게 위에 만든 함수를 넣어준다. */}
        <button onClick={newProductPost}>등록</button>
      </form>
    </section>
  );
}
