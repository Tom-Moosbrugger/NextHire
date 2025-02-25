// action constants

const LOAD_APPLICATIONS = "applications/loadApplications";
const CREATE_OR_UPDATE_APPLICATION = "applications/createOrUpdateApplication";
const DELETE_APPLICATION = "applications/deleteApplication";

// regular actions

const loadApplications = (applications) => {
  return {
    type: LOAD_APPLICATIONS,
    applications,
  };
};

const createOrUpdateApplication = (application) => {
  return {
    type: CREATE_OR_UPDATE_APPLICATION,
    application,
  };
};

const deleteApplication = (applicationId) => {
  return {
    type: DELETE_APPLICATION,
    applicationId,
  };
};

// thunk actions

export const thunkLoadApplications = () => async (dispatch) => {
  const response = await fetch("/api/applications");

  if (response.ok) {
    const applications = await response.json();
    dispatch(loadApplications(applications));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkCreateApplication = (newApplication) => async (dispatch) => {
  const response = await fetch("/api/applications", {
    method: "POST",
    body: newApplication,
  });

  if (response.ok) {
    const newApplication = await response.json();
    dispatch(createOrUpdateApplication(newApplication));
    return newApplication.id;
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

const thunkUpdateApplication =
  (updatedApplication, updatedApplicationId) => async (dispatch) => {
    const response = await fetch(`/api/applications/${updatedApplicationId}`, {
      method: "PUT",
      body: updatedApplication,
    });

    if (response.ok) {
      const updatedApplication = await response.json();
      dispatch(createOrUpdateApplication(updatedApplication));
      return updatedApplication.id;
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  };

export const thunkDeleteApplication =
  (deletedApplicationId) => async (dispatch) => {
    const response = await fetch(`/api/applications/${deletedApplicationId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(deleteApplication(deletedApplicationId));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  };

// reducer

const applicationsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_APPLICATIONS:
      return { ...state, ...action.applications };
    case CREATE_OR_UPDATE_APPLICATION:
      return { ...state, ...action.application };
    case DELETE_APPLICATION: {
      const { [action.applicationId]: _, ...newState } = state;
      return newState;
    }
    default:
      return state;
  }
};

export default applicationsReducer