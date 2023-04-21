import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Admin_main from './components_pages/admin_components/Admin_main';
import ProductRegister_admin from './components_pages/admin_components/ProductRegister_admin';
import Home_admin from './components_pages/admin_components/Home_admin';
import Agreement_client from './components_pages/client_components/Agreement_client';
import Privacy_client from './components_pages/client_components/Privacy_client';
import Client_main from './components_pages/client_components/Client_main';
import AboutUs_client from './components_pages/client_components/AboutUs_client';
import Store_client from './components_pages/client_components/Store_client';
import Guide_client from './components_pages/client_components/Guide_client';
import Detail_client from './components_pages/client_components/Detail_client';
import Intro_movie_client from './components_pages/client_components/Intro_movie_clinet';
import Register_client from './components_pages/client_components/Register_client';
import Mypage_client from './components_pages/client_components/Mypage_client';
import AdSubmit_client from './components_pages/client_components/AdSubmit_client';
import Adwrite_client from './components_pages/client_components/Adwrite_client';
import Login_client from './components_pages/client_components/Login_client';
import Order_client from './components_pages/client_components/Order_client';
import Store_Categorys from './components_pages/client_components/Store_Categorys';
import Error404 from './components_pages/client_components/Error404';
import TossPay_Complete from './components_pages/client_components/TossPay_Complete';
import TossApprove from './components_pages/client_components/TossApprove';
import { Toss_CheckOut } from './components_pages/client_components/Toss_CheckOut';
import { useEffect } from 'react';
import axios from 'axios';
import { keepLogin } from './store/modules/user';
import RegisterSuccess_client from './components_pages/client_components/RegisterSuccess_client';
import EditInfo_client from './components_pages/client_components/EditInfo_client';
import ProductList_admin from './components_pages/admin_components/ProductList_admin';
import OrderList_client from './components_pages/client_components/OrderList_client';
import Store_NewItems from './components_pages/client_components/Store_NewItems';
import OrderList_admin from './components_pages/admin_components/OrderList_admin';

// 팔만대장경 컴포넌트 여기까지 하겠습니다.

function App() {
  const isLogin = useSelector((state) => state.user.isLogin);
  // const isAdmin = useSelector((state) => state.user.isAdmin);
  // const reduxName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();

  // App 시작 시, 브라우저 로컬 스토리지에 저장 되어 있는 토큰이 있는지를 확인 후,
  // 해당 토큰을 백엔드에 검증. 검증이 되면 바로 로그인 처리 / 안 되면 로그인 페이지로 이동
  const tokenLoginCheck = async () => {
    try {
      // 검증을 위해, 로컬 스토리지의 토큰 axios로 보내기
      const resToken = await axios.post('http://localhost:4000/login/token', {
        token: window.localStorage.getItem('token'),
      });

      // 토큰 검증 결과를 받아서 처리, 필요 데이터는 data 에 담아서 전송되므로 필요한 정보 세팅
      console.log(resToken.data.message);

      // 토큰 검증이 성공 적으로 검증이 되었으므로 리덕스에 로그인 처리
      // 해당 함수로 인하여 토큰이 있는 동안은, 로그인을 하지 않아도 바로 로그인이 처리
      dispatch(
        keepLogin({
          id: resToken.data.id,
          nameEncoded: resToken.data.nameEncoded,
          points: resToken.data.points,
          isAdmin: resToken.data.isAdmin,
        }),
      );
    } catch (err) {
      console.log('토큰 검증 실패, 알 수 없는 문제 발생', err);
      return;
    }
  };
  // 리액트 앱이 시작 되면 바로 토큰 검증 로직 실행 -> 토큰 로그인 수행
  useEffect(() => {
    tokenLoginCheck();
  }, [isLogin]); // isLogin 값 바뀔 때마다

  const isAdmin = useSelector((state) => state.user.isAdmin);

  return (
    <div>
      <Routes>
        {/* Client 영역 */}
        <Route path="/" element={<Client_main />}>
          {/* 인트로 무비 */}
          <Route path="" element={<Intro_movie_client />} />
          {/* 브랜드소개 */}
          <Route path="/aboutus" element={<AboutUs_client />} />
          {/* 상품진열 */}
          <Route path="/store" element={<Store_client />} />
          {/* 카테고리별 아이템 분리 */}
          <Route path="/store/:category" element={<Store_Categorys />} />
          {/* 신상품 */}
          <Route path="/store/new" element={<Store_NewItems />} />
          {/* 상품상세페이지 */}
          <Route path="/store/detail/:id" element={<Detail_client />} />
          {/* 주문서작성 영역 */}
          {/* 1. 싱글상품 */}
          <Route path="/store/order" element={<Order_client />} />
          {/* 2. 카트에 담긴 여러 개 상품 */}
          <Route path="/store/cartorder" element={<Order_client />} />
          <Route path="/store/order/checkout" element={<Toss_CheckOut />} />
          {/* 토스페이먼츠 완성 */}
          <Route
            path="/store/order/checkout/approval_order"
            element={<TossApprove />}
          />
          {/* 토스페이먼츠 결제성공페이지 */}
          <Route path="store/order_success" element={<TossPay_Complete />} />
          {/* account쪽 */}
          <Route path="/agreement" element={<Agreement_client />} />
          <Route path="/privacy" element={<Privacy_client />} />
          <Route path="/guide" element={<Guide_client />} />

          {/* <Route path="/tosspayment/fail" element={<FailPage />} /> */}

          {/* 회원 가입 */}
          <Route path="/register" element={<Register_client />} />
          <Route
            path="/register/success"
            element={<RegisterSuccess_client />}
          />
          {/* 로그인 */}
          <Route path="/login" element={<Login_client />} />

          {/* 로그인 상태여야 이동 가능한 페이지들 */}
          {/* 마이페이지 메인 */}
          <Route
            path="/mypage"
            element={isLogin ? <Mypage_client /> : <Login_client />}
          />
          {/* 회원정보 수정 */}
          <Route
            path="/mypage/editInfo"
            element={isLogin ? <EditInfo_client /> : <Login_client />}
          />

          {/* 주문조회 */}
          <Route
            path="/mypage/orderlist"
            element={isLogin ? <OrderList_client /> : <OrderList_client />}
          />

          {/* 배송 주소록 목록 */}
          <Route
            path="/mypage/checkAddress"
            element={isLogin ? <AdSubmit_client /> : <Login_client />}
          />

          {/* 배송 주소지 수정 */}
          <Route
            path="/mypage/editAddress"
            element={isLogin ? <Adwrite_client /> : <Login_client />}
          />
        </Route>

        {/* admin 영역 */}

        <Route
          path="/admin"
          element={!isAdmin ? <Error404 /> : isAdmin && <Admin_main />}
        >
          {/* <Route path="" element={<Home_admin />} /> */}
          <Route
            path=""
            element={
              !isAdmin ? <Error404 /> : isAdmin && <ProductRegister_admin />
            }
          />
          <Route
            path="list"
            element={!isAdmin ? <Error404 /> : isAdmin && <ProductList_admin />}
          />

          <Route
            path="orderlist"
            element={!isAdmin ? <Error404 /> : isAdmin && <OrderList_admin />}
          />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
