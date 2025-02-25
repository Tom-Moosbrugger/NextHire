import ApplicationForm from "./ApplicationForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditApplication = () => {
  const { applicationId } = useParams();
  const application = useSelector((state) => state.applications[applicationId]);

  if (!application) return <h2>Loading...</h2>;

  return (
    <ApplicationForm
      application={application}
      applicationId={applicationId}
      formType="editApplication"
    />
  );
};

export default EditApplication;