import React from "react";
import { updateStatus } from "../../../api";
import { UserContext } from "../../../utils/UserContext";
import "./Status.scss";

const Status = ({ status, userStatus, icon }) => {
  let [dropDown, setDropDown] = React.useState(false);
  let {user,setUser} = React.useContext(UserContext);
  const update = (value)=>{
    updateStatus(user?._id,value);
    setUser({...user,status:{...user.status,value:value}});

  }
  return (
    <div className="status">
      <span
        style={{ backgroundColor: "var(--" + status + ")" }}
        className="dot"
      ></span>
      <h2>
        {userStatus && userStatus.customMessage
          ? userStatus.customMessage
          : status}
      </h2>
      {icon && (
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setDropDown(!dropDown)}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.43413 5.43413L9.82036 1.06287C10.0599 0.808383 10.0599 0.419162 9.82036 0.179641C9.58084 -0.0598802 9.17665 -0.0598802 8.93713 0.179641L5 4.11677L1.06287 0.179641C0.808383 -0.0598802 0.419162 -0.0598802 0.179641 0.179641C-0.0598802 0.419162 -0.0598802 0.808383 0.179641 1.06287L4.5509 5.43413C4.80539 5.67365 5.19461 5.67365 5.43413 5.43413Z"
            fill="#F2F6F7"
          />
        </svg>
      )}
      <div className={"status-dropdown" + (dropDown ? " active" : "")}>
        {dropDown && (
          <>
            <div onClick={()=>update(2)}>
              <span>online</span>
              <span style={{backgroundColor:"var(--online)"}} ></span>
            </div>
            <div onClick={()=>update(1)}>
              <span>busy</span>
              <span style={{backgroundColor:"var(--busy)"}} ></span>
            </div>
            <div onClick={()=>update(0)}>
              <span>offline</span>
              <span style={{backgroundColor:"var(--offline)"}} ></span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Status;
