import React from 'react';
import '../../styles/agreement_client.scss';
import { useNavigate } from 'react-router-dom';

export default function Agreement_client() {
  const navigate = useNavigate();
  return (
    <>
      <div className="titleArea">
        <h2 className="subtitle">이용약관</h2>
      </div>
      <div className="agreement">
        <span>제1조(목적)</span>
      </div>
    </>
  );
}
