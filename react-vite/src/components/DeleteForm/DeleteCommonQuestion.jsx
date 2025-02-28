import DeleteForm from "./DeleteForm";

const DeleteCommonQuestion = ({ commonQuestionId }) => {

  return <DeleteForm formType="Common Question" resourceId={commonQuestionId} />;
};

export default DeleteCommonQuestion;