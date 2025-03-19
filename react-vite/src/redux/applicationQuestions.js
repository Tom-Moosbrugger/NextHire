import { createSelector } from "reselect";

// constants

const LOAD_APP_QUESTIONS = "applicationQuestions/loadAppQuestions";
const CREATE_OR_UPDATE_APP_QUESTION =
  "applicationQuestions/createOrUpdateAppQuestion";
const DELETE_APP_QUESTION = "applicationQuestions/deleteAppQuestion";

// regular actions

const loadAppQuestions = (appQuestions) => {
  return {
    type: LOAD_APP_QUESTIONS,
    appQuestions,
  };
};

const createOrUpdateAppQuestion = (appQuestion) => {
  return {
    type: CREATE_OR_UPDATE_APP_QUESTION,
    appQuestion,
  };
};

const deleteAppQuestion = (appQuestionId) => {
  return {
    type: DELETE_APP_QUESTION,
    appQuestionId,
  };
};

// thunk actions

export const thunkLoadAppQuestions = (applicationId) => async (dispatch) => {
  const response = await fetch(`/api/applications/${applicationId}/questions`);

  if (response.ok) {
    const appQuestions = await response.json();
    dispatch(loadAppQuestions(appQuestions));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkCreateAppQuestions =
  (appQuestions, applicationId) => async (dispatch) => {
    const response = fetch(`/api/applications/${applicationId}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appQuestions),
    });

    if (response.ok) {
      const appQuestions = await response.json();
      dispatch(createOrUpdateAppQuestion(appQuestions));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  };

export const thunkUpdateAppQuestion =
  (updatedQuestion, applicationId, questionId) => async (dispatch) => {
    const response = await fetch(
      `/api/applications/${applicationId}/questions/${questionId}}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuestion),
      }
    );

    if (response.ok) {
      const updatedQuestion = await response.json();
      dispatch(createOrUpdateAppQuestion(updatedQuestion));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  };

export const thunkDeleteAppQuestion =
  (applicationId, questionId) => async (dispatch) => {
    const response = await fetch(
      `/api/applications/${applicationId}/questions/${questionId}}`,
      { method: "DELETE" }
    );

    if (response.ok) {
        dispatch(deleteAppQuestion(questionId));
      } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
      } else {
        return { server: "Something went wrong. Please try again" };
      }
  };

// selectors

const getAppQuestionState = (state) => state.applicationQuestions;

export const selectAppQuestions = (applicationId) =>
  createSelector([getAppQuestionState], (appQuestionState) =>
    Object.values(appQuestionState).filter(
      (appQuestion) => appQuestion.applicationId === applicationId
    )
  );

// reducer

const applicationQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_APP_QUESTIONS:
      return { ...state, ...action.appQuestions };
    case CREATE_OR_UPDATE_APP_QUESTION:
      return { ...state, ...action.appQuestion };
    case DELETE_APP_QUESTION: {
      const { [action.appQuestionId]: _, ...newState } = state;
      return newState;
    }
    default:
      return state;
  }
};

export default applicationQuestionReducer;
