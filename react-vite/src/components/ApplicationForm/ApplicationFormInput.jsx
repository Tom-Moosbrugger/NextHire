const ApplicationFormInput = ({
  label,
  type,
  placeholder,
  value,
  accept,
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
          accept={accept}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default ApplicationFormInput;
