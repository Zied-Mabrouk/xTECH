import './App.css';
import React from "react"
// import io from 'socket.io-client';
import SideBar from './components/modules/SideBar/SideBar';
import { UserContext } from './utils/UserContext';
import { fetchUserByName, getConversation, init } from './api';
import LeftSideBar from './components/cores/LeftSideBar/LeftSideBar';
import RightSideBar from './components/cores/RightSideBar/RightSideBar';
import MainContainer from './components/modules/MainContainer/MainContainer';

function App() {
  init();
  let [selection, setSelection] = React.useState(0);
  let [user, setUser] = React.useState(null);
  let [conversation, setConversation] = React.useState();

  // right side bar
  let [displayBar, setDisplayBar] = React.useState({
    open:false,
    contact:null
  });
  React.useEffect(() => {
    // if (Math.random() > 0.5)
      fetchUserByName("Zied", "Mabrouk").then(data => setUser(data))
    // else
    //   fetchUserByName("Amine", "Saddem").then(data => setUser(data))
  }, [])
  const handleOpenConversation = async (to) => {
    const tmp = await getConversation(user._id, to._id);
    setDisplayBar({open:false, contact:to});
    setConversation({ messages: tmp, friend: to });
  }
  const handleOpenBar = (contact=null) => {
    setDisplayBar({contact:contact,open:!displayBar.open});
  }
  let [list, setList] = React.useState([]);
  return (
    <UserContext.Provider value={{user,setUser}}>
      <SideBar classname={"left-sidebar"} >
        <LeftSideBar
          handleOpenConversation={handleOpenConversation}
          list={list}
          setList={setList}
          selection={selection}
          setSelection={setSelection}
          conversation={conversation}
        />
      </SideBar>
      {
        user &&
        <MainContainer handleOpenBar={handleOpenBar} list={list} setList={setList} user={user} conversation={conversation} setConversation={setConversation} width={(displayBar.open ? 60 : 80) + "vw"} />
      }
      <SideBar classname={"right-sidebar"} active={displayBar.open}>
        <RightSideBar  handleOpenBar={handleOpenBar} contact={displayBar.contact} conversation={conversation}/>
      </SideBar>

    </UserContext.Provider>
  );
}

export default App;
