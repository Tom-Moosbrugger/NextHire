import { createSelector } from "reselect";

// action constants

const LOAD_COMMON_QUESTIONS = "commonQuestions/loadCommonQuestions";
const CREATE_OR_UPDATE_COMMON_QUESTION =
  "commonQuestions/createOrUpdateCommonQuestion";
const DELETE_COMMON_QUESTION = "commonQuestions/deleteCommonQuestion";

// regular actions

const loadCommonQuestions = (commonQuestions) => {
  return {
    type: LOAD_APPLICATIONS,
    commonQuestions,
  };
};

const createOrUpdateCommonQuestion = (commonQuestion) => {
  return {
    type: CREATE_OR_UPDATE_APPLICATION,
    commonQuestion,
  };
};

const deleteCommonQuestion = (commonQuestionId) => {
  return {
    type: DELETE_APPLICATION,
    commonQuestionId,
  };
};

// thunk actions

export const thunkLoadCommonQuestions = () => async (dispatch) => {
  const response = await fetch("/api/common-questions");

  if (response.ok) {
    const commonQuestions = await response.json();
    dispatch(loadCommonQuestions(commonQuestions));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkCreateCommonQuestion =
  (newCommonQuestion) => async (dispatch) => {
    const response = await fetch("/api/common-questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommonQuestion),
    });

    if (response.ok) {
      const newCommonQuestion = await response.json();
      dispatch(createOrUpdateCommonQuestion(newCommonQuestion));
      return newCommonQuestion;
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  };

export const thunkUpdateCommonQuestion =
  (updatedCommonQuestion, updatedCommonQuestionId) => async (dispatch) => {
    const response = await fetch(
      `/api/common-questions/${updatedCommonQuestionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCommonQuestion),
      }
    );

    if (response.ok) {
      const updatedCommonQuestion = await response.json();
      dispatch(createOrUpdateCommonQuestion(updatedCommonQuestion));
      return updatedCommonQuestion;
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  };

export const thunkDeleteCommonQuestion =
  (deletedCommonQuestionId) => async (dispatch) => {
    const response = await fetch(
      `/api/common-questions/${deletedCommonQuestionId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      dispatch(deleteCommonQuestion(deletedCommonQuestionId));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  };

// selectors

const getCommonQuestionsState = (state) => state.commonQuestions;

export const getQuestionsArr = createSelector(
  [getCommonQuestionsState],
  (commonQuestionsState) => Object.values(commonQuestionsState)
);

// reducer

const commonQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_COMMON_QUESTIONS:
      return { ...state, ...action.commonQuestions };
    case CREATE_OR_UPDATE_COMMON_QUESTION:
      return { ...state, ...action.commonQuestion };
    case DELETE_COMMON_QUESTION: {
      const { [action.commonQuestionId]: _, ...newState } = state;
      return newState;
    }
    default:
      return state;
  }
};

export default commonQuestionsReducer;
