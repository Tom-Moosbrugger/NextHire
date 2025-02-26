import OpenModalButton from "../OpenModalButton";
import { EditApplication } from "../ApplicationForm";
import { DeleteApplication } from "../DeleteForm";
import "./ApplicationDetails.css";

const ApplicationDetails = () => {
  return (
    <article className="application-details">
      <h1>Application Details</h1>
      <OpenModalButton
        modalComponent={<EditApplication />}
        buttonText="Update Your Application"
        id="edit-application"
      />
      <OpenModalButton
        modalComponent={<DeleteApplication />}
        buttonText="Delete Your Application"
        id="delete-application"
      />
    </article>
  );
};

export default ApplicationDetails;
