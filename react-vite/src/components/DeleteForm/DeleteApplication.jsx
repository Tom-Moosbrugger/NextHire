import { useParams } from "react-router-dom";
import DeleteForm from "./DeleteForm";

const DeleteApplication = () => {
  const { applicationId } = useParams();

  return <DeleteForm formType="Application" resourceId={applicationId} />;
};

export default DeleteApplication;
