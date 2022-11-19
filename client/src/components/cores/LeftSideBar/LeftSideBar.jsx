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

  
  const {user} = React.useContext(UserContext);
  let [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    if (!user?._id) return;
    setFilter("")
    setList([])
    switch (selection) {
      case 0:
        if(user.friends.length === 0) {
          return;
        }
        fetchFriends(user._id).then((data) => setList(data));
        break;
      case 1:
        if(user.favorites.length === 0) {
          return;
        }
        fetchFavorites(user._id).then((data) => setList(data));
        break;
      case 2:
        if(user.friends.length === 0) {
          return;
        }
        fetchFriends(user._id).then((data) => setList(data));
        break;
     
      default:
        fetchFriends(user._id).then((data) => setList(data));
    }
  }, [selection, user?._id,user?.friends,user?.favorites, setList,setFilter]);
  
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
            <Status status={status} userStatus={user?.status} icon={true}/>
          </div>
          
        </div>
      </div>

      <div className="sidebar-content">
        {
          selection=== 2 &&
          <input placeholder="Search..." value={filter} onChange={(e)=>setFilter(e.target.value)} />
        }
        {list && 
        list
        .filter(friend=>friend.lastMessage && (friend.firstName.toLowerCase().includes(filter.toLowerCase()) || friend.lastName.toLowerCase().includes(filter.toLowerCase())))
        .sort((a,b)=>b.lastMessage && (new Date(b.lastMessage?.date) - new Date(a.lastMessage?.date)))
        .map((u, key) => (
          <UserItem
            user={u}
            key={key}
            handleOpenConversation={handleOpenConversation}
            active={conversation && conversation.friend._id === u._id}
          />
        ))}
        {list && list?.filter(friend=>!friend.lastMessage)?.map((u, key) => (
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
