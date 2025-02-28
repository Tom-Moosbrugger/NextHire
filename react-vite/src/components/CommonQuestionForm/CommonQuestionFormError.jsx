const CommonQuestionFormError = ({ hasSubmitted, error }) => {
    return (
        <div className="common-question-form-error">
            {hasSubmitted && error && (
                <p>{error}</p>
            )}
        </div>
    )
}

export default CommonQuestionFormError;