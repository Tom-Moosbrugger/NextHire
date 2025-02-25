import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation/Navigation";
import { ModalProvider, Modal } from "../context/Modal";

export default function Layout() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!user) return navigate("/");
  }, [user, navigate])

  return (
    <>
      <ModalProvider>
        <Navigation />
        <Modal />
        <Outlet />
      </ModalProvider>
    </>
  );
}
