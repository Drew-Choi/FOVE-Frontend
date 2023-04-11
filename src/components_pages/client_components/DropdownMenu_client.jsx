import React from 'react';
import { useState } from 'react';

export default function DropdownMenu_client() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
        드롭다운 메뉴
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <a href="#">링크 1</a>
          <a href="#">링크 2</a>
          <a href="#">링크 3</a>
        </div>
      )}
    </div>
  );
}
