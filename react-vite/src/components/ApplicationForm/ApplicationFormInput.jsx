const ApplicationFormInput = ({
  label,
  type,
  placeholder,
  value,
  accept,
  handleChange,
  id
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
          id={id}
        />
      </label>
    </div>
  );
};

export default ApplicationFormInput;
