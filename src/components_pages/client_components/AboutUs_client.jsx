import React from 'react';
import '../../styles/aboutus_client.scss';
import { useNavigate } from 'react-router-dom';

export default function AboutUs_client() {
  const navigate = useNavigate();
  return (
    <>
      <div className="aboutus">
        <div className="about_left">
          <img src="images/aboutus.gif"></img>
        </div>
        <div className="about_right">
          <div className="maintitle">
            <h2 className="subtitle">
              ABOUT
              <br />
              <br />
              <br />
            </h2>
            <div className="aboutus">
              <p>
                FOVE is brand that stands for Fever, Freedom, Fortitude, Faith,
                <br />
                and is a brand of passion, energy and challenge.
                <br />
                <br />
                FOVE는 Fervor(열정), Freedom(자유), Fortitude(불굴의정신),
                Faith(신념)을 상징하며,
                <br />
                열정과 에너지 그리고 도전의 정신이 담긴 브랜드입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
