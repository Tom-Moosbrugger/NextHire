import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import ApplicationForm from "./ApplicationForm";

const EditApplication = () => {
  const { applicationId } = useParams();
  const application = useSelector((state) => state.applications[applicationId]);

  if (!application) return <Loading />

  console.log(application)

  return (
    <ApplicationForm
      application={application}
      applicationId={applicationId}
      formType="editApplication"
    />
  );
};

export default EditApplication;