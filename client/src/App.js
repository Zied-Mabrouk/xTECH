import './App.css';
import React from "react"
// import io from 'socket.io-client';
import FriendsList from './components/modules/FriendsList/FriendsList';
// const socket = io('http://localhost:5000');
function App() {
  // const sendMessage = () => {
  //   socket.emit('send_message', {message:"Hello World"});
  // }
  // React.useEffect(()=>{
  //   socket.on("receive_message",(data)=>{
  //     alert(data.message);
  //   })
  // },[socket])
  return (
    <>
      <FriendsList />
    </>
  );
}

export default App;
