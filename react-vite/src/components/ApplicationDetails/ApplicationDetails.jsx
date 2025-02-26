import OpenModalButton from "../OpenModalButton";
import { EditApplication } from "../ApplicationForm";

const ApplicationDetails = () => {
  console.log("\n\n");
  console.log("APPLICATION DETAILS");
  console.log("\n\n");
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
