import CommonQuestionForm from "./CommonQuestionForm";
import { useSelector } from "react-redux";


const EditCommonQuestion = ({ commonQuestionId }) => {
  const commonQuestion = useSelector(state => state.commonQuestions[commonQuestionId]);

  if (!commonQuestion) return <h1>Loading...</h1>

  return (
    <CommonQuestionForm
      commonQuestion={commonQuestion}
      commonQuestionId={commonQuestionId}
      formType="editCommonQuestion"
    />
  );
};

export default EditCommonQuestion;