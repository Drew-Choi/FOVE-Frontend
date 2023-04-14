import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TEST_TOSS() {
  const navigate = useNavigate();

  return (
    <div height="1000px">
      <div width="900px" height="900px">
        <button
          style={{
            width: '400px',
            height: '900px',
            position: 'relative',
            top: '100px',
            fontSize: '100px',
          }}
          onClick={() => {
            navigate('/tosspayment');
          }}
        >
          짱
        </button>
      </div>
    </div>
  );
}
