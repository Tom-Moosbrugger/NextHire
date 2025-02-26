import ApplicationForm from "./ApplicationForm";

const CreateApplication = () => {
  const application = {
    applicationStatus: "Upcoming",
    companyName: "",
    companyWebsite: "",
    jobTitle: "",
    jobDetails: "",
    jobPostUrl: "",
    submissionDetails: "",
    applicationDeadline: "",
    dateSubmitted: null,
    resumeUrl: null,
    coverLetterUrl: null,
  };

  return (
    <ApplicationForm
      application={application}
      applicationId={null}
      formType="createApplication"
    />
  );
};

export default CreateApplication;
