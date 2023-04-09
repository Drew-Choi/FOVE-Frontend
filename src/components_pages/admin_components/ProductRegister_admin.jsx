import React, { useEffect, useRef, useState } from 'react';
import '../../styles/productRegister_admin.scss';
import axios from 'axios';
import RadioGroup from '../../components_elements/RadioGroup';
import RadioEl from '../../components_elements/RadioEl';
import Input_Custom from '../../components_elements/Input_Custom';
import BTN_black_nomal_comp from '../../styles/BTN_black_nomal_comp';
import Select_Custom from '../../components_elements/Select_Custom';
import TextArea_Custom from '../../components_elements/TextArea_Custom';

export default function ProductRegister_admin() {
  //-------
  //가격 콤마용
  const [enterNumPrice, setEnterNumPrice] = useState('');
  //재고수량 콤마용
  const [enterNumQuantity, setEnterNumQuantity] = useState('');
  // //사이즈를 위한 state
  const [sizeType, setSizeType] = useState('OS');
  //컬러적용을 위한 배열, 클릭 이벤트가 필요없어서 일반 변수로 선언
  const colorArr = ['black', 'white', 'orange', 'gray'];
  //종류적용을 위한 배열, 클릭 이벤트가 필요없어서 일반 변수로 선언
  const kindArr = ['beanie', 'cap', 'training', 'Windbreaker'];

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
  const pd_quantity = useRef();
  const pd_color = useRef();
  const pd_kind = useRef();
  const pd_description = useRef();
  //사이즈의 경우 초기화를 위해 사용
  const pd_sizeOS = useRef();
  const pd_sizeS = useRef();
  const pd_sizeM = useRef();
  const pd_sizeL = useRef();

  //클릭이벤트시 실행될 함수 생성
  //기능: 클릭 발생하면 axios로 서버에 해당 페이지 요청을 보냄
  //Post요청이므로 ref값에 접근하여 객체(혹은 배열)를 만들고 데이터를 담아서 보낸다.
  //express에서는 이 값을 req.body로 받는다.
  const newProductPost = async () => {
    const pdName = pd_name.current.value;
    const pdPrice = resultCommaRemove(pd_price.current.value);
    const pdSize = sizeType;
    const pdQuantity = resultCommaRemove(pd_quantity.current.value);
    const pdColor = pd_color.current.value;
    const pdKinde = pd_kind.current.value;
    const pdDescription = pd_description.current.value;

    //데이터 확인용 콘솔로그
    console.log(pdName);
    console.log(pdPrice);
    console.log(pdSize);
    console.log(pdQuantity);
    console.log(pdColor);
    console.log(pdKinde);
    console.log(pdDescription);

    //빈 인풋이 없는 지 체크
    if (!pdName || !pdPrice || !pdQuantity || !pdSize || !pdColor || !pdKinde)
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
        color: pdColor,
        kind: pdKinde,
        quantity: pdQuantity,
        description: pdDescription,
      },
    );
    //페이지 요청 성공하면 200번, 아니면 오류표시
    if (newPdPostData.status !== 200) {
      return alert(await newPdPostData);
    } else {
      return alert(await newPdPostData);
    }
  };

  return (
    <section className="productRegister_admin">
      <form className="register_container">
        {/* 상품명 인풋 */}
        <Input_Custom
          inputref={pd_name}
          type="text"
          name="name"
          placeholder="상품이름을 입력해주세요"
        >
          상품명
        </Input_Custom>

        {/* 가격인풋 */}
        <Input_Custom
          inputref={pd_price}
          type="text"
          placeholder="가격을 입력해주세요."
          name="price"
          value={enterNumPrice}
          onChangeEvent={() =>
            setEnterNumPrice(changeEnteredNumComma(pd_price.current.value))
          }
        >
          가격 &nbsp;&nbsp;
        </Input_Custom>

        {/* 사이즈라디오 */}
        <RadioGroup>
          사이즈 &nbsp;&nbsp;&nbsp;&nbsp;
          <RadioEl
            inputref={pd_sizeOS}
            name="size"
            value={sizeType}
            onChangeEvent={() => setSizeType((cur) => 'OS')}
            defaultChecked
          >
            OS
          </RadioEl>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <RadioEl
            inputref={pd_sizeS}
            name="size"
            value={sizeType}
            onChangeEvent={() => setSizeType((cur) => 'S')}
          >
            S
          </RadioEl>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <RadioEl
            inputref={pd_sizeM}
            name="size"
            value={sizeType}
            onChangeEvent={() => setSizeType((cur) => 'M')}
          >
            M
          </RadioEl>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <RadioEl
            inputref={pd_sizeL}
            name="size"
            value={sizeType}
            onChangeEvent={() => setSizeType((cur) => 'L')}
          >
            L
          </RadioEl>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </RadioGroup>

        {/* 색상인풋(셀렉터) */}
        <Select_Custom selectList={colorArr} inputRef={pd_color}>
          색상
        </Select_Custom>

        {/* 색상인풋(셀렉터) */}
        <Select_Custom selectList={kindArr} inputRef={pd_kind}>
          종류
        </Select_Custom>

        {/* 상품이미지 등록 */}
        <Input_Custom type="file" name="pd_img">
          상품 메인 이미지
        </Input_Custom>
        <Input_Custom type="file" name="pd_img">
          상품 서브 이미지1
        </Input_Custom>
        <Input_Custom type="file" name="pd_img">
          상품 서브 이미지2
        </Input_Custom>
        <Input_Custom type="file" name="pd_img">
          상품 서브 이미지3
        </Input_Custom>
        <Input_Custom type="file" name="pd_img">
          상품 서브 이미지4
        </Input_Custom>
        <Input_Custom type="file" name="pd_img">
          상품 서브 이미지5
        </Input_Custom>

        {/* 수량 인풋 */}
        <Input_Custom
          inputref={pd_quantity}
          type="text"
          placeholder="재고수량을 입력해주세요."
          name="quantity"
          value={enterNumQuantity}
          onChangeEvent={() =>
            setEnterNumQuantity(
              changeEnteredNumComma(pd_quantity.current.value),
            )
          }
        >
          수량&nbsp;&nbsp;&nbsp;
        </Input_Custom>

        {/* 상품상세설명 인풋 */}
        <TextArea_Custom
          inputref={pd_description}
          type="text"
          name="pd_description"
          placeholder="필요시에만 사용"
          maxLength={100}
          cols={30}
          rows={10}
        >
          상품상세설명
        </TextArea_Custom>

        {/* 클릭시 axios각 작동할 수 있게 위에 만든 함수를 넣어준다. */}
        <BTN_black_nomal_comp
          fontSize="15px"
          transFontSize="13px"
          onClickEvent={() => {
            newProductPost();
            pd_name.current.value = '';
            setEnterNumPrice((cur) => '');
            setEnterNumQuantity((cur) => '');
            setSizeType((cur) => 'OS');
            pd_color.current.value = 'black';
            pd_sizeOS.current.checked = true;
            pd_sizeS.current.checked = false;
            pd_sizeM.current.checked = false;
            pd_sizeL.current.checked = false;
            pd_kind.current.value = 'beanie';
            pd_description.current.value = '';
          }}
        >
          등록
        </BTN_black_nomal_comp>
      </form>
    </section>
  );
}
