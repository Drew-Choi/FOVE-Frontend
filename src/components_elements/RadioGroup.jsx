import React from 'react';

export default function RadioGroup({ label, children, classNameRadio }) {
  return (
    <fieldset
      className={classNameRadio}
      style={{ border: '0px', marginTop: '0px', padding: '10px' }}
    >
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
}
