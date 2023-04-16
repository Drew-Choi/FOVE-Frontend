import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header_client from './Header_client';
import Footer_client from './Footer_client';
import SubNav_client from './SubNav_client';

export default function Client_main() {
  //현재 URL주소를 표시해줌
  return (
    <>
      <Header_client />
      <Outlet></Outlet>
      <Footer_client />
    </>
  );
}
