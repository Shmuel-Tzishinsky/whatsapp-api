import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import {
  MdBrightness6,
  MdOutlineWallpaper,
  MdOutlineBlock,
  MdHelp,
} from "react-icons/md";

import "./styles.scss";

const Settings = () => (
  <section className="settings">
    <div className="settings__profile">
      <div className="settings__picture">
        <FaUserCircle />
      </div>
      <div className="settings__data">
        <div className="settings__name">shron</div>
        <div className="settings__description">Washington Campos</div>
      </div>
    </div>
    <div className="settings__actions">
      <div className="settings__option">
        <IoMdNotifications className="settings__icon" />
        <div className="settings__text">Notifications</div>
      </div>
      <div className="settings__option">
        <MdBrightness6 className="settings__icon" />
        <div className="settings__text">Themes</div>
      </div>
      <div className="settings__option">
        <MdOutlineWallpaper className="settings__icon" />
        <div className="settings__text">Chat Wallpaper</div>
      </div>
      <div className="settings__option">
        <MdOutlineBlock className="settings__icon" />
        <div className="settings__text">Blocked</div>
      </div>
      <div className="settings__option">
        <MdHelp className="settings__icon" />
        <div className="settings__text">help</div>
      </div>
    </div>
  </section>
);

export default Settings;
