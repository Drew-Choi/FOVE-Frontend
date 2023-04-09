import React from 'react';
import styled from 'styled-components';
import NavBar_admin from '../components_pages/admin_components/NavBar_admin';

const Layout_container = styled.main`
  display: flex;
`;

const Layout_inner = styled.section`
  display: inline-block;
  /* background-color: bisque; */
  box-sizing: border-box;
  right: 0px;
  top: 60px;
  width: 91vw;
  border-bottom: 0.5px solid black;
`;

export default function Layout_nav_inner_contain_admin({ children }) {
  return (
    <Layout_container>
      <NavBar_admin />
      <Layout_inner>{children}</Layout_inner>
    </Layout_container>
  );
}
