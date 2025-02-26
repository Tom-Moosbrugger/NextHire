const ApplicationFormError = ({ hasSubmitted, error }) => {
    return (
        <div className="application-form-error">
            {hasSubmitted && error && (
                <p>{error}</p>
            )}
        </div>
    )
}

export default ApplicationFormError;