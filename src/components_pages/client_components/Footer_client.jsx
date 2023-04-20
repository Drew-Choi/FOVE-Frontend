import React from 'react';
import '../../styles/footer_client.scss';
import { useNavigate } from 'react-router-dom';

export default function Footer_client() {
  const navigate = useNavigate();
  return (
    <footer className="footer_client">
      <ul id="foot_li">
        <li id="foot_info">
          <p>© FOVE / site by KDT 5th POSCO X CodingOn PROJECT</p>
          <span className="agreement" onClick={() => navigate('/agreement')}>
            Agreement
          </span>
          <span className="privacy" onClick={() => navigate('/privacy')}>
            Privacy
          </span>
          <span className="guide" onClick={() => navigate('/guide')}>
            Guide
          </span>
          <a href="#">
            <img src="/kakao.jpg" alt="kakaoicon"></img>
          </a>
          <a href="https://www.instagram.com/fove._official">
            <img src="/instagram.jpg" alt="instagramicon"></img>
          </a>
        </li>
      </ul>
      <ul id="foot_li2">
        <li id="foot_info2">
          <p>COMPANY. FOVE corp.</p>
        </li>
        <li id="foot_info2">
          <p>
            TEAM MEMBER. CHOI DREW, KIM SEONG HYEON, SHIN SANG AH, SONG MIN
            SEON, PARK SUNG HEE
          </p>
        </li>
        <li id="foot_info2">
          <p>REPRESENTATIVE. KIM YOUNG HO</p>
        </li>
        <li id="foot_info2">
          <p>
            COMPANY. #03409 B1, 29, Jinheung-ro, Eunpyeong-gu, Seoul, Republic
            of Korea
          </p>
        </li>
        <li id="foot_info2">
          <p>C/S CENTER. 010-9148-7457 / 11:00 - 17:00</p>
        </li>
        <li id="foot_info2">
          <p>E-MAIL. marketing@fove.com</p>
        </li>
      </ul>
    </footer>
  );
}
