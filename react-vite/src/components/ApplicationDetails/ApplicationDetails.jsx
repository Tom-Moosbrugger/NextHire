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

  if (!application) return <Loading />
  
  const handleClose = () => navigate("/applications")

  return (
    <article className="application-details">
      <header>
        <h1>
          <em>Application Details</em>
        </h1>
        <OpenModalButton
          modalComponent={<EditApplication />}
          buttonText="Update"
          id="edit-application"
        />
        <OpenModalButton
          modalComponent={<DeleteApplication />}
          buttonText="Delete"
          id="delete-application"
        />
        <TfiClose onClick={handleClose} id="close-application"/>
      </header>
      <section className="application-status">
        <h2>
          <em>Application Status</em>
        </h2>
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
      <section className="company-and-job">
        <div className="company-info">
          <h2>
            <em>Company Information</em>
          </h2>
          <p>
            <em>Company Name:</em> {application.companyName}
          </p>
          <div>
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
        <div className="job-info">
          <h2>
            <em>Job Information</em>
          </h2>
          <p>
            <em>Job Title:</em> {application.jobTitle}
          </p>
          <div>
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
      <section className="job-details">
        <h2>
          <em>Job Details</em>
        </h2>
        <p>{application.jobDetails}</p>
      </section>
      <section className="submission-details">
        <h2>
          <em>Submission Details</em>
        </h2>
        <p>{application.submissionDetails}</p>
      </section>
      <section className="application-date">
        <h2>
          <em>Application Deadline</em>
        </h2>
        <p>{application.applicationDeadline}</p>
      </section>
      <section className="application-materials">
        <h2>
          <em>Application Materials</em>
        </h2>
        <div>
          <p>
            <em>Resume: </em>
          </p>
          {application.resumeUrl && (
            <a target="_blank" rel="noreferrer" href={application.resumeUrl}>
              View Resume
            </a>
          )}
        </div>
        <div>
          <p>
            <em>Cover Letter: </em>
          </p>
          {application.coverLetterUrl && (
            <a target="_blank" rel="noreferrer" href={application.coverLetterUrl}>
              View Resume
            </a>
          )}
        </div>
      </section>
      <section className="application-date">
        <h2>
          <em>Date Submitted</em>
        </h2>
        <p>{application.dateSubmitted}</p>
      </section>
    </article>
  );
};

export default ApplicationDetails;
