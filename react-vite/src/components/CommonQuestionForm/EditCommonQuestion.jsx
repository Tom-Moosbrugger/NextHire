import Loading from "../Loading";
import CommonQuestionForm from "./CommonQuestionForm";
import { useSelector } from "react-redux";


const EditCommonQuestion = ({ commonQuestionId }) => {
  const commonQuestion = useSelector(state => state.commonQuestions[commonQuestionId]);

  if (!commonQuestion) return <Loading />

  return (
    <CommonQuestionForm
      commonQuestion={commonQuestion}
      commonQuestionId={commonQuestionId}
      formType="editCommonQuestion"
    />
  );
};

export default EditCommonQuestion;