export default function Select_Custom({
  children,
  value,
  onChangeEvent,
  selectList,
  inputRef,
}) {
  return (
    <div>
      <p>{children}</p>
      <select ref={inputRef} value={value} onChange={onChangeEvent}>
        {selectList.map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}
