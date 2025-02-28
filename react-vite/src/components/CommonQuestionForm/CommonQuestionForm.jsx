import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { TfiClose } from "react-icons/tfi";
import * as commonQuestionActions from "../../redux/commonQuestions";

import "./CommonQuestionForm.css";

const CommonQuestionForm = ({ commonQuestion, commonQuestionId, formType }) => {
  const [question, setQuestion] = useState(commonQuestion.question);
  const [response, setResponse] = useState(commonQuestion.response);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    const validationErrors = {};

    if (!question) {
      validationErrors.question = "Question is required";
    } else if (question.length > 500) {
      validationErrors.question =
        "Question cannot be longer than 500 characters";
    }

    if (!response) validationErrors.response = "Response is required";

    setErrors(validationErrors);
  }, [question, response]);

  const header =
    formType === "createCommonQuestion"
      ? "Add Common Question"
      : "Update Common Question";

  const buttonText =
    formType === "createCommonQuestion"
      ? "Add Common Question"
      : "Update Common Question";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).length) return setHasSubmitted(true);

    const commonQuestion = {
      question,
      response,
    };

    if (formType === "createCommonQuestion") {
      await dispatch(
        commonQuestionActions.thunkCreateCommonQuestion(commonQuestion)
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors)
          return setErrors({
            serverError: "There was a server issue, please try again.",
          });
      });

      return closeModal();
    } else {
      await dispatch(
        commonQuestionActions.thunkUpdateCommonQuestion(
          commonQuestion,
          commonQuestionId
        )
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors)
          return setErrors({
            serverError: "There was a server issue, please try again.",
          });
      });

      return closeModal();
    }
  };
  return (
    <article className="common-question-form">
      <TfiClose onClick={() => closeModal()} id="close-question-form" />
      <header>
        <h1>{header}</h1>
      </header>
      <form>
        <section className="cq-form-input">
          <div>
            <label>Question:</label>
            <span>Characters: {question.length}</span>
          </div>
          <textarea
            placeholder="Enter the question text here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="4"
          />
          <div className="common-question-form-error">
            {hasSubmitted && errors.question && <p>{errors.question}</p>}
          </div>
        </section>
        <section className="cq-form-input">
          <div>
            <label>Response:</label>
            <span>Characters: {response.length}</span>
          </div>
          <textarea
            placeholder="Enter your response here..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows="15"
          />
          <div className="common-question-form-error">
            {hasSubmitted && errors.response && <p>{errors.response}</p>}
          </div>
        </section>
        <button onClick={handleSubmit}>{buttonText}</button>
        <div
          className="common-question-form-error"
          style={{ textAlign: "center" }}
        >
          {hasSubmitted && errors.serverError && <p>{errors.serverError}</p>}
        </div>
      </form>
    </article>
  );
};

export default CommonQuestionForm;
