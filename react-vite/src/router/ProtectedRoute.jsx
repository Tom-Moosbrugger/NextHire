import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../redux/session";

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return null;

  return user ? <Outlet /> : <Navigate to="/" replace />;
}
