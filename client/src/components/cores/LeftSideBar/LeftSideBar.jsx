import React from "react";
import { fetchFriends } from "../../../api";
import { navIcons } from "../../../utils/NavIcons";
import UserItem from "../UserItem/UserItem";
import "./LeftSideBar.scss";
import { UserContext } from "../../../utils/UserContext";
import { getStatus } from "../../../utils/GetStatus";

const LeftSideBar = ({handleOpenConversation,list, setList,selection, setSelection}) => {
  // selction : [users (0), groups(1), favorites(2),search(3)]
  
  const user = React.useContext(UserContext);

  React.useEffect(() => {
    if (!user) return;
    setList([]);
    switch (selection) {
      case 0:
        fetchFriends(user._id).then((data) => setList(data));
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        fetchFriends(user._id).then((data) => setList(data));
    }
  }, [selection, user, setList]);
  return (
    <>
      <div className="sidebar-header">
        <div className={"sidebar-header-profile "+getStatus(user?.status)}>
              <div className="sidebar-header-profile-avatar">
                <img src={user?.avatar} alt="avatar" />
              </div>
              <div className="sidebar-header-profile-info">
                <h1 className="sidebar-header-profile-name">
                  {user?.firstName + " " + user?.lastName}
                </h1>
              </div>
         
        </div>
      </div>
      
          <div className="sidebar-content">
            {list.map((user, key) => (
              <UserItem user={user} key={key} handleOpenConversation={handleOpenConversation} />
            ))}
          </div>
          <div className="sidebar-nav">
            {navIcons.map((icon, key) => (
              <span
                onClick={() => setSelection(key)}
                key={key}
                className={key === selection ? "active" : ""}
              >
                {icon}
              </span>
            ))}
          </div>
       
    </>
  );
};

export default LeftSideBar;
