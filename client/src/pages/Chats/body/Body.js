import InitialScreen from "./InitialScreen/index";
import Chat from "./Content/index";

import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { openImg } from "../../../actions/chat-contacts";

const Body = () => {
  const { display } = useSelector((state) => state.chatScreen);
  const { openMedia } = useSelector((state) => state.chatContacts);

  const dispatch = useDispatch();

  // close img in msg contect
  const closeImg = () => {
    dispatch(openImg(""));
  };

  return (
    <>
      {display ? <Chat /> : <InitialScreen displayChatScreen={display} />}

      {openMedia && (
        <div className="open_media" onClick={closeImg}>
          <img src={openMedia} type={openMedia} className="media" />
        </div>
      )}
    </>
  );
};

export default Body;
