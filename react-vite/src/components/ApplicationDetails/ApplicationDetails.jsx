import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import { EditApplication } from "../ApplicationForm";
import { DeleteApplication } from "../DeleteForm";
import { TfiClose } from "react-icons/tfi";
import Loading from "../Loading";
import "./ApplicationDetails.css";

const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const application = useSelector((state) => state.applications[applicationId]);
  const applicationStatuses = [
    "Upcoming",
    "Submitted",
    "Interviewing",
    "Rejected",
    "Offered",
  ];
  const navigate = useNavigate();

  if (!application) return <Loading />;

  const handleClose = () => navigate("/applications");

  return (
    <article className="application-details" id={application.applicationStatus}>
      <TfiClose onClick={handleClose} id="close-application" />
      <header>
        <h1>Application Details</h1>
      </header>
      <section className="application-status">
        <h2>Application Status</h2>
        <div className="statuses-container">
          {applicationStatuses.map((status) => (
            <div key={status} className="status-container">
              <div
                id={
                  application.applicationStatus === status
                    ? `${status}-box`
                    : ""
                }
                className="checkbox"
              ></div>
              <p>{status}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="company-and-job-info">
        <div>
          <h2>Company Information</h2>
          <p>
            <em>Company Name:</em> {application.companyName}
          </p>
          <div className="application-link">
            <p>
              <em>Company Website:</em>
            </p>
            {application.companyWebsite && (
              <a
                target="_blank"
                rel="noreferrer"
                href={application.companyWebsite}
              >
                Visit Website
              </a>
            )}
          </div>
        </div>
        <div>
          <h2>Job Information</h2>
          <p>
            <em>Job Title:</em> {application.jobTitle}
          </p>
          <div className="application-link">
            <p>
              <em>Job Post:</em>
            </p>
            {application.companyWebsite && (
              <a target="_blank" rel="noreferrer" href={application.jobPostUrl}>
                Visit Website
              </a>
            )}
          </div>
        </div>
      </section>
      {/* <section className="job-info">
        <h2>Job Information</h2>
        <p>
          <em>Job Title:</em> {application.jobTitle}
        </p>
        <div className="application-link">
          <p>
            <em>Job Post:</em>
          </p>
          {application.companyWebsite && (
            <a target="_blank" rel="noreferrer" href={application.jobPostUrl}>
              Visit Website
            </a>
          )}
        </div>
      </section> */}
      <section className="job-details">
        <h2>Job Details</h2>
        <p>{application.jobDetails}</p>
      </section>
      <section className="submission-details">
        <h2>Submission Details</h2>
        <p>{application.submissionDetails}</p>
      </section>
      <section className="application-materials">
        <h2>Application Materials</h2>
        <div className="application-link">
          <p>
            <em>Resume: </em>
          </p>
          {application.resumeUrl && (
            <a target="_blank" rel="noreferrer" href={application.resumeUrl}>
              View Resume
            </a>
          )}
        </div>
        <div className="application-link">
          <p>
            <em>Cover Letter: </em>
          </p>
          {application.coverLetterUrl && (
            <a
              target="_blank"
              rel="noreferrer"
              href={application.coverLetterUrl}
            >
              View Cover Letter
            </a>
          )}
        </div>
      </section>
      <section className="application-dates">
        <h2>Submission Dates</h2>
        <div>
          <p>
            <em>Application Deadline:</em>
          </p>
          <p>{application.applicationDeadline}</p>
        </div>
        <div>
          <p>
            <em>Date Submitted:</em>
          </p>
          <p>{application.dateSubmitted}</p>
        </div>
      </section>
      <section className="application-buttons">
        <OpenModalButton
          modalComponent={<EditApplication />}
          buttonText="Update Application"
          id="edit-application"
        />
        <OpenModalButton
          modalComponent={<DeleteApplication />}
          buttonText="Delete Application"
          id="delete-application"
        />
      </section>
    </article>
  );
};

export default ApplicationDetails;
