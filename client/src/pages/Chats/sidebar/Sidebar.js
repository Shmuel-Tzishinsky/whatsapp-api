import React, { useState } from "react";

import Header from "./Header";
import Search from "./Search";
import Chats from "./Chats";

import SidebarModal from "../../../components/SidebarModal";

import "./styles.scss";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { display } = useSelector((state) => state.chatScreen);
  const [showModal, setShowModal] = useState("");

  return (
    <aside className="sidebar" style={{ display: display && window.innerWidth < 768 ? "none" : "flex" }}>
      <div className="default">
        <Header showModal={setShowModal} />
        <Search />
        <Chats />
      </div>
      <SidebarModal showModal={showModal} setShowModal={setShowModal} />
      <SidebarModal showModal={showModal} setShowModal={setShowModal} />
      <SidebarModal showModal={showModal} setShowModal={setShowModal} />
      <SidebarModal showModal={showModal} setShowModal={setShowModal} />
    </aside>
  );
};

export default Sidebar;
