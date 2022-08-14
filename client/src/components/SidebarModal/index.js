import React from "react";
import { BiArrowBack } from "react-icons/bi";

import Profile from "./Profile";
import NewChat from "./NewChat";
import NewGroup from "./NewGroup";
import Settings from "./Settings";

import "./styles.scss";

const SidebarModal = ({ showModal, setShowModal }) => (
  <div className="modal" style={{ left: showModal !== "" ? 0 : -768 }}>
    <header className="modal__header">
      <div className="modal__arrow " onClick={() => setShowModal("")}>
        <BiArrowBack />
      </div>

      <span className="modal__title">{showModal}</span>
    </header>
    {showModal === "Profile" && <Profile />}
    {showModal === "New chat" && <NewChat setShowModal={setShowModal} />}
    {showModal === "New group" && <NewGroup />}
    {showModal === "Settings" && <Settings />}
  </div>
);

export default SidebarModal;
