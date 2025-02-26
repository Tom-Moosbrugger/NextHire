import OpenModalButton from "../OpenModalButton";
import { CreateApplication } from "../ApplicationForm";
import "./ApplicationTracker.css";

const ApplicationTracker = () => {
  return (
    <>
      <h1>Applications</h1>
      <OpenModalButton
        modalComponent={<CreateApplication />}
        buttonText="Start a New Application"
        id="create-application"
      />
    </>
  );
};

export default ApplicationTracker;
