import { useEffect } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import * as applicationActions from "../../redux/applications";
import "./ApplicationTracker.css";

const ApplicationTracker = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(applicationActions.thunkLoadApplications());
  }, [dispatch])

  return (
    <>
      <h1>Applications</h1>
      <button>create application</button>
    </>
  );
};

export default ApplicationTracker;
