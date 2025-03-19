import { createSelector } from "reselect";

// constants

const LOAD_APP_QUESTIONS = "applicationQuestions/loadApplicationQuestions";
const CREATE_OR_UPDATE_APP_QUESTION =
  "applicationQuestions/createOrUpdateApplicationQuestion";
const DELETE_APP_QUESTION = "applicationQuestions/deleteApplicationQuestion";

// regular actions

const loadApplicationQuestions = (questions) => {
  return {
    type: LOAD_APP_QUESTIONS,
    questions,
  };
};

const createOrUpdateApplicationQuestion = (question) => {
  return {
    type: CREATE_OR_UPDATE_APP_QUESTION,
    question,
  };
};

const deleteApplicationQuestion = (questionId) => {
  return {
    type: DELETE_APP_QUESTION,
    questionId,
  };
};

// thunk actions



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
      return { ...state, ...action.questions };
    case CREATE_OR_UPDATE_APP_QUESTION:
      return { ...state, ...action.question };
    case DELETE_APP_QUESTION: {
      const { [action.questionId]: _, ...newState } = state;
      return newState;
    }
    default:
      return state;
  }
};

export default applicationQuestionReducer;
