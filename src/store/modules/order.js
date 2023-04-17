// 초기 상태 설정
const initState = {
  productName: '',
  price: 0,
  quantity: 0,
  size: '',
  totalPrice: 0,
  img: '',
  color: '',
};
// 액션 타입(문자열) 설정.
const SINGLE = 'order/SINGLE';
const SINGLERESET = 'order/SINGLERESET';

// 액션 생성 함수. 바깥에서 사용하므로 export.
export function single(datas) {
  // 바깥에서 정보를 받아와야.
  return {
    type: SINGLE,
    payload: datas,
  };
}

export function singleReset() {
  // 바깥에서 정보를 받아와야.
  return {
    type: SINGLERESET,
  };
}

// 리듀서 일해라. export default ; 이 파일을 import 하면 기본으로 나가는.
export default function order(state = initState, action) {
  switch (action.type) {
    case SINGLE:
      return {
        ...state,
        productName: action.payload.productName,
        price: action.payload.price,
        quantity: action.payload.quantity,
        size: action.payload.size,
        totalPrice: action.payload.totalPrice,
        img: action.payload.img,
      };
    default:
      return state;
  }
}
