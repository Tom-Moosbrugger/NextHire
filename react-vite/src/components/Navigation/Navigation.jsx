import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PiHandshakeLight } from "react-icons/pi";
import * as sessionActions from "../../redux/session";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    const serverResponse = await dispatch(sessionActions.thunkLogout());

    if (serverResponse) {
      alert(serverResponse.server);
    } else {
      return navigate("/");
    }
  };

  return (
    <nav className="nav-bar">
      <NavLink to="/home">
        <PiHandshakeLight />
      </NavLink>
      <div className="middle-nav-bar">
      </div>
      <button id="log-out" onClick={logout}>
        Log Out
      </button>
    </nav>
  );
}

export default Navigation;
