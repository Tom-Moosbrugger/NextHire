const ApplicationFormInput = ({
  label,
  type,
  placeholder,
  value,
  handleChange,
}) => {
  return (
    <div className="application-form-input">
      <label>
        {label}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default ApplicationFormInput;
