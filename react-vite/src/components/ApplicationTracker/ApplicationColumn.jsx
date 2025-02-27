import { useSelector } from "react-redux";
import { useDroppable } from "@dnd-kit/core";
import ApplicationTile from "./ApplicationTile";
import * as applicationActions from "../../redux/applications";
import "./ApplicationColumn.css";

const ApplicationColumn = ({ id }) => {
  const applications = useSelector(applicationActions[id.toLowerCase()]);
  
  const { setNodeRef } = useDroppable({
    id: id
  });

  return (
    <div className="column" id={id}>
      <ul ref={setNodeRef}>
        {applications.length > 0 && applications.map(application => (
            <ApplicationTile key={application.id} application={application} />
        ))}
      </ul>
    </div>
  );
};

export default ApplicationColumn;
