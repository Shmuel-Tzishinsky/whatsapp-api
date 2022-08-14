import React from "react";

import "./styles.scss";

import * as lib from "./Functions";
import { useDispatch, useSelector } from "react-redux";
import { typeMedia } from "./TypeMedia";
import { openImg } from "../../actions/chat-contacts";
import LastMessage from "../Contact/LastMessage";

const MessageBox = ({ msg, fromMe, date, isGroup }) => {
  const dispatch = useDispatch();
  const { contactsList, clientInfo } = useSelector((state) => state.qrCode);

  const nameUser = lib.numInMyContect(contactsList, msg.id?.participant, clientInfo?.me?.user, "15 index.js");

  const colorForQquotedParticipant = lib.randomHSL();

  // toggle for open img
  const toggleMedia = (base) => {
    dispatch(openImg(base));
  };

  return (
    <div className="message" style={fromMe ? { justifyContent: "flex-end" } : { justifyContent: "flex-start" }}>
      <div
        className={`message__item ${msg.type === "sticker" && !msg._data?.quotedMsg ? "message_sticker_item" : ""}`}
        style={fromMe ? { backgroundColor: "#DCF8C6" } : { backgroundColor: "#FFFFFF" }}
      >
        <lib.TopContect {...{ msg, isGroup, nameUser }} />

        {msg._data.quotedMsg && (
          <div className="quoted_msg" style={{ borderRight: `3px solid ${colorForQquotedParticipant}` }}>
            <div className="message__name" style={{ color: colorForQquotedParticipant }}>
              {lib.numInMyContect(contactsList, msg._data.quotedParticipant.user, clientInfo?.me?.user, "35 index = messageBox")}
            </div>
            {msg._data?.quotedMsg && LastMessage([msg._data?.quotedMsg])}
            {msg?._data?.quotedMsg?.type === "chat" && msg?._data?.quotedMsg?.body?.length > 110 && "..."}
          </div>
        )}
        <div className="message__media">{typeMedia(msg.type, msg, toggleMedia)}</div>
        <div className="message__text">{lib.findUrl(msg.body)}</div>
        <div className={`message__date ${msg.type === "sticker" ? "message__date__sticker" : ""}`}>
          <span>{lib.dateOfLastMess(date)}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
