import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { CreateApplication } from "../ApplicationForm";
import ApplicationColumn from "./ApplicationColumn";
import * as applicationActions from "../../redux/applications";
import "./ApplicationTracker.css";

const ApplicationTracker = () => {
  const dispatch = useDispatch();

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

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const applicationId = active.id;

    const newStatus = over.id;

    await dispatch(
      applicationActions.thunkUpdateApplicationStatus(
        { application_status: newStatus },
        applicationId
      )
    );

    return;
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
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          {columns.map((id) => (
            <ApplicationColumn key={id} id={id} />
          ))}
        </DndContext>
      </section>
    </>
  );
};

export default ApplicationTracker;
