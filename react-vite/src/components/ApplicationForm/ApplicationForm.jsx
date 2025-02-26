import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import ApplicationFormInput from "./ApplicationFormInput";
import ApplicationFormTextArea from "./ApplicationFormTextarea";
import ApplicationFormHeader from "./ApplicationFormHeader";
import ApplicationFormError from "./ApplicationFormError";
import { validateApplicationInputs } from "../../resources/helperFunctions";
import * as applicationActions from "../../redux/applications";
import "./ApplicationForm.css";

const ApplicationForm = ({ application, applicationId, formType }) => {
  const [applicationStatus, setApplicationStatus] = useState(
    application.applicationStatus
  );
  const [companyName, setCompanyName] = useState(application.companyName);
  const [companyWebsite, setCompanyWebsite] = useState(
    application.companyWebsite
  );
  const [jobTitle, setJobTitle] = useState(application.jobTitle);
  const [jobDetails, setJobDetails] = useState(application.jobDetails);
  const [jobPostUrl, setJobPostUrl] = useState(application.jobPostUrl);
  const [submissionDetails, setSubmissionDetails] = useState(
    application.submissionDetails
  );
  const [applicationDeadline, setApplicationDeadline] = useState(
    application.applicationDeadline
  );
  const [dateSubmitted, setDateSubmitted] = useState(application.dateSubmitted);
  const [coverLetter, setCoverLetter] = useState(null);
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const validationErrors = validateApplicationInputs(
      companyName,
      companyWebsite,
      jobTitle,
      jobPostUrl,
      applicationDeadline
    );

    setErrors(validationErrors);
  }, [companyName, companyWebsite, jobTitle, jobPostUrl, applicationDeadline]);

  const header =
    formType === "createApplication" ? (
      <h1>Create A New Application</h1>
    ) : (
      <h1>Update Your Application</h1>
    );

  const buttonText =
    formType === "createApplication"
      ? "Create Your Application"
      : "Update Your Application";

  const radioOptions = [
    "Upcoming",
    "Submitted",
    "Interviewing",
    "Rejected",
    "Offered",
  ];

  const setDummyApplicationData = () => {
    setCompanyName("Test Company");
    setCompanyWebsite("https://www.testcompany.com/");
    setJobTitle("Junior Software Engineer");
    setJobDetails("Test job details");
    setJobPostUrl("https://www.testcompany.com/job-post");
    setSubmissionDetails("Test submission details");
  };

  const handleRadioChange = (e) => setApplicationStatus(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // render errors, if any
    if (Object.values(errors).length) return setHasSubmitted(true);

    // create new form to send to backend
    const application = new FormData();

    application.append("application_status", applicationStatus);
    application.append("company_name", companyName);
    application.append("company_website", companyWebsite);
    application.append("job_title", jobTitle);
    application.append("job_details", jobDetails);
    application.append("job_post_url", jobPostUrl);
    application.append("submission_details", submissionDetails);
    application.append("application_deadline", applicationDeadline);
    application.append("resume", resume);
    application.append("cover_letter", coverLetter);
    if (dateSubmitted) application.append("date_submitted", dateSubmitted);

    if (formType === "createApplication") {
      const newApplication = await dispatch(
        applicationActions.thunkCreateApplication(application)
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors)
          return setErrors({
            serverError: "There was a server issue, please try again.",
          });
      });

      closeModal();

      navigate(`/applications/${Object.keys(newApplication)[0]}`);
    } else {
      const updatedApplication = await dispatch(
        applicationActions.thunkUpdateApplication(application, applicationId)
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors)
          return setErrors({
            serverError: "There was a server issue, please try again.",
          });
      });

      closeModal();

      navigate(`/applications/${Object.keys(updatedApplication)[0]}`);
    }
  };

  return (
    <article className="application-form">
      <header className="application-form-main-header">
        {header}
        <p>Fields marked with an asterisk* are required</p>
      </header>
      <form>
        <section>
          <ApplicationFormHeader
            h2text="Application Status"
            h3text="Please select an application status:"
          />
          <div className="application-form-radio">
            {radioOptions.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="application-status"
                  value={option}
                  checked={applicationStatus === option}
                  onChange={handleRadioChange}
                />
                {option}
              </label>
            ))}
          </div>
        </section>
        <section>
          <ApplicationFormHeader
            h2text="Application Details"
            h3text="Enter some basic information about your application:"
          />
          <ApplicationFormInput
            label="Company Name*"
            type="text"
            placeholder="Enter the name of the company you are applying to..."
            value={companyName}
            handleChange={(e) => setCompanyName(e.target.value)}
          />
          <ApplicationFormError
            hasSubmitted={hasSubmitted}
            error={errors.companyName}
          />
          <ApplicationFormInput
            label="Company Website"
            type="text"
            placeholder="Enter the company's website..."
            value={companyWebsite}
            handleChange={(e) => setCompanyWebsite(e.target.value)}
          />
          <ApplicationFormError
            hasSubmitted={hasSubmitted}
            error={errors.companyWebsite}
          />
          <ApplicationFormInput
            label="Job Title*"
            type="text"
            placeholder="Enter the title of the job you are applying for..."
            value={jobTitle}
            handleChange={(e) => setJobTitle(e.target.value)}
          />
          <ApplicationFormError
            hasSubmitted={hasSubmitted}
            error={errors.jobTitle}
          />
          <ApplicationFormInput
            label="Job Post Link"
            type="text"
            placeholder="Enter the url for the job post.."
            value={jobPostUrl}
            handleChange={(e) => setJobPostUrl(e.target.value)}
          />
          <ApplicationFormError
            hasSubmitted={hasSubmitted}
            error={errors.jobPostUrl}
          />
          <ApplicationFormTextArea
            label="Job Details"
            type="text"
            placeholder="Enter the details from the job post..."
            value={jobDetails}
            handleChange={(e) => setJobDetails(e.target.value)}
          />
          <ApplicationFormTextArea
            label="Submission Details"
            type="text"
            placeholder="Enter details about where and how to submit your application..."
            value={submissionDetails}
            handleChange={(e) => setSubmissionDetails(e.target.value)}
          />
          <ApplicationFormInput
            label="Application Deadline*"
            type="date"
            value={applicationDeadline}
            handleChange={(e) => setApplicationDeadline(e.target.value)}
          />
          <ApplicationFormError
            hasSubmitted={hasSubmitted}
            error={errors.applicationDeadline}
          />
        </section>
        <section>
          <ApplicationFormHeader
            h2text="Application Materials"
            h3text="Track your resume, cover letter, and submission date here:"
          />
          <ApplicationFormInput
            label="Resume"
            type="file"
            accept=".pdf"
            handleChange={(e) => setResume(e.target.files[0])}
          />
          <ApplicationFormInput
            label="Cover Letter"
            type="file"
            accept=".pdf"
            handleChange={(e) => setCoverLetter(e.target.files[0])}
          />
          <ApplicationFormInput
            label="Date Submitted"
            type="date"
            value={dateSubmitted}
            handleChange={(e) => setDateSubmitted(e.target.value)}
          />
        </section>
        <button onClick={handleSubmit}>{buttonText}</button>
      </form>
      <button onClick={setDummyApplicationData}>Set Dummy Data</button>
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
