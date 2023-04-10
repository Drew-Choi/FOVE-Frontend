import './App.css';
import { Route, Routes } from 'react-router-dom';
import Admin_main from './components_pages/admin_components/Admin_main';
import ProductRegister_admin from './components_pages/admin_components/ProductRegister_admin';
import Home_admin from './components_pages/admin_components/Home_admin';
import { useState } from 'react';
import Header_client from './components_pages/client_components/Header_client';
import Footer_client from './components_pages/client_components/Footer_client';
import Client_main from './components_pages/client_components/Client_main';

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
      <Routes>
        <Route path="/" element={<Client_main />} />
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
