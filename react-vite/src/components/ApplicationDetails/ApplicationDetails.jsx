import OpenModalButton from "../OpenModalButton";
import { EditApplication } from "../ApplicationForm";

const ApplicationDetails = () => {
  return (
    <>
      <h1>Application Details</h1>
      <OpenModalButton
        modalComponent={<EditApplication />}
        buttonText="Update Your Application"
        id="edit-application"
      />
    </>
  );
};

export default ApplicationDetails;
