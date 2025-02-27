import {
  DragOverlay,
  closestCorners,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { CreateApplication } from "../ApplicationForm";
import ApplicationColumn from "./ApplicationColumn";
import ApplicationTile from "./ApplicationTile";
import * as applicationActions from "../../redux/applications";
import "./ApplicationTracker.css";

const ApplicationTracker = () => {
  const dispatch = useDispatch();
  const [activeApplication, setActiveApplication] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
        activationConstraint: {
            delay: 150,
            tolerance: 10
        }
    }),
    useSensor(TouchSensor, {
        activationConstraint: {
            delay: 150,
            tolerance: 10
        }
    }),
    useSensor(KeyboardSensor)
  );

  const columns = [
    "Upcoming",
    "Submitted",
    "Interviewing",
    "Rejected",
    "Offered",
  ];

  const handleDragStart = (event) => {
    setActiveApplication(event.active.data.current);
  };

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

    setActiveApplication(null);
  };

  return (
    <article className="application-tracker">
      <header>
        <OpenModalButton
          modalComponent={<CreateApplication />}
          buttonText="Create New Application"
          id="create-application"
        />
      </header>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <section className="application-columns">
          {columns.map((id) => (
            <div className="column-container">
              <h2>{id}</h2>
              <ApplicationColumn key={id} id={id} />
            </div>
          ))}
        </section>
        <DragOverlay adjustScale={false} dropAnimation={null}>
          {activeApplication ? (
            <ApplicationTile application={activeApplication} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </article>
  );
};

export default ApplicationTracker;
