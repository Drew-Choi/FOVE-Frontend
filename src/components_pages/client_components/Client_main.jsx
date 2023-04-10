import React from 'react';
import { Outlet } from 'react-router-dom';
import Header_client from './Header_client';
import Footer_client from './Footer_client';

export default function Client_main() {
  return (
    <>
      <Header_client />
      <Outlet></Outlet>
      <Footer_client />
    </>
  );
}
