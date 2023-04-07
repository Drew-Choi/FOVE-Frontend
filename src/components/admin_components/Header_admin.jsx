import React from 'react';
import '../styles/header_admin.scss';
import { useNavigate } from 'react-router-dom';

export default function Header_admin() {
  const navigate = useNavigate();
  return (
    <header className="header_admin">
      <p className="logo" onClick={() => navigate('/')}>
        logo
      </p>
      <p className="admin" onClick={() => navigate('/')}>
        Admin
      </p>
    </header>
  );
}
