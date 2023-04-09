import { check } from 'prettier';
import React from 'react';

export default function RadioEl({
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
      {children}
      <input
        ref={inputref}
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChangeEvent}
      />
    </label>
  );
}
