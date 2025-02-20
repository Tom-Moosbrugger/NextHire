import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
