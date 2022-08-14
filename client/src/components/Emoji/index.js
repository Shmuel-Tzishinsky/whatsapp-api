import { useState } from "react";
import Picker from "emoji-picker-react";
import { MdOutlineInsertEmoticon } from "react-icons/md";

function EmojiPicker({ setChosenEmoji }) {
  const [open, setOpen] = useState(!1);

  const onEmojiClick = (e, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <>
      {open && <Picker onEmojiClick={onEmojiClick} disableSearchBar={true} />}
      <MdOutlineInsertEmoticon
        className="body__item"
        onClick={() => setOpen(!open)}
      />
    </>
  );
}

export default EmojiPicker;
