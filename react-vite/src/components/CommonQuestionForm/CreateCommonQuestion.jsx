import CommonQuestionForm from "./CommonQuestionForm";

const CreateCommonQuestion = () => {
  const commonQuestion = {
    question: "",
    response: "",
  };

  return (
    <CommonQuestionForm
      commonQuestion={commonQuestion}
      commonQuestionId={null}
      formType="createCommonQuestion"
    />
  );
};

export default CreateCommonQuestion;
