import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import ModalContainer_client from './components_pages/client_components/ModalContainer_client';
import ModalContainer_client2 from './components_pages/client_components/ModalContainer_client2';
import Shipping_client from './components_pages/client_components/Shipping_client';
import TossPay_CompletePage from './components_pages/client_components/TossPay_CompletePage';
import TosApproveContain from './components_pages/client_components/TosApproveContain';
import TossApprove from './components_pages/client_components/TossApprove';
import { Toss_CheckOut } from './components_pages/client_components/Toss_CheckOut';

function App() {
  const isLogin = useSelector((state) => state.user.isLogin);

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
          {/* 상품상세페이지 */}
          <Route path="/store/detail/:id" element={<Detail_client />} />
          {/* 주문서작성 영역 */}
          {/* 1. 싱글상품 */}
          <Route path="/store/order" element={<Order_client />} />
          <Route path="/store/order/checkout" element={<Toss_CheckOut />} />
          {/* 2. 카트에 담긴 여러 개 상품 */}
          <Route path="/store/cartorder" element={<Order_client />} />
          <Route path="/store/cartorder/checkout" element={<Toss_CheckOut />} />
          {/* 토스페이먼츠 완성 */}
          <Route
            path="/store/order/checkout/approval_order"
            element={<TossApprove />}
          />
          <Route
            path="/store/cartorder/checkout/approval_cartorder"
            element={<TossApprove />}
          />

          <Route path="/ordersuccess" element={<TossPay_CompletePage />} />
          {/* account쪽 */}
          <Route path="/mypage" element={<Mypage_client />} />
          <Route path="/adsubmit" element={<AdSubmit_client />} />
          <Route path="/adwrite" element={<Adwrite_client />} />
          <Route path="/agreement" element={<Agreement_client />} />
          <Route path="/privacy" element={<Privacy_client />} />
          <Route path="/guide" element={<Guide_client />} />

          {/* <Route path="/tosspayment/fail" element={<FailPage />} /> */}

          {/* 자동 로그인 되는 버전 - 수정 예정 */}
          {/* <Route
            path="/register"
            element={isLogin ? <Client_main /> : <Register_client />}
          /> */}

          {/* 회원 가입 */}
          <Route path="/register" element={<Register_client />} />
          {/* 로그인 */}
          <Route
            path="/login"
            element={isLogin ? <Mypage_client /> : <Login_client />}
          />
        </Route>

        {/* admin 영역 */}
        <Route path="/admin" element={<Admin_main />}>
          <Route path="" element={<Home_admin />} />
          <Route path="register" element={<ProductRegister_admin />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
