import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContactsData } from "../../actions/chat-contacts";
import { display } from "../../actions/chat-screen";

import { FaUserCircle } from "react-icons/fa";
import { MdOutlineExpandMore } from "react-icons/md";
import { TiPin } from "react-icons/ti";
import { IoMdVolumeOff } from "react-icons/io";

import "./styles.scss";
import LastMessage from "./LastMessage";
// import { numInMyContect } from "../MessageBox/Functions";
import { userSelectChat } from "../../socket/socketConnection";

const Contact = ({ id, name, index, avatar, lastMessage, timeLastMessage, pinned, isGroup, mute, unreadMessages, serialized }) => {
  const [hidden, setHidden] = useState(!!unreadMessages);
  const [loadMsgInThisChat, setLoadMsgInThisChat] = useState();
  const { chatList } = useSelector((state) => state.qrCode); //contactsList, clientInfo
  const dispatch = useDispatch();

  // const nameUserInGrup = lastMessage
  //   ? numInMyContect(
  //       contactsList,
  //       lastMessage[lastMessage?.length - 1]?.id?.participant?.user || lastMessage[lastMessage?.length - 1]?.id?.participant?.replace("@c.us", ""),
  //       clientInfo?.me?.user,
  //       "35 index"
  //     )
  //   : "";

  function handleClick() {
    const data = {
      id,
      name,
      index,
      avatar,
      lastMessage,
      timeLastMessage,
      pinned,
      isGroup,
      mute,
      unreadMessages,
      serialized,
    };

    dispatch(display());
    dispatch(setContactsData(data, chatList));

    // Emit only one time
    if (loadMsgInThisChat) return;
    // Emit in socket
    userSelectChat(data);
    setLoadMsgInThisChat(true);
    setHidden(false);
  }

  return (
    <div className="contacts__container" onClick={handleClick}>
      {avatar ? <img src={avatar} alt={name} className="contacts__img" /> : <FaUserCircle className="contacts__img" />}
      <div className="contacts__texts">
        <h3 className="texts__name">{name}</h3>
        <div className="texts__lastMessage">
          {isGroup && lastMessage?.length && <div style={{ marginRight: "5px" }}>{lastMessage[lastMessage?.length - 1]?.name || "!!!"}:</div>}
          {LastMessage(lastMessage)}
        </div>
      </div>
      <div className="contacts__details">
        <span className="details__time" style={{ color: hidden && "#06d755" }}>
          {timeLastMessage}
        </span>
        {pinned && <TiPin className="details__icon" />}
        {mute && <IoMdVolumeOff className="details__icon" />}
        {hidden && <div className="details__unreadMessage">{unreadMessages}</div>}
        <MdOutlineExpandMore className="details__icon options" />
      </div>
    </div>
  );
};

export default Contact;
