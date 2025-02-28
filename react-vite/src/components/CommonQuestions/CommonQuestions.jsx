import { useSelector } from "react-redux";
import {
  CreateCommonQuestion,
  EditCommonQuestion,
} from "../CommonQuestionForm";
import { DeleteCommonQuestion } from "../DeleteForm";
import OpenModalButton from "../OpenModalButton";
import Loading from "../Loading";
import { FaRegTrashAlt } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import * as commonQuestionActions from "../../redux/commonQuestions";
import "./CommonQuestions.css";

const CommonQuestions = () => {
  const { setModalContent } = useModal();
  const commonQuestions = useSelector(commonQuestionActions.getQuestionsArr);

  if (!commonQuestions) return <Loading />;

  return (
    <article className="common-questions">
      <header>
        <OpenModalButton
          modalComponent={<CreateCommonQuestion />}
          buttonText="Add Common Question"
          id="create-common-question"
        />
      </header>
      <section className="common-question-tiles">
        {commonQuestions.map((commonQuestion) => (
          <div key={commonQuestion.id} className="common-question-tile">
            <p
              onClick={() =>
                setModalContent(
                  <EditCommonQuestion commonQuestionId={commonQuestion.id} />
                )
              }
            >
              {commonQuestion.question.length > 90
                ? `${commonQuestion.question.slice(0, 89)}...?`
                : commonQuestion.question}
            </p>
            <FaRegTrashAlt
              onClick={() =>
                setModalContent(
                  <DeleteCommonQuestion commonQuestionId={commonQuestion.id}/>
                )
              }
              className="delete-common-question"
            />
          </div>
        ))}
      </section>
    </article>
  );
};

export default CommonQuestions;
