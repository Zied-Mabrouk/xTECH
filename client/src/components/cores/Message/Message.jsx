import React from "react";
import { GetMessageType } from "../../../utils/GetMessageType";
import ImageMessage from "./ImageMessage";
import "./Message.scss";

const Message = ({ message, right, user,handleOpenBar,setCarousel }) => {
 
  const type = GetMessageType(message.type);
  return (
    <div className={"message" + (right ? " right":"")+(" message-"+type)}>
      {user ? <img onClick={()=>handleOpenBar(user)} src={user.avatar} alt="" className="message-sender" /> : <span className="seperator"></span>}
      <div className={"message-content message-content-"+type} >
        {
        message.type === 0 ? <>{message.content}</> 
        : (message.type ===1 ? <ImageMessage setCarousel={setCarousel} images={message.content} /> : <></>)
      }
        </div>
    </div>
  );
};

export default Message;
