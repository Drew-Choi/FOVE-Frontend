import React from 'react';
import '../../styles/aboutus_client.scss';
import { useNavigate } from 'react-router-dom';

export default function AboutUs_client() {
  const navigate = useNavigate();
  return (
    <>
      <div className="maintitle">
        <h2 className="subtitle">ABOUT US</h2>
        <div className="aboutus">
          <p>
            FOVE is brand that stands for Fever, Freedom, Fortitude, Faith, and
            is a brand of passion, energy and challenge.
          </p>
          <br />
          <br />
          <br />
          <p>
            FOVE는 Fervor(열정), Freedom(자유), Fortitude(불굴의정신),
            Faith(신념)을 상징하며,
            <br />
            열정과 에너지 그리고 도전의 정신이 담긴 브랜드입니다.
          </p>
        </div>
      </div>
    </>
  );
}
