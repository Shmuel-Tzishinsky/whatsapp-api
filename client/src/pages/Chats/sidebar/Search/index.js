import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CgSortAz } from "react-icons/cg";

import "./styles.scss";

const SidebarSearch = () => (
  <div className="sidebar__search">
    <div className="chat-btn" style={{ height: "50px" }}>
      <CgSortAz className="body__item" />
    </div>
    <div className="search__area">
      <AiOutlineSearch className="search__icon" />
      <input
        type="text"
        className="search__field"
        placeholder="Search or start new chat"
      />
    </div>
  </div>
);

export default SidebarSearch;
