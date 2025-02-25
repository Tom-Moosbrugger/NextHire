import ApplicationForm from "./ApplicationForm";

const CreateApplication = () => {
  const application = {
    application_status: "Upcoming",
    company_name: "",
    company_website: "",
    job_title: "",
    job_details: "",
    job_post_url: "",
    submission_details: "",
    application_deadline: "",
    cover_letter: null,
    resume: null,
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
