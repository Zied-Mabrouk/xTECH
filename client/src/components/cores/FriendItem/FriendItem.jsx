import React from "react";
import "./FriendItem.scss";

const FriendItem = ({ friend }) => {
  const message =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.";
  return (
    <div className="friend-item">
        <div className="friend-item-avatar">
          <img src={friend?.avatar} alt="avatar" />
        </div>
        <div className="friend-item-info">
          <h1 className="friend-item-name">
            {friend?.firstName + " " + friend?.lastName}
          </h1>
          <p className="friend-item-message">{message}</p>
        </div>
        <div className="friend-item-extra">
          <span >21s</span>
          <span className="friend-item-status"></span>
        </div>
    </div>
  );
};

export default FriendItem;
