import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import OpenModalButton from "../OpenModalButton";
import { CreateApplication } from "../ApplicationForm";
import ApplicationColumn from "./ApplicationColumn";
import "./ApplicationTracker.css";

const ApplicationTracker = () => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const columns = [
    "Upcoming",
    "Submitted",
    "Interviewing",
    "Rejected",
    "Offered",
  ];

  const handleDragEnd = (event) => {
    const { active, over } = event;

    const application = active.data.current;

    console.log("APPLICATION", application);

    if (!over) return;

    const applicationId = active.id;
    const newStatus = over.id;
  };

  return (
    <>
      {/* <h1>Applications</h1>
      <OpenModalButton
        modalComponent={<CreateApplication />}
        buttonText="Start a New Application"
        id="create-application"
      /> */}
      <section className="application-columns">
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          {columns.map((id) => (
            <ApplicationColumn key={id} id={id} />
          ))}
        </DndContext>
      </section>
    </>
  );
};

export default ApplicationTracker;
