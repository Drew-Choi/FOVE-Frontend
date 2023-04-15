import React, { useMemo, useRef, useState } from 'react';
import '../../styles/productRegister_admin.scss';
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
  const pd_productName = useRef();
  const pd_price = useRef();
  const pd_quantity = useRef();
  const pd_color = useRef();
  const pd_category = useRef();
  const pd_detail = useRef();
  //사이즈의 경우 초기화를 위해 사용
  const pd_sizeOS = useRef();
  const pd_sizeS = useRef();
  const pd_sizeM = useRef();
  const pd_sizeL = useRef();
  //이미지업로드 컨트롤용
  const pd_img = useRef();

  //--------이미지 영역 특수해서 따로 분리----------
  //이미지 파일 업로드용 Ref
  const fileInputRef = useRef();
  //이미지 url접근값 저장 state
  const [imageFile, setImageFile] = useState(null);
  //이미지인풋클릭 함수
  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };

  //이미지 접근하여 state를 이미지 값으로 변경
  const uploadProfile = (e) => {
    const fileList = e.target.files;
    const length = fileList.length;
    let copy = [];
    if (fileList) {
      for (let i = 0; i < length; i += 1) {
        const imgInfo = {
          file: fileList[i],
          thumbnail: URL.createObjectURL(fileList[i]),
          type: fileList[i].type.slice(0, 5),
        };
        copy.push(imgInfo);
      }
    }
    setImageFile((cur) => copy);
    pd_img.current = fileList;
    console.log(pd_img.current);
  };

  //이미지 뿌려주기, 유즈 메모로 image파일이 업로드 될때만 반응하도록
  const showImage = useMemo(() => {
    if (!imageFile && imageFile === null) {
      return <></>;
    }
    return imageFile.map((el, index) => (
      <img
        key={index}
        src={el.thumbnail}
        alt={el.type}
        onClick={handleClickFileInput}
      />
    ));
  }, [imageFile]);
  //----- 이미지 끝-------

  //클릭이벤트시 실행될 함수 생성
  //기능: 클릭 발생하면 fetch로 서버에 해당 페이지 요청을 보냄
  //Post요청이므로 ref값에 접근하여 객체(혹은 배열)를 만들고 데이터를 담아서 보낸다.
  //express에서는 이 값을 req.body.data / 혹은 req.files로 받는다.
  const newProductPost = async () => {
    //이미지 외 자료들 남기
    const pdProductName = pd_productName.current.value;
    const pdPrice = resultCommaRemove(pd_price.current.value);
    const pdSize = sizeType;
    const pdQuantity = resultCommaRemove(pd_quantity.current.value);
    const pdColor = pd_color.current.value;
    const pdCategory = pd_category.current.value;
    const pdDetail = pd_detail.current.value;

    //이미지 폼데이터 만들기
    const formData = new FormData();
    //여러 이미지라 formdata에 담아줌
    for (let i = 0; i < pd_img.current.length; i += 1) {
      formData.append('img', pd_img.current[i]);
    }
    //이미지 외 자료들 formdata에 담음
    formData.append(
      'data',
      //제이슨 형식으로 바꿔줘야함
      JSON.stringify({
        productName: pdProductName,
        price: pdPrice,
        size: pdSize,
        color: pdColor,
        category: pdCategory,
        quantity: pdQuantity,
        detail: pdDetail,
      }),
    );

    //async/await를 이용해 fetch 구현
    const newPdPostData = await fetch(
      //요청할 페이지 날림 -> 이 서버 라우터에서 몽고디비에 인설트 하는 컨트롤을 가지고 있음
      'http://localhost:4000/admin/register-product',
      {
        method: 'POST',
        headers: {},
        //여기가 데이터 담아 보내는 것
        body: formData,
      },
    );
    //페이지 요청 성공하면 200번, 아니면 오류표시
    if (newPdPostData.status !== 200) {
      //json형식으로 불러들임
      pd_productName.current.value = '';
      setEnterNumPrice((cur) => '');
      setEnterNumQuantity((cur) => '');
      setSizeType((cur) => 'OS');
      pd_color.current.value = 'black';
      pd_sizeOS.current.checked = true;
      pd_sizeS.current.checked = false;
      pd_sizeM.current.checked = false;
      pd_sizeL.current.checked = false;
      pd_category.current.value = 'beanie';
      pd_detail.current.value = '';
      return alert(await newPdPostData.json());
    } else {
      return alert(await newPdPostData.json());
    }
  };

  return (
    <section className="productRegister_admin">
      <div className="register_container">
        {/* 상품명 인풋 */}
        <Input_Custom
          inputref={pd_productName}
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
          가격&nbsp;&nbsp;&nbsp;
        </Input_Custom>

        {/* 사이즈라디오 */}
        <RadioGroup>
          사이즈&nbsp;&nbsp;&nbsp;&nbsp;
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
        <Select_Custom selectList={kindArr} inputRef={pd_category}>
          종류
        </Select_Custom>

        {/* 상품이미지 등록 */}

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
          수량
        </Input_Custom>

        <div>
          {showImage}
          <p>파일업로드</p>
          <form>
            <input
              style={{ display: 'none' }}
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              ref={fileInputRef}
              onChange={uploadProfile}
              name="imgMain"
              multiple
            />
            <BTN_black_nomal_comp
              type="button"
              onClickEvent={handleClickFileInput}
              fontSize="12px"
            >
              파일선택
            </BTN_black_nomal_comp>
          </form>
        </div>

        {/* 상품상세설명 인풋 */}
        <TextArea_Custom
          inputref={pd_detail}
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
          }}
        >
          등록
        </BTN_black_nomal_comp>
      </div>
    </section>
  );
}
