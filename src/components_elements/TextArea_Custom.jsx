export default function TextArea_Custom({
  children,
  inputref,
  type,
  name,
  placeholder,
  onChangeEvent,
  value,
  onClickEvent,
  maxLength,
  cols,
  rows,
  styleArea,
  styleChildren,
<<<<<<< HEAD
=======
  textAreaClassName,
>>>>>>> 3f06206c4e52620f796e5032574502c6c696f005
}) {
  return (
    <div>
      <p style={styleChildren}>{children}</p>
      <textarea
        // input 값을 ref로 보내기
        style={styleArea}
        ref={inputref}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChangeEvent}
        onClick={onClickEvent}
        maxLength={maxLength}
        cols={cols}
        rows={rows}
        className={textAreaClassName}
      />
    </div>
  );
}
