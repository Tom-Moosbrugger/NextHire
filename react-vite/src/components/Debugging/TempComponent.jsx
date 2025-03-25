// TemporaryComponent.jsx
import ApplicationQuestions from "../ApplicationForm/ApplicationQuestions";
import { useState } from "react";

function TemporaryComponent() {
  const [appQuestions, setAppQuestions] = useState([]);

//   const addQuestion = (e) => {
//     e.stopPropagation();
//     console.log("addQuestion clicked");
//     setAppQuestions((prevQuestions) => [
//       ...prevQuestions,
//       { question: "", response: "" },
//     ]);
//     console.log("appQuestions after addQuestion:", appQuestions);
//   };

  return (
    <>
      {/* <button onClick={addQuestion}>Add Question</button> */}
      <ApplicationQuestions
        appQuestions={appQuestions}
        setAppQuestions={setAppQuestions}
        errors={{}}
        setErrors={() => {}}
        hasSubmitted={false}
      />
    </>
  );
}

export default TemporaryComponent;