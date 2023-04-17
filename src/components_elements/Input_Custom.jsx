export default function Input_Custom({
  children,
  inputref,
  type,
  name,
  placeholder,
  onChangeEvent,
  value,
  onClickEvent,
  multiple,
  accept,
  disabled,
  classNameNew,
}) {
  return (
    <div>
      <p>{children}</p>
      <input
        // input 값을 ref로 보내기
        ref={inputref}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChangeEvent}
        onClick={onClickEvent}
        multiple={multiple}
        accept={accept}
        disabled={disabled}
        className={classNameNew}
      />
    </div>
  );
}
