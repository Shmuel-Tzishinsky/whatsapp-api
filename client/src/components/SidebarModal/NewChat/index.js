import { MdGroupAdd } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";

import FindContacts from "../FindContacts";

import "./styles.scss";

const NewChat = ({ setShowModal }) => (
  <section className="newChat">
    <div className="newChat__search">
      <div className="newChat__search-area">
        <div>
          <AiOutlineSearch className="newChat__icon--search" />
        </div>
        <input
          type="text"
          placeholder="Search contacts"
          className="newChat__input"
        />
      </div>
    </div>
    <div
      className="newChat__newGroup-add"
      onClick={() => setShowModal("New group")}
    >
      <div className="newChat__icon--group-add">
        <MdGroupAdd />
      </div>
      <div className="newChat__text">New Group</div>
    </div>
    <FindContacts />
  </section>
);

export default NewChat;
