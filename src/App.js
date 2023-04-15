import './App.css';
import { Route, Routes } from 'react-router-dom';
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
import TEST_TOSS from './components_pages/client_components/TEST_TOSS';
import Order_client from './components_pages/client_components/Order_client';

import { useSelector } from 'react-redux';
<<<<<<< HEAD
import { ModalContainer_client } from './components_pages/client_components/ModalContainer_client';
import Store_Categorys from '../src/components_pages/client_components/Store_Categorys';
=======
import SizeFit from './components_pages/client_components/SizeFit';
import Order_client from './components_pages/client_components/Order_client';
import Store_Categorys from './components_pages/client_components/Store_Categorys';
import TEST_TOSS from './components_pages/client_components/TEST_TOSS';
import { CheckoutPage } from './components_pages/client_components/CheckOut';
import { SuccessPage } from './components_pages/client_components/Success';
>>>>>>> 3f06206c4e52620f796e5032574502c6c696f005

function App() {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <div>
      <Routes>
        {/* Client 영역 */}
        <Route path="/" element={<Client_main />}>
          <Route path="" element={<Intro_movie_client />} />
          <Route path="/toss" element={<TEST_TOSS />} />
          <Route path="/aboutus" element={<AboutUs_client />} />
          <Route path="/store" element={<Store_client />} />
          <Route path="/store/:category" element={<Store_Categorys />} />
          <Route path="/store/detail/:id" element={<Detail_client />} />
          <Route path="/store/order" element={<Order_client />} />
          <Route path="/mypage" element={<Mypage_client />} />
          <Route path="/adsubmit" element={<AdSubmit_client />} />
          <Route path="/adwrite" element={<Adwrite_client />} />
          <Route path="/agreement" element={<Agreement_client />} />
          <Route path="/privacy" element={<Privacy_client />} />
          <Route path="/guide" element={<Guide_client />} />
          {/* 임시 모달 작업 */}
          <Route path="/modalcontainer" element={<ModalContainer_client />} />

          <Route path="/tosspayment" element={<CheckoutPage />} />
          <Route path="/tosspayment/success" element={<SuccessPage />} />
          {/* <Route path="/tosspayment/fail" element={<FailPage />} /> */}
          {/* 자동 로그인 되는 버전 - 수정 예정 */}
          <Route
            path="/register"
            element={isLogin ? <Client_main /> : <Register_client />}
          />
          {/* <Route path="/register" element={<Register_client />} /> */}
        </Route>

        {/* admin 영역 */}
        <Route path="/admin" element={<Admin_main />}>
          <Route path="" element={<Home_admin />} />
          <Route path="register" element={<ProductRegister_admin />} />
        </Route>
        <Route
          path="*"
          element={
            <h2 style={{ display: 'inline-block' }}>NOT FOUND 404err</h2>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
