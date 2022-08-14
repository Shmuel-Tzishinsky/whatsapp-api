import React from "react";

import { MdOutlineBlock, MdOutlineMyLocation, MdLocationPin, MdHeadphones } from "react-icons/md";
import { IoMdVideocam, IoMdMic } from "react-icons/io";
import { GoDeviceCamera } from "react-icons/go";
import { BiSticker } from "react-icons/bi";
import { FaUsers, FaUser } from "react-icons/fa";

export default function LastMessage(lastMessage) {
  if (!lastMessage?.length) return "";

  const { type, body, fromMe } = lastMessage[lastMessage?.length - 1 || 0];

  switch (type) {
    case "chat":
      return <div className="last-message-cont">{body}</div>;
    case "revoked":
      return (
        <div className="last-message-cont" style={{ color: "#898989" }}>
          <MdOutlineBlock style={{ fill: "#898989" }} /> {fromMe ? "you deleted this message" : "This message has been deleted"}
        </div>
      );
    case "video":
      return (
        <div className="last-message-cont">
          <IoMdVideocam style={{ fill: "#9b9b9b", fontSize: "1rem" }} /> <div style={{ direction: "rtl", display: "contents" }}>{body || type}</div>
        </div>
      );
    case "image":
      return (
        <div className="last-message-cont">
          <GoDeviceCamera style={{ fill: "#9b9b9b", fontSize: "1rem" }} /> <div style={{ direction: "rtl", display: "contents" }}>{body || type}</div>
        </div>
      );
    case "ptt":
      const time = lastMessage[0].duration || "0";
      return (
        <div className="last-message-cont">
          <IoMdMic style={{ fill: "#9b9b9b", fontSize: "1rem", borderRadius: "5px" }} />{" "}
          {`${Math.floor(time / 60)}:${String(time % 60).length === 1 ? `0${time % 60}` : time % 60}`}
        </div>
      );
    case "audio":
      return (
        <div className="last-message-cont">
          <MdHeadphones style={{ fill: "#9b9b9b", fontSize: "1rem" }} /> <div style={{ direction: "rtl", display: "contents" }}>{body || type}</div>
        </div>
      );
    case "location":
      return (
        <>
          {lastMessage[0]._data.isLive ? (
            <div className="last-message-cont">
              <MdOutlineMyLocation style={{ fill: "#9b9b9b", fontSize: "1rem" }} /> Real-time location
            </div>
          ) : (
            <div className="last-message-cont">
              <MdLocationPin style={{ fill: "#9b9b9b", fontSize: "1rem" }} /> {type}
            </div>
          )}
        </>
      );
    case "sticker":
      return (
        <div className="last-message-cont">
          <BiSticker style={{ fill: "#9b9b9b", fontSize: "1rem" }} /> {type}
        </div>
      );
    case "document":
      return (
        <div className="last-message-cont">
          <BiSticker style={{ fill: "#9b9b9b", fontSize: "1rem", borderRadius: "5px" }} />{" "}
          <div style={{ direction: "rtl", display: "contents" }}>{body || type}</div>
        </div>
      );
    case "vcard":
      return (
        <div className="last-message-cont">
          <FaUser style={{ fill: "#9b9b9b", fontSize: "1rem", borderRadius: "5px" }} /> {/\nFN:([^\nEND]+)/.exec(body)[1]}
        </div>
      );
    case "multi_vcard":
      return (
        <div className="last-message-cont">
          <FaUser style={{ fill: "#9b9b9b", fontSize: "0.8rem", borderRadius: "5px" }} />
          {lastMessage[0]?.vcardFormattedName}
          {/* {/\nFN:([^\nEND]+)/.exec(lastMessage[0].vCards[0])[1]} And more {lastMessage[0].vCards?.length} Other contacts */}
        </div>
      );
    case "groups_v4_invite":
      return (
        <div className="last-message-cont">
          <FaUsers style={{ fill: "#9b9b9b", fontSize: "1rem", borderRadius: "5px" }} /> Invite to group WhatsApp
        </div>
      );

    default:
      return type;
  }
}
