import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../redux/session";
import * as applicationActions from "../redux/applications";

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);


  // load user and applications back in the store on login and refresh
  useEffect(() => {
    dispatch(sessionActions.thunkAuthenticate())
      .then(() => {
        dispatch(applicationActions.thunkLoadApplications());
      })
      .finally(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return null;

  return user ? <Outlet /> : <Navigate to="/" replace />;
}
