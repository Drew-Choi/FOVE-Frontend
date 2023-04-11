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
import DetailProduct_client from './components_pages/client_components/DetailProduct_client';
import Intro_movie_client from './components_pages/client_components/Intro_movie_clinet';
import Register_client from './components_pages/client_components/Register_client';
import { useSelector } from 'react-redux';

function App() {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <div>
      <Routes>
        {/* Client 영역 */}
        <Route path="/" element={<Client_main />}>
          <Route path="" element={<Intro_movie_client />} />
          <Route path="/aboutus" element={<AboutUs_client />} />
          <Route path="/store" element={<Store_client />} />
          <Route path="/store/detail/:id" element={<DetailProduct_client />} />
          <Route path="agreement" element={<Agreement_client />} />
          <Route path="privacy" element={<Privacy_client />} />
          <Route path="guide" element={<Guide_client />} />

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
