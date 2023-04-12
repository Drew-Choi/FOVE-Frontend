// 회원가입을 위한! 자동 로그인도..?
// login, logout 명칭 맞나??

// 초기 상태 설정
const initState = {
  products: [],
  length: 0,
};

// 액션 타입(문자열) 설정. user는 밑에 정의된 리듀서.
const CARTDATAS = 'cartData/CARTDATAS';

// 액션 생성 함수. 바깥에서 사용하므로 export.
export function cartdatas(data) {
  // 바깥에서 정보를 받아와야.
  return {
    type: CARTDATAS,
    payload: cartdatas,
  };
}

// 리듀서 일해라. export default ; 이 파일을 import 하면 기본으로 나가는.
export default function cartdata(state = initState, action) {
  switch (action.type) {
    case CARTDATAS:
      return {
        ...state,
        products: action.payload.product,
        length: action.payload.length,
      };
    default:
      return state;
  }
}
