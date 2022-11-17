import React from "react";
import { getStatus } from "../../../utils/GetStatus";
import "./UserItem.scss";
import {GetTime} from "../../../utils/GetTime";

const UserItem = ({ user, handleOpenConversation,active }) => {
  const status = getStatus(user.status.value);
  const name = user?.firstName + " " + user?.lastName;
  return (
    <div
      className={"user-item"+(active?" user-time-active":"")}
      onClick={() => handleOpenConversation(user)}
    >
      <div className={"user-item-group"}>
      <div className="user-item-avatar">
        <img src={user?.avatar} alt="avatar" style={{borderColor:"var(--"+status+")"}} />
      </div>
      <div className="user-item-info">
        <h1 className="user-item-name">
          {name}
        </h1>
        {user?.lastMessage && 
        <p className="user-item-message">{ user.lastMessage.type ===0 ?user?.lastMessage?.content :
        (user.lastMessage.from===user._id? name:"You")+" sent "+(user.lastMessage.type === 1? "an image": "a vocal message")}</p>}
      </div>
      </div>
      <div className="user-item-extra">
        <div className="user-item-status" style={{backgroundColor : "var(--"+status+")"}}></div>
        {
          user && user.lastMessage &&
          <span>
          {GetTime(user.lastMessage.date)}
        </span>
        }
      </div>
    </div>
  );
};

export default UserItem;
