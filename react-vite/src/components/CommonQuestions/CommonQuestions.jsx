import { CreateCommonQuestion } from "../CommonQuestionForm";
import OpenModalButton from "../OpenModalButton";
import "./CommonQuestions.css";

const CommonQuestions = () => {
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
