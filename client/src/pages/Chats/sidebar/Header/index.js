import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { div, Avatar } from "@mui/icons-material";
// import { DonutLarge, Chat, MoreVert } from "@material-ui/icons";
import { MdDonutLarge } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import "./styles.scss";
import { useSelector } from "react-redux";

const SidebarHeader = ({ showModal }) => {
  const [openDropDown, setOpenDropDown] = useState(false);

  const { clientInfo } = useSelector((state) => state.qrCode);

  return (
    <header className="sidebar__header">
      <div
        className="sidebar__avatar sidebar__options"
        onClick={() => showModal("Profile")}
      >
        {clientInfo.imgClient ? (
          <img className="options__item" src={clientInfo.imgClient} alt="" />
        ) : (
          <FaUserCircle className="options__item" />
        )}
      </div>
      <div className="sidebar__options">
        <div className="chat-btn">
          <MdDonutLarge className="options__item" />
        </div>
        <div className="chat-btn" onClick={() => showModal("New chat")}>
          <BsFillChatLeftTextFill className="options__item" />
        </div>
        <div
          className="chat-btn"
          onClick={() => setOpenDropDown(!openDropDown)}
        >
          <FiMoreVertical className="options__item" />
          <div
            className="sidebar__dropdown"
            style={openDropDown ? { display: "block" } : { display: "none" }}
          >
            <div
              className="sidebar__action"
              onClick={() => showModal("New group")}
            >
              New group
            </div>
            <div
              className="sidebar__action"
              onClick={() => showModal("Profile")}
            >
              Profile
            </div>
            <div
              className="sidebar__action"
              onClick={() => showModal("Settings")}
            >
              Settings
            </div>
            <Link to="/" style={{ textDecoration: "none", color: "#585858" }}>
              <div className="sidebar__action">Log out</div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SidebarHeader;
