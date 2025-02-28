import { useSelector } from "react-redux";
import { CreateCommonQuestion } from "../CommonQuestionForm";
import OpenModalButton from "../OpenModalButton";
import Loading from "../Loading";
import "./CommonQuestions.css";

const CommonQuestions = () => {
  const commonQuestions = useSelector(state => state.commonQuestions);

  if (!commonQuestions) return <Loading />

  return (
    <article className="common-questions">
      <header>
        <OpenModalButton
          modalComponent={<CreateCommonQuestion />}
          buttonText="Add Common Question"
          id="create-common-question"
        />
      </header>
    </article>
  );
};

export default CommonQuestions;
