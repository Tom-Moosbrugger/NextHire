import { useState } from "react";
import CommonQuestionFormTextArea from "../CommonQuestionForm/CommonQuestionFormTextArea";

const ApplicationQuestions = () => {
  const [appQuestions, setAppQuestions] = useState([]);

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
  const removeQuestion = (index) => () =>
    setAppQuestions(appQuestions.filter((q, i) => i !== index));

  return (
    <>
      <button onClick={addQuestion}>ADD QUESTION</button>
      {appQuestions.length > 0 &&
        appQuestions.map((appQuestion, index) => (
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
            <CommonQuestionFormTextArea
              label="Response:"
              value={appQuestions[index].response}
              placeholder="Enter your response here..."
              handleChange={(e) =>
                setAppQuestions(setValue(e, index, "response"))
              }
              rows="4"
            />
            <button onClick={removeQuestion(index)}>Remove Question</button>
          </section>
        ))}
    </>
  );
};

export default ApplicationQuestions;

/*

Create a slice of state for application questions
slice is an array of question/response pojos
map over the array to generate the textareas
create the onchange function for each input: select the object based on
the index and edit the property with each update
Create a button that pushes a new object to the array, creating another input


*/
