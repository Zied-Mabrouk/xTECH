import React from "react";
import { GetMessageType } from "../../../utils/GetMessageType";
import ImageMessage from "./ImageMessage";
import "./Message.scss";

const Message = ({
  message,
  right,
  user,
  handleOpenBar,
  setCarousel,
  setContextMenu,
  displayAvatar
}) => {
  const type = GetMessageType(message.type);
  return (
    <div className={"message" + (right ? " right" : "") + (" message-" + type)}>
      {displayAvatar ? (
        <img
          onClick={() => handleOpenBar(user)}
          src={user.avatar}
          alt=""
          className="message-sender"
        />
      ) : (
        <span className="seperator"></span>
      )}
      <div
        className={"message-content message-content-" + type}
        onContextMenu={(e) =>
          setContextMenu((prev) => {
            if (user && prev.user === user._id)
              return {
                ...prev,
                selected: message._id,
                open: true,
                styles: {
                  top: e.clientY,
                  left: e.clientX,
                },
              };
            return { ...prev, open: false };
          })
        }
      >
        {message.type === 0 ? (
          <>{message.content}</>
        ) : message.type === 1 ? (
          <ImageMessage setCarousel={setCarousel} images={message.content} />
        ) : (
          <>
             <audio controls src={message.content} />
          </>
        )}
      </div>
    </div>
  );
};

export default Message;
