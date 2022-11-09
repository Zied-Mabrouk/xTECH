import './App.css';
import React from "react"
// import io from 'socket.io-client';
import SideBar from './components/modules/SideBar/SideBar';
import { UserContext } from './utils/UserContext';
import { fetchUserByName, getConversation } from './api';
import LeftSideBar from './components/cores/LeftSideBar/LeftSideBar';
import RightSideBar from './components/cores/RightSideBar/RightSideBar';
import MainContainer from './components/modules/MainContainer/MainContainer';

function App() {

  let [selection, setSelection] = React.useState(0);
  let [user, setUser] = React.useState(null);
  let [conversation, setConversation] = React.useState();

  // right side bar
  let [displayBar, setDisplayBar] = React.useState(false);

  React.useEffect(() => {
    if (Math.random() > 0.5)
      fetchUserByName("Zied", "Mabrouk").then(data => setUser(data))
    else
      fetchUserByName("Amine", "Saddem").then(data => setUser(data))
  }, [])
  const handleOpenConversation = async (to) => {
    const tmp = await getConversation(user._id, to._id);
    setConversation({ messages: tmp, friend: to });
  }

  let [list, setList] = React.useState([]);

  return (
    <UserContext.Provider value={user}>
      <SideBar classname={"left-sidebar"} >
        <LeftSideBar
          handleOpenConversation={handleOpenConversation}
          list={list}
          setList={setList}
          selection={selection}
          setSelection={setSelection}
        />
      </SideBar>
      {
        user &&
        <MainContainer list={list} setList={setList} user={user} conversation={conversation} setConversation={setConversation} width={(displayBar ? 60 : 80) + "vw"} />
      }
      <SideBar classname={"right-sidebar"} active={displayBar}>
        <RightSideBar displayBar={displayBar} setDisplayBar={setDisplayBar} />
      </SideBar>

    </UserContext.Provider>
  );
}

export default App;
