import { createSelector } from "reselect";

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
    return newApplication;
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    console.log(errorMessages);
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkUpdateApplication =
  (updatedApplication, updatedApplicationId) => async (dispatch) => {
    const response = await fetch(`/api/applications/${updatedApplicationId}`, {
      method: "PUT",
      body: updatedApplication,
    });

    if (response.ok) {
      const updatedApplication = await response.json();
      dispatch(createOrUpdateApplication(updatedApplication));
      return updatedApplication;
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  };

export const thunkUpdateApplicationStatus =
  (newStatus, updatedApplicationId) => async (dispatch) => {
    console.log(newStatus);

    const response = await fetch(`/api/applications/${updatedApplicationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStatus),
    });

    if (response.ok) {
      const updatedApplication = await response.json();
      return dispatch(createOrUpdateApplication(updatedApplication));
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

// selectors

const getApplicationState = (state) => state.applications;

// get all applications with status of "Upcoming"
export const upcoming = createSelector(
  [getApplicationState],
  (applicationState) =>
    Object.values(applicationState).filter((application) => {
      return application.applicationStatus === "Upcoming";
    })
);

// get all applications with status of "Submitted"
export const submitted = createSelector(
  [getApplicationState],
  (applicationState) =>
    Object.values(applicationState).filter((application) => {
      return application.applicationStatus === "Submitted";
    })
);

// get all applications with status of "Interviewing"
export const interviewing = createSelector(
  [getApplicationState],
  (applicationState) =>
    Object.values(applicationState).filter((application) => {
      return application.applicationStatus === "Interviewing";
    })
);

// get all applications with status of "Rejected"
export const rejected = createSelector(
  [getApplicationState],
  (applicationState) =>
    Object.values(applicationState).filter((application) => {
      return application.applicationStatus === "Rejected";
    })
);

// get all applications with status of "Rejected"
export const offered = createSelector(
  [getApplicationState],
  (applicationState) =>
    Object.values(applicationState).filter((application) => {
      return application.applicationStatus === "Rejected";
    })
);

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

export default applicationsReducer;
