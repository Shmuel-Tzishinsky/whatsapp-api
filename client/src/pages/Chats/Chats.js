import "./styles.scss";

import Sidebar from "./sidebar/Sidebar";
import Body from "./body/Body";

const Chats = () => {
  return (
    <div className="chat">
      <Sidebar />
      <Body />
    </div>
  );
};
export default Chats;
