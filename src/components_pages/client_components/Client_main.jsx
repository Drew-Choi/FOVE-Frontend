import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header_client from './Header_client';
import Footer_client from './Footer_client';
import SubNav_client from './SubNav_client';

export default function Client_main() {
  //현재 URL주소를 표시해줌
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <Header_client />
      {/* 인트로에 필요없는 서브 네브 메뉴를 현재 URL을 파악하고 조건을 걸어서 나타났다 사라졌다 해줌 */}
      {pathname === '/' ? null : (
        <SubNav_client
          menu1="VIEW ALL"
          menu2="NEW ARRIVALS"
          menu3="BEANIE"
          menu4="HAT"
          menu5="MUFFLER"
          top="70px"
        />
      )}

      <Outlet></Outlet>
      <Footer_client />
    </>
  );
}
