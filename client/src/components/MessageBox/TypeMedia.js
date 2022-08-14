import { MdOutlineBlock } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { GiPlainArrow } from "react-icons/gi";
import { MdError } from "react-icons/md";
import { bytesToSize } from "./Functions";
import { useState } from "react";

import Loadding from "../Loadding/LoadChst";
import { downloadMedia } from "../../socket/socketConnection";
import { useSelector } from "react-redux";
const DownloadingMedia = ({ msg, error }) => {
  const { chatID } = useSelector((state) => state.chatContacts);

  const [loadMedia, setLoadMedia] = useState();

  const downloadingMedia = () => {
    if (!loadMedia && !error) {
      setLoadMedia(!0);
      downloadMedia(chatID, msg.id.id);
    }
  };

  return (
    <div className="download-media" onClick={downloadingMedia}>
      <div className="download-media-btn">
        {loadMedia && !error ? (
          <Loadding bg={"#0000009c"} />
        ) : (
          <div className="size">
            <span> {error ? "Error" : bytesToSize(msg._data.size)} </span>
            <span className="icon"> {error ? <MdError /> : <GiPlainArrow />}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const typeMedia = (type, msg, toggleMedia) => {
  // console.log("type: ", type, "msg: ", msg);
  switch (type) {
    case "chat":
      return;
    case "revoked":
      // console.log(type, msg);
      return (
        <p style={{ color: "#898989" }}>
          <MdOutlineBlock style={{ fill: "#898989" }} /> This message has been deleted
        </p>
      );
    case "video":
      return (
        <div className="cont__media" style={{ maxHeight: "fit-content" }}>
          {msg.media?.mimetype ? (
            <video controls className="media">
              <source src={`data:${msg?.media?.mimetype};base64, ${msg?.media?.data}`} type={msg?.media?.mimetype} />
            </video>
          ) : (
            <>
              <img src={`data:${msg?._data.mimetype};base64, ${msg?._data.body}`} type={msg?.media?.mimetype} alt="" />
              <DownloadingMedia msg={msg} error={msg?.media?.error} />
            </>
          )}
        </div>
      );

    case "image":
      return (
        <div className="cont__media">
          {msg.media?.mimetype ? (
            <img
              src={`data:${msg?.media.mimetype};base64, ${msg?.media?.data}`}
              type={msg?.media?.mimetype}
              style={{ cursor: msg?.media?.mimetype ? "pointer" : "none" }}
              onClick={() => {
                msg.media?.mimetype && toggleMedia(`data:${msg?.media?.mimetype};base64, ${msg?.media?.data}`);
              }}
              alt=""
            />
          ) : (
            <>
              <img src={`data:${msg?._data.mimetype};base64, ${msg?._data.body}`} alt="" />
              <DownloadingMedia msg={msg} error={msg?.media?.error} />
            </>
          )}
        </div>
      );
    case "ptt":
      return (
        <audio controls className="media" style={{ minWidth: "200px" }}>
          <source src={`data:${msg.media?.mimetype};base64, ${msg.media?.data}`} type={msg.media?.mimetype} />
          <source src="horse.mp3" type="audio/mpeg" />
        </audio>
      );
    case "audio":
      return (
        <audio controls className="media" style={{ minWidth: "200px" }}>
          <source src={`data:${msg.media?.mimetype};base64, ${msg.media?.data}`} type={msg.media?.mimetype} />
          <source src="horse.mp3" type="audio/mpeg" />
        </audio>
      );
    case "location":
      return (
        <p style={{ color: "#898989" }}>
          <AiOutlineWarning
            style={{
              fill: "rgb(255 152 0 / 79%)",
              marginTop: "3px",
              fontSize: " 1rem",
            }}
          />
          The attachment is not supported in this app
        </p>
      );
    case "sticker":
      return <img src={`data:${msg.media?.mimetype};base64, ${msg.media?.data}`} type={msg.media?.mimetype} className="media" alt="" />;

    case "document":
      return (
        <p style={{ color: "#898989" }}>
          <AiOutlineWarning
            style={{
              fill: "rgb(255 152 0 / 79%)",
              marginTop: "3px",
              fontSize: " 1rem",
            }}
          />
          The attachment is not supported in this app
        </p>
      );

    case "vcard":
      return <p style={{ color: "#898989" }}>התקבל איש קשר</p>;
    case "multi_vcard":
      return (
        <p style={{ display: "block" }}>
          <p>{msg._data.vcardFormattedName}</p>
          {msg?._data.vcardList.map((vc) => (
            <>
              <p style={{ color: "#898989" }}>{vc?.displayName}</p>
              {/* <p>{vc?.vcard}</p> */}
            </>
          ))}
        </p>
      );
    case "groups_v4_invite":
      return <p style={{ color: "#898989" }}>The attachment is not supported in this app</p>;

    default:
      return (
        <p style={{ color: "#898989" }}>
          <AiOutlineWarning
            style={{
              fill: "rgb(255 152 0 / 79%)",
              marginTop: "3px",
              fontSize: " 1rem",
            }}
          />
          The attachment is not supported in this app
        </p>
      );
  }
};
