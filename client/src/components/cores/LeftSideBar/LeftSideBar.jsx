import React from "react";
import { fetchFavorites, fetchFriends } from "../../../api";
import { navIcons } from "../../../utils/NavIcons";
import UserItem from "../UserItem/UserItem";
import "./LeftSideBar.scss";
import { UserContext } from "../../../utils/UserContext";
import { getStatus } from "../../../utils/GetStatus";
import Status from "../Status/Status";

const LeftSideBar = ({
  handleOpenConversation,
  list,
  setList,
  selection,
  setSelection,
  conversation
}) => {
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
        fetchFavorites(user._id).then((data) => setList(data));
        break;
      case 3:
        break;
      default:
        fetchFriends(user._id).then((data) => setList(data));
    }
  }, [selection, user, setList]);
  const status = getStatus(user?.status.value);
  return (
    <>
      <div className="sidebar-header">
        <div className={"sidebar-header-profile"}>
          <div className="sidebar-header-profile-avatar">
            <img src={user?.avatar} alt="avatar" style={{borderColor:"var(--"+status+")"}} />
          </div>
          <div className="sidebar-header-profile-info">
            <h1 className="sidebar-header-profile-name">
              {user?.firstName + " " + user?.lastName}
            </h1>
            <Status status={status} userStatus={user?.status} icon={true} />
          </div>
        </div>
      </div>

      <div className="sidebar-content">
        {list && list.sort((a,b)=>new Date(b.lastMessage?.date) - new Date(a.lastMessage?.date)).map((u, key) => (
          <UserItem
            user={u}
            key={key}
            handleOpenConversation={handleOpenConversation}
            active={conversation && conversation.friend._id === u._id}
          />
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
