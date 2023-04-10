import React from 'react';
import '../../styles/footer_client.scss';
import { useNavigate } from 'react-router-dom';

export default function Footer_client() {
  const navigate = useNavigate();
  return (
    <footer className="footer_client">
      <ul id="foot_li">
        <li id="foot_info">
          <p>
            © FOVE
            <span>/ site by KDT 5th POSCO X CodingOn PROJECT</span>
          </p>
        </li>
        <li id="foot_info">
          <p className="agreement" onClick={() => navigate('#')}>
            Agreement
          </p>
        </li>
        <li id="foot_info">
          <p className="privacy" onClick={() => navigate('#')}>
            Privacy
          </p>
        </li>
        <li id="foot_info">
          <p className="guide" onClick={() => navigate('#')}>
            Guide
          </p>
        </li>
        <li id="kakao">
          <img src="/kakao.jpg" onClick={() => navigate('#')}></img>
        </li>
        <li id="instagram">
          <img src="/instagram.jpg" onClick={() => navigate('#')}></img>
        </li>
      </ul>
      <ul id="foot_li2">
        <li id="foot_info2">
          <p>COMPANY. FOVE corp.</p>
        </li>
        <li id="foot_info2">
          <p>
            TEAM MEMBER. CHOI DREW, KIM SUNG HYUN, SHIN SANG AH, SONG MIN SEON,
            PARK SUNG HEE
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
