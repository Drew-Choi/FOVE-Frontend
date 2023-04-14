import React from 'react';
import { useState } from 'react';

export default function SizeFit() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <>
      <div className="sizefit_wrap">
        <div>
          <div className="sizefit">
            <div>PRODUCT MEASUREMENTS</div>
            <div>CLOSE</div>
          </div>
          <div>
            <button onClick={openPopup}>Open Popup</button>
            {isPopupOpen && (
              <div className="popup">
                <div className="popup-content">
                  <h2>Popup Title</h2>
                  <p>Popup Content</p>
                  <button onClick={closePopup}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
