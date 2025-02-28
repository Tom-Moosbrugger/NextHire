import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { TfiClose } from "react-icons/tfi";
import * as commonQuestionActions from "../../redux/commonQuestions";
import CommonQuestionFormTextArea from "./CommonQuestionFormTextArea";
import CommonQuestionFormError from "./CommonQuestionFormError";
import { validateCommonQuestionInputs } from "../../resources/helperFunctions";
import "./CommonQuestionForm.css";

const CommonQuestionForm = ({ commonQuestion, commonQuestionId, formType }) => {
  const [question, setQuestion] = useState(commonQuestion.question);
  const [response, setResponse] = useState(commonQuestion.response);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrors(validateCommonQuestionInputs(question, response));
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
          <CommonQuestionFormTextArea
            label="Question:"
            value={question}
            placeholder="Enter the question text here..."
            handleChange={(e) => setQuestion(e.target.value)}
            rows="4"
          />
          <CommonQuestionFormError
            hasSubmitted={hasSubmitted}
            error={errors.question}
          />
        </section>
        <section className="cq-form-input">
          <CommonQuestionFormTextArea
            label="Response:"
            value={response}
            placeholder="Enter the question text here..."
            handleChange={(e) => setResponse(e.target.value)}
            rows="15"
          />
          <CommonQuestionFormError
            hasSubmitted={hasSubmitted}
            error={errors.response}
          />
        </section>
        <button onClick={handleSubmit}>{buttonText}</button>
        <CommonQuestionFormError
          hasSubmitted={hasSubmitted}
          error={errors.serverError}
        />
      </form>
    </article>
  );
};

export default CommonQuestionForm;
