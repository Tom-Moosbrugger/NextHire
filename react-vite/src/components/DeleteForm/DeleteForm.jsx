import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";
import * as applicationActions from "../../redux/applications";
import * as commonQuestionActions from "../../redux/commonQuestions";
import "./DeleteForm.css";

const DeleteForm = ({ formType, resourceId }) => {
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = (e) => {
    e.stopPropagation();

    return closeModal()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formType === "Application") {
      await dispatch(
        applicationActions.thunkDeleteApplication(resourceId)
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors)
          return setErrors({
            serverError: "There was a server issue, please try again.",
          });
      });

      closeModal();

      return navigate("/applications");
    } else if (formType === "Common Question") {
      await dispatch(
        commonQuestionActions.thunkDeleteCommonQuestion(resourceId)
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors)
          return setErrors({
            serverError: "There was a server issue, please try again.",
          });
      });

      closeModal();
    }
  };

  return (
    <article className="delete-form">
      <TfiClose onClick={() => closeModal()} id="close-delete-form"/>
      <header>
        <h1>Delete {formType}?</h1>
      </header>
      <div className="delete-error">
        {errors.serverError && <p>{errors.serverError}</p>}
      </div>
      <div className="delete-buttons">
        <button onClick={handleSubmit}>Yes</button>
        <button onClick={handleCancel}>No</button>
      </div>
    </article>
  );
};

export default DeleteForm;