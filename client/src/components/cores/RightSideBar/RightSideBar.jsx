import React from "react";
import { getStatus } from "../../../utils/GetStatus";
import Status from "../Status/Status";
import "./RightSideBar.scss";

const RightSideBar = ({ handleOpenBar, contact, conversation,setCarousel}) => {
  const status = getStatus(contact?.status?.value);
  return (
    <>
      {contact && (
        <>
          <div className="right-sidebar-header">
            <h1>Contact Info</h1>
            <img src={contact.avatar} alt="" />
            <div className="right-sidebar-header-info">
              <h1>{contact.firstName + " " + contact.lastName}</h1>
              <h2> {contact.role} </h2>
              <Status status={status} userStatus={contact.status} />
            </div>
          </div>
          <div className="right-sidebar-media">
            <h1>Media</h1>
            <div className="right-sidebar-media-content">
              {conversation?.messages
                ?.filter((m) => m.type === 1)
                .map((m, index) =>
                  m.content.map((msg,key) => <img src={msg} onClick={()=>setCarousel({open:true,selected:msg})} alt="" key={index+"-"+key} />)
                )}
            </div>
          </div>
        </>
      )}

      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleOpenBar}
        className={"toggler"}
      >
        <circle cx="12" cy="12" r="12" fill="#6588DE" />
        <path
          d="M15.3904 8.07691C15.5122 8.12768 15.6228 8.20207 15.7158 8.2958C15.8095 8.38876 15.8839 8.49936 15.9347 8.62122C15.9855 8.74308 16.0116 8.87379 16.0116 9.0058C16.0116 9.13781 15.9855 9.26852 15.9347 9.39038C15.8839 9.51223 15.8095 9.62284 15.7158 9.7158L13.4158 12.0058L15.7158 14.2958C15.8095 14.3888 15.8839 14.4994 15.9347 14.6212C15.9855 14.7431 16.0116 14.8738 16.0116 15.0058C16.0116 15.1378 15.9855 15.2685 15.9347 15.3904C15.8839 15.5122 15.8095 15.6228 15.7158 15.7158C15.6228 15.8095 15.5122 15.8839 15.3904 15.9347C15.2685 15.9855 15.1378 16.0116 15.0058 16.0116C14.8738 16.0116 14.7431 15.9855 14.6212 15.9347C14.4994 15.8839 14.3888 15.8095 14.2958 15.7158L12.0058 13.4158L9.7158 15.7158C9.62284 15.8095 9.51223 15.8839 9.39038 15.9347C9.26852 15.9855 9.13781 16.0116 9.0058 16.0116C8.87379 16.0116 8.74308 15.9855 8.62122 15.9347C8.49936 15.8839 8.38876 15.8095 8.2958 15.7158C8.20207 15.6228 8.12768 15.5122 8.07691 15.3904C8.02614 15.2685 8 15.1378 8 15.0058C8 14.8738 8.02614 14.7431 8.07691 14.6212C8.12768 14.4994 8.20207 14.3888 8.2958 14.2958L10.5958 12.0058L8.2958 9.7158C8.10749 9.52749 8.00171 9.2721 8.00171 9.0058C8.00171 8.7395 8.10749 8.4841 8.2958 8.2958C8.4841 8.10749 8.7395 8.00171 9.0058 8.00171C9.2721 8.00171 9.52749 8.10749 9.7158 8.2958L12.0058 10.5958L14.2958 8.2958C14.3888 8.20207 14.4994 8.12768 14.6212 8.07691C14.7431 8.02614 14.8738 8 15.0058 8C15.1378 8 15.2685 8.02614 15.3904 8.07691Z"
          fill="#EBF6F9"
        />
      </svg>
    </>
  );
};

export default RightSideBar;
