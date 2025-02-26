const ApplicationFormTextarea = ({
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
          <textarea
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
        </label>
      </div>
    );
  };
  
  export default ApplicationFormTextarea;