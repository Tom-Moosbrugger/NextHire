import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import { ModalProvider, Modal } from "../context/Modal";

export default function Layout() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!user) return navigate("/");

  return (
    <>
      <ModalProvider>
        <Navigation />
        <Modal />
        {isLoaded && <Outlet />}
      </ModalProvider>
    </>
  );
}
