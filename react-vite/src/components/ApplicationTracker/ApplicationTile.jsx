import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const ApplicationTile = ({ application }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: application.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <li ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {application.companyName}
    </li>
  );
};

export default ApplicationTile;
