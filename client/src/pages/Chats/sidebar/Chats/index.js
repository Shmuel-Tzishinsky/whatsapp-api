import React from "react";

import Contact from "../../../../components/Contact/";

import { useSelector } from "react-redux";
import "./styles.scss";

import moment from "moment";

const dateOfLastMess = (time) => {
  if (time === null) {
    return null;
  }
  const today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const date = new Date();
  date.setTime(time + "000");
  let displayDate = moment(date).format("DD/MM/YYYY");
  if (today.toDateString() === date.toDateString()) {
    displayDate = moment(date).format("h:mm a");
  }
  if (date.toDateString() === yesterday.toDateString()) {
    displayDate = "yesterday";
  }

  return displayDate;
};

const SidebarChats = () => {
  const { chatList } = useSelector((state) => state.qrCode);

  return (
    <div className="sidebar__chats">
      {chatList.map(
        (
          {
            id,
            name,
            imageUrl,
            messages,
            timestamp,
            pinned,
            isMuted,
            unreadCount,
            isGroup,
          },
          i
        ) => (
          <Contact
            key={id.user}
            id={id.user}
            index={i}
            name={name}
            avatar={imageUrl || null}
            isGroup={isGroup}
            lastMessage={messages}
            timeLastMessage={dateOfLastMess(timestamp)}
            pinned={pinned}
            mute={isMuted}
            unreadMessages={unreadCount}
            serialized={id._serialized}
          />
        )
      )}
    </div>
  );
};

export default SidebarChats;
