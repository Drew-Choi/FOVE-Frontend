import React from 'react';
import '../../styles/header_admin.scss';
import { useNavigate } from 'react-router-dom';

export default function Header_admin() {
  const navigate = useNavigate();
  return (
    <header className="header_admin">
      <p className="logo" onClick={() => navigate('/admin')}>
        FOVE Admin
      </p>
      <strong>관리자 페이지</strong>
    </header>
  );
}
