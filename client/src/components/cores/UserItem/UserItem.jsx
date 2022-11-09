import React from "react";
import { getStatus } from "../../../utils/GetStatus";
import "./UserItem.scss";
import {GetTime} from "../../../utils/GetTime";

const UserItem = ({ user, handleOpenConversation }) => {
  
  return (
    <div
      className={"user-item " + getStatus(user.status)}
      onClick={() => handleOpenConversation(user)}
    >
      <div className="user-item-avatar">
        <img src={user?.avatar} alt="avatar" />
      </div>
      <div className="user-item-info">
        <h1 className="user-item-name">
          {user?.firstName + " " + user?.lastName}
        </h1>
        <p className="user-item-message">{ user?.lastMessage?.content}</p>
      </div>

      <div className="user-item-extra">
        <span>
          {GetTime(user?.lastMessage?.date)}
        </span>
        <span className="user-item-status"></span>
      </div>
    </div>
  );
};

export default UserItem;
