import React from 'react';
import { Outlet } from 'react-router-dom';
import Header_admin from './Header_admin';
import NavBar_admin from './NavBar_admin';

export default function Admin_main() {
  return (
    <>
      <Header_admin />
      <NavBar_admin />
      <Outlet></Outlet>
    </>
  );
}
