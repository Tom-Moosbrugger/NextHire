const CommonQuestionFormTextArea = ({
  label,
  value,
  placeholder,
  handleChange,
  rows,
}) => {
  return (
    <>
      <div>
        <label>{label}</label>
        <span>Characters: {value.length}</span>
      </div>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        rows={rows}
      />
    </>
  );
};

export default CommonQuestionFormTextArea;
