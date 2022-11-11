import React from "react";
import { GetMessageType } from "../../../utils/GetMessageType";
import ImageMessage from "./ImageMessage";
import "./Message.scss";

const Message = ({ message, right, user,handleOpenBar }) => {
  return (
    <div className={"message" + (right ? " right":"")}>
      {user ? <img onClick={()=>handleOpenBar(user)} src={user.avatar} alt="" className="message-sender" /> : <span className="seperator"></span>}
      <div className={"message-content message-content-"+GetMessageType(message.type)} >
        {
        message.type === 0 ? <>{message.content}</> 
        : (message.type ===1 ? <ImageMessage images={message.content} /> : <></>)
      }
        </div>
    </div>
  );
};

export default Message;
