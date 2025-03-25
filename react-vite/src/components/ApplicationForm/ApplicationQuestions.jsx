import { useState, useEffect } from "react";
import CommonQuestionFormTextArea from "../CommonQuestionForm/CommonQuestionFormTextArea";
import CommonQuestionFormError from "../CommonQuestionForm/CommonQuestionFormError";
import { validateAppQuestions } from "../../resources/helperFunctions";

const ApplicationQuestions = () => {
  const [appQuestions, setAppQuestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    setErrors(validateAppQuestions(appQuestions));
  }, [appQuestions]);

  // close over event, index, and name of property
  // return regular setting function to update state
  const setValue = (e, index, prop) => (prevQuestions) => {
    return prevQuestions.map((question, i) => {
      if (i === index) {
        return { ...question, [prop]: e.target.value };
      }
      return question;
    });
  };

  const addQuestion = () => {
    setAppQuestions((prevQuestions) => [
      ...prevQuestions,
      { question: "", response: "" },
    ]);
  };

  // close over index and return new function with current index
  // inner cb filters out the target question.
  const removeQuestion = (index) => () =>
    setAppQuestions(appQuestions.filter((q, i) => i !== index));

  return (
    <>
      <button onClick={addQuestion}>Add Question</button>
      {appQuestions.length > 0 &&
        appQuestions.map((_appQuestion, index) => (
          <section key={index}>
            <CommonQuestionFormTextArea
              label="Question:"
              value={appQuestions[index].question}
              placeholder="Enter the question text here..."
              handleChange={(e) =>
                setAppQuestions(setValue(e, index, "question"))
              }
              rows="4"
            />
            <CommonQuestionFormError
              hasSubmitted={hasSubmitted}
              error={errors[`question${index}`]}
            />
            <CommonQuestionFormTextArea
              label="Response:"
              value={appQuestions[index].response}
              placeholder="Enter your response here..."
              handleChange={(e) =>
                setAppQuestions(setValue(e, index, "response"))
              }
              rows="4"
            />
            <CommonQuestionFormError
              hasSubmitted={hasSubmitted}
              error={errors[`response${index}`]}
            />
            <button onClick={removeQuestion(index)}>Remove Question</button>
          </section>
        ))}
        <button onClick={() => setHasSubmitted(true)}>Submit</button>
    </>
  );
};

export default ApplicationQuestions;

/*



*/
