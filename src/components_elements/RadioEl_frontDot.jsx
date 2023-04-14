import { check } from 'prettier';
import React from 'react';

export default function RadioEl_frontDot({
  children,
  value,
  name,
  defaultChecked,
  disabled,
  inputref,
  onChangeEvent,
}) {
  return (
    <label>
      <input
        ref={inputref}
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChangeEvent}
      />
      {children}
    </label>
  );
}
