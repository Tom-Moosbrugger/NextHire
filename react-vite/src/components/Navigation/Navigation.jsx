import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PiHandshakeLight } from "react-icons/pi";
import * as sessionActions from "../../redux/session";
import "./Navigation.css";

function Navigation() {
  const [applications, setApplications] = useState(false);
  const [commonQuestions, setCommonQuestions] = useState(false);
  const [resumes, setResumes] = useState(false);
  const [coverLetters, setCoverLetters] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    const serverResponse = await dispatch(sessionActions.thunkLogout());

    if (serverResponse) {
      alert(serverResponse.server);
    } else {
      dispatch({ type: "applications/resetApplications" })

      dispatch({ type: "commonQuestions/resetCommonQuestions"})

      navigate("/");
    }
  };

  return (
    <nav className="nav-bar">
      <NavLink to="/applications">
        <PiHandshakeLight />
      </NavLink>
      <div className="middle-nav-bar">
        <NavLink
          to="/applications"
          onClick={() => {
            setApplications(true);
            setCommonQuestions(false);
            setResumes(false);
            setCoverLetters(false);
          }}
          className={applications ? "active" : ""}
        >
          Applications
        </NavLink>
        <NavLink
          to="/common-questions"
          onClick={() => {
            setApplications(false);
            setCommonQuestions(true);
            setResumes(false);
            setCoverLetters(false);
            return navigate("/applications");
          }}
          className={commonQuestions ? "active" : ""}
        >
          Common
          <br />
          Questions
        </NavLink>
        <NavLink
          to="/resumes"
          onClick={() => {
            setApplications(false);
            setCommonQuestions(false);
            setResumes(true);
            setCoverLetters(false);
          }}
          className={resumes ? "active" : ""}
        >
          Resumes
        </NavLink>
        <NavLink
          to="/cover-letters"
          onClick={() => {
            setApplications(false);
            setCommonQuestions(false);
            setResumes(false);
            setCoverLetters(true);
          }}
          className={coverLetters ? "active" : ""}
        >
          Cover
          <br />
          Letters
        </NavLink>
      </div>
      <button id="log-out" onClick={logout}>
        Log Out
      </button>
    </nav>
  );
}

export default Navigation;
