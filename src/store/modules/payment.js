// 초기 상태 설정
const initState = {
  paymentInfo: {},
  orderInfo: {},
};

// 액션 타입(문자열) 설정. user는 밑에 정의된 리듀서.
const PAYSUCCESS = 'payment/PAYSUCCESS';
const ORDERINFO = 'payment/ORDERINFO';

// 액션 생성 함수. 바깥에서 사용하므로 export.
export function paysuccess(data) {
  // 바깥에서 정보를 받아와야.
  return {
    type: PAYSUCCESS,
    payload: data,
  };
}

export function orderinfo(data) {
  // 바깥에서 정보를 받아와야.
  return {
    type: ORDERINFO,
    payload: data,
  };
}

// 리듀서 일해라. export default ; 이 파일을 import 하면 기본으로 나가는.
export default function cart(state = initState, action) {
  switch (action.type) {
    case PAYSUCCESS:
      return {
        ...state.paymentInfo,
        paymentInfo: action.payload,
      };
    case ORDERINFO:
      return {
        ...state.orderInfo,
        orderInfo: action.payload,
      };
    default:
      return state;
  }
}
