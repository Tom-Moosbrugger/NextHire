import { useDraggable } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";
import { CSS } from "@dnd-kit/utilities";
import "./ApplicationTile.css";

const ApplicationTile = ({ application }) => {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: application.id,
    data: application,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <li
      onClick={() => navigate(`/applications/${application.id}`)}
      className="application-tile"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {application.companyName.length > 12
        ? `${application.companyName.slice(0, 11)}...`
        : application.companyName}
    </li>
  );
};

export default ApplicationTile;
