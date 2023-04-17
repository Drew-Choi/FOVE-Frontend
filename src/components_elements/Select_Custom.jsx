export default function Select_Custom({
  children,
  value,
  onChangeEvent,
  selectList,
  inputRef,
  classNameSelect,
  classNameOption,
  classNameDiv,
  name,
}) {
  return (
    <div className={classNameDiv}>
      <p>{children}</p>
      <select
        className={classNameSelect}
        ref={inputRef}
        value={value}
        onChange={onChangeEvent}
        name={name}
      >
        {selectList.map((el) => (
          <option className={classNameOption} value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}
