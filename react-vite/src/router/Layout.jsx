import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import { ModalProvider, Modal } from "../context/Modal";

export default function Layout() {
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
