export default function Input_Custom({
  children,
  inputref,
  type,
  name,
  placeholder,
  onChangeEvent,
  value,
  onClickEvent,
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
      />
    </div>
  );
}
