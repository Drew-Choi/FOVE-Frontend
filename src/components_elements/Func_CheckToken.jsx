// 로그인을 위한, 로컬 스토리지에 있는 토큰을 검증하는 함수
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/modules/user';

export default function Func_CheckToken() {
  console.log('함수 입장!!');
  const dispatch = useDispatch();

  // 브라우저 로컬 스토리지에 저장 되어 있는 토큰이 있는지를 확인 후,
  // 해당 토큰을 백엔드에 검증. 검증이 되면 바로 로그인 처리 / 안 되면 로그인 페이지로 이동
  const tokenLoginCheck = async () => {
    try {
      // 검증을 위해, 로컬 스토리지의 토큰 axios로 보내기
      const resToken = await axios.post('http://localhost:4000/login/token', {
        token: window.localStorage.getItem('token'),
      });

      // 토큰 검증 결과를 받아서 처리, 필요 데이터는 data 에 담아서 전송되므로 필요한 정보 세팅
      console.log(`토큰 검증 결과: ${resToken.data.message}`); // ////////////////////////
      alert(resToken.data.message); // 임의로 test

      // 토큰 검증이 성공 적으로 검증이 되었으므로 리덕스에 로그인 처리
      // 해당 함수로 인하여 토큰이 있는 동안은, 로그인을 하지 않아도 바로 로그인이 처리
      dispatch(
        login({
          id: resToken.data.userID,
        }),
      );
    } catch (err) {
      console.log('토큰 검증 실패, 알 수 없는 문제 발생', err);
      return;
    }
  };

  // tokenLoginCheck();
}
