// 초기 상태 설정
const initState = {
  offon: 'off',
};

// 액션 타입(문자열) 설정.
const OFFON = 'cartmodal/OFFON';

// 액션 생성 함수. 바깥에서 사용하므로 export.
export function offon() {
  // 바깥에서 정보를 받아와야.
  return {
    type: OFFON,
  };
}

// 리듀서 일해라. export default ; 이 파일을 import 하면 기본으로 나가는.
export default function cartmodal(state = initState, action) {
  switch (action.type) {
    case OFFON:
      if (state.offon === 'off') {
        return {
          ...state,
          offon: 'on',
        };
      } else {
        return {
          ...state,
          offon: 'off',
        };
      }
    default:
      return state;
  }
}
