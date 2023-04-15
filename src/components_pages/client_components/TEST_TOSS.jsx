import React from 'react';
<<<<<<< HEAD

export default function TEST_TOSS() {
  return (
    <div>
      <button
        style={{
          position: 'relative',
          top: '300px',
          fontSize: '300px',
        }}
      >
        짱
      </button>
=======
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
>>>>>>> 3f06206c4e52620f796e5032574502c6c696f005
    </div>
  );
}
