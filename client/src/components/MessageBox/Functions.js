import moment from "moment";
import { RiShareForwardFill } from "react-icons/ri";

// Add href for links in message
export const findUrl = (body) => {
  const htmlFormat = [
    { symbol: "*", tag: "b" },
    { symbol: "_", tag: "em" },
    { symbol: "~", tag: "del" },
    { symbol: "`", tag: "code" },
  ];
  // \n to <br/> tag
  body = body.replace(/\n/g, "<br/>");

  // link to <a> tag
  const urlRegex = new RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  );
  const links = body.match(urlRegex);
  if (links)
    for (let i = 0; i < links.length; i++) {
      body = body.replace(
        links[i],
        '<a style="text-align:left;word-break: break-all;text-decoration: none;" target="_blank" href="' + links[i] + '">' + links[i] + "</a>"
      );
    }

  // htmlFormat - (* = <b> || _ = <em> || ~ = <del> || ` = <code> )
  htmlFormat.forEach(({ symbol, tag }) => {
    if (!body) return;

    const regex = new RegExp(`\\${symbol}([^${symbol}]*)\\${symbol}`, "gm");
    const match = body.match(regex);
    if (!match) return;

    match.forEach((m) => {
      let formatted = m;
      for (let i = 0; i < 2; i++) {
        formatted = formatted.replace(symbol, `<${i > 0 ? "/" : ""}${tag}>`);
      }
      body = body.replace(m, formatted);
    });
  });

  return <span dangerouslySetInnerHTML={{ __html: body }} />;
};

// Add date in format on message
export const dateOfLastMess = (time) => {
  if (time === null) {
    return null;
  }
  const today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const date = new Date();
  date.setTime(time + "000");
  let displayDate = moment(date).format("DD/MM/YYYY");

  displayDate = moment(date).format("h:mm a");

  return displayDate;
};

// Random color ffor name in message
export const randomHSL = () => {
  return `hsla(${360 * Math.random()},90%,40%,1)`;
};

// Data on top msg
export const TopContect = ({ msg, isGroup, nameUser }) =>
  isGroup && nameUser !== "You" ? (
    <div className={`message__name ${msg?.type === "sticker" ? "message__name__sticker__cont" : ""}`} style={{ color: randomHSL() }}>
      <div style={{ float: "right" }} className={`${msg?.type === "sticker" ? "message__name__sticker" : ""}`}>
        {nameUser}
      </div>

      {!nameUser?.name && msg._data?.notifyName && (
        <div className="notify-name" style={{ float: "left" }}>
          ~{msg._data?.notifyName || ""}
        </div>
      )}
    </div>
  ) : (
    msg?.isForwarded && (
      <div className="message__transferred">
        {msg?.forwardingScore > 1 ? ` transferred ${msg?.forwardingScore} times ` : ` transferred `}
        <RiShareForwardFill />
      </div>
    )
  );

// Find if this number is in my contect
export const numInMyContect = (list, query, numClient, e) => {
  // console.log(e);
  if (numClient === query) return "You";

  if (!query) return "";
  if (typeof query !== "string") {
    query = query.user;
  }

  const filt = list?.filter((user) => user?.number === query)[0];

  return (
    filt?.name ||
    (query?.substring(0, 3) === "972" ? query?.replace("972", 0) : `+${query}`) ||
    (filt.number.substring(0, 3) === "972" ? filt.numberery.replace("972", 0) : `+${filt.number}`)
  );
};

export function bytesToSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (bytes === 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]} `;
}
