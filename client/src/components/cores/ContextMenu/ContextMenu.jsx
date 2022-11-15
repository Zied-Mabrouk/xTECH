import React from "react";
import { removeMessage } from "../../../api";
import "./ContextMenu.scss";

const ContextMenu = ({
  contextMenu,
  setContextMenu,
  setConversation,
  setList,
}) => {
  const handleRemoveMessage = () => {
    removeMessage(contextMenu.selected);
    setContextMenu((prev) => ({ ...prev, selected: null, open: false }));

    setConversation((prev) => {
      const newConversation = {
        ...prev,
        messages: prev.messages.filter(
          (message) => message._id !== contextMenu.selected
        ),
      };
      const length =newConversation.messages.length;
      setList((prevList) =>
        prevList.map((friend) =>
          friend._id === prev.friend._id
            ? { ...friend, lastMessage: (length>0 ?newConversation.messages[length-1]:"") }
            : friend
        )
      );
      return newConversation;
    });
  };
  return (
    <div className="context-menu" style={contextMenu.styles}>
      <span onClick={handleRemoveMessage}>Delete message</span>
    </div>
  );
};

export default ContextMenu;
