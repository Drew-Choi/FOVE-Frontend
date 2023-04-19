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
  onClickEvent,
  checkedEvent,
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
        onClick={onClickEvent}
        checked={checkedEvent}
      />
      {children}
    </label>
  );
}
