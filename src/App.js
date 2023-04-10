import './App.css';
import { Route, Routes } from 'react-router-dom';
import Admin_main from './components_pages/admin_components/Admin_main';
import ProductRegister_admin from './components_pages/admin_components/ProductRegister_admin';
import Home_admin from './components_pages/admin_components/Home_admin';
import FileUpload_img_madal from './components_elements/FileUpload_img_madal';
import { useState } from 'react';

function App() {
  const [test, setTest] = useState([
    {
      thumbnail: 'https://t1.daumcdn.net/cfile/tistory/2463694C53D0A5D806',
      type: 'png',
    },
    {
      thumbnail:
        'https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg',
      type: 'png',
    },
  ]);
  return (
    <div>
      {/* <FileUpload_img_madal imageFilesData={test} /> */}
      <Routes>
        <Route
          path="/"
          element={
            <h1>여기에 메인 작성하시오</h1>
            //컴포넌트들 여기에 추가추가
            //하하하하하하
            //어드민으로 나누다보니 모두 라우터 처리 해야함
          }
        />
        <Route path="/admin" element={<Admin_main />}>
          <Route path="" element={<Home_admin />} />
          <Route path="register" element={<ProductRegister_admin />} />
          <Route
            path="*"
            element={
              <h2 style={{ display: 'inline-block' }}>NOT FOUND 404err</h2>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
