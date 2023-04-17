import React from 'react';
import { Outlet } from 'react-router-dom';
import Header_admin from './Header_admin';
import Layout_nav_inner_contain_admin from '../../styles/Layout_nav_inner_contain_admin';
import Footer_client from '../client_components/Footer_client';

export default function Admin_main() {
  return (
    <>
      <Header_admin />
      <Layout_nav_inner_contain_admin>
        <Outlet></Outlet>
      </Layout_nav_inner_contain_admin>
      <Footer_client />
    </>
  );
}
