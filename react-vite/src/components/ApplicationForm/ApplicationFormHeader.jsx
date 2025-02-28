const ApplicationFormHeader = ({ h2text, h3text }) => {
  return (
    <header className="application-form-header">
      <h2>{h2text}</h2>
      <h3>{h3text}</h3>
    </header>
  );
};

export default ApplicationFormHeader;