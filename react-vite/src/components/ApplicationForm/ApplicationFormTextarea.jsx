const ApplicationFormTextarea = ({
    label,
    placeholder,
    value,
    handleChange,
    id
  }) => {
    return (
      <div id={id} className="application-form-input">
        <label>
          {label}
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            rows="10"
          />
        </label>
      </div>
    );
  };
  
  export default ApplicationFormTextarea;