import { useState, useEffect } from "react";

const ApplicationForm = ({ application, applicationId, formType }) => {
  const header =
    formType === "createApplication" ? (
      <h1>Create a New Application</h1>
    ) : (
      <h1>Update Your Application</h1>
    );

  return (
    <article className="application-form">
      <header>
        {header}
        <p>fields marked with an asterisk(*) are required</p>
      </header>
      <form>
        <div className="application-form-input">
        </div>
        <div className="application-form-input">
        </div>
        <div className="application-form-input">
        </div>
        <div className="application-form-input">
        </div>
        <div className="application-form-input">
        </div>
        <div className="application-form-input">
        </div>
        <div className="application-form-input">
        </div>
        <div className="application-form-input">
        </div>
        <div className="application-form-input">
        </div>
        <div className="application-form-input">
        </div>
      </form>
    </article>
  );
};

export default ApplicationForm;

/*

lets plan this form!

step 1: create the form with controlled inputs
    create the form inputs and layout
    make sure to include error messages
    create slices of state for each input
        set initial values to prop values
        reset values based on form input

step 2: create validations
    set errors slice of state
    set a useEffect to monitor validations
    create an errors object
    test each input for validation errors
    set errors on error object
    set validation errors to errors slice of state
    set submitted slice of state
    display errors when user tries to submit

step 3: handle submission
    if there are validation errors, return
    submission will be a slightly different pattern:
    we need to create a new form instance and append the data that way
    we then send the form to the backend for validation
    determine if the form is create or edit, then submit the appropriate thunk
    if errors from the backend, display them
    if not, redirect to the appropriate location
*/
