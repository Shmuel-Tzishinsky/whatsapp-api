import React, { useState, useEffect, useRef } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import { FiMoreVertical } from "react-icons/fi";
import { BiChevronLeft } from "react-icons/bi";
import { BsMic } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

import MessageBox from "../../../../components/MessageBox";
import { notDisplay } from "../../../../actions/chat-screen";

import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import LoadChst from "../../../../components/Loadding/LoadChst";
import EmojiPicker from "../../../../components/Emoji";
import { sendMessage } from "../../../../socket/socketConnection";

const BodyChat = () => {
  const dispatch = useDispatch();
  const { avatar, id, index, name, isGroup } = useSelector((state) => state.chatContacts);

  const { chatList } = useSelector((state) => state.qrCode);

  const [listOfMessages, setListOfMessages] = useState([]);
  const [loadMsgInThisChat, setLoadMsgInThisChat] = useState();
  const [text, setText] = useState("");

  const body = useRef(null);
  const thisChat = chatList[index].messages;

  useEffect(() => {
    const findNewMessage = chatList.filter((u) => u.id.user === id)[0];

    setListOfMessages(findNewMessage.messages);
    setLoadMsgInThisChat(findNewMessage.loadAllMessage);

    return () => {
      setListOfMessages([]);
    };
  }, [thisChat, chatList, id, loadMsgInThisChat]);

  useEffect(() => {
    if (body.current && body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
    }
  }, [avatar, listOfMessages, body]);

  function handleClick() {
    dispatch(notDisplay());
  }

  function handleSendMessage(e) {
    e.preventDefault();
    // Emit message in socket (only text)
    sendMessage(`${id}@${isGroup ? "g" : "c"}.us`, text);
    setText("");
  }

  function setChosenEmoji(emoji) {
    // console.log("emoji", emoji.emoji);
    setText(text + emoji.emoji);
  }

  return (
    <div className="body__chat">
      <header className="body__header">
        <div className="body__info">
          <BiChevronLeft className="body__arrow-back" onClick={handleClick} />
          {avatar ? <img src={avatar} alt={name} className="body__profile-picture" /> : <FaUserCircle className="body__profile-picture" />}
          <div className="body__texts">
            <h2 className="body__name">{name}</h2>
            <span className="body__lastSeen">This option is not available</span>
          </div>
        </div>
        <div className="body__options">
          <div className="chat-btn">
            <AiOutlineSearch className="body__item" />
          </div>

          <div className="chat-btn">
            <FiMoreVertical className="body__item" />
          </div>
        </div>
      </header>
      <section ref={body} className="body__wallpaper">
        <div className="system-notice">
          <span> Use WhatsApp on your phone to see older chat messages.</span>
        </div>
        {!loadMsgInThisChat && <LoadChst bg={"white"} />}
        {listOfMessages?.map((msg, i) => (
          <MessageBox key={i} msg={msg} fromMe={msg.fromMe} date={msg.timestamp} isGroup={isGroup} />
        ))}
      </section>

      <form onSubmit={handleSendMessage} className="body__text-area">
        <div className="chat-btn">
          <EmojiPicker setChosenEmoji={setChosenEmoji} />
        </div>
        <div className="chat-btn">
          <ImAttachment className="body__item" />
        </div>
        <input value={text} type="text" placeholder="Type a message" className="body__field" onChange={(e) => setText(e.target.value)} />
        {!text ? (
          <div className="chat-btn">
            <BsMic className="body__item" />
          </div>
        ) : (
          <button className="chat-btn" type="submit">
            <IoMdSend className="body__item" />
          </button>
        )}
      </form>
    </div>
  );
};

export default BodyChat;
