import React from 'react';

export default function RadioGroup({ label, children }) {
  return (
    <fieldset style={{ border: '0px' }}>
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
}
