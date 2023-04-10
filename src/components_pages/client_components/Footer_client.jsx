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
          <br />
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
      </ul>
    </footer>
  );
}
