import React from "react";
import io from "socket.io-client";
import Carousel from "../../cores/Carousel/Carousel";
import ContextMenu from "../../cores/ContextMenu/ContextMenu";
import Input from "../../cores/Input/Input";
import Message from "../../cores/Message/Message";
import "./MainContainer.scss";

const MainContainer = ({
  conversation,
  setConversation,
  width,
  user,
  list,
  setList,
  handleOpenBar,
  carousel,
  setCarousel,
}) => {
  let [socket, setSocket] = React.useState(null);
  let [dataSocket, setDataSocket] = React.useState();
  let [contextMenu, setContextMenu] = React.useState({
    user: user._id,
    open: false,
    styles: {},
  });

  const images = conversation?.messages
    .filter((message) => message.type === 1)
    .map((message) => message.content)
    .flat(1);

  React.useEffect(() => {
    if (!dataSocket) return;
    if (!user?._id) return;
    // if this session's user is the sender of the message
    if (dataSocket.from === user._id) {
      setConversation((prev) => ({
        ...prev,
        messages: [...prev?.messages, dataSocket],
      }));
      return;
    }
    // if this session's user is the receiver of the message
    if (dataSocket.to === user?._id) {
      //if the conversation is already opened, update the conversation

      setConversation((prev) => {
        if (prev && prev.friend._id === dataSocket.from)
          return {
            ...prev,
            messages: [...prev.messages, dataSocket],
          };
        else return prev;
      });
      //update the last Message on the left Bar
      setList((prev) =>
        prev.map((item) =>
          item._id === dataSocket.from
            ? { ...item, lastMessage: dataSocket }
            : item
        )
      );
    }
  }, [dataSocket, user, setConversation, setList]);

  React.useEffect(() => {
    const newSocket = io("http://localhost:3001");
    newSocket.on("receive_message", (data) => {
      setDataSocket(data);
    });
    setSocket(newSocket);
    setContextMenu((prev) => ({ ...prev, user: user._id }));
    return () => {
      setSocket((prev) => {
        prev.disconnect();
        return prev.removeAllListeners("receive_message");
      });
    };
  }, [user]);

  return (
    <div
      className="main-container"
      style={{ width: width }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="conversation">
        {contextMenu.open && (
          <ContextMenu
            contextMenu={contextMenu}
            setContextMenu={setContextMenu}
            setConversation={setConversation}
            setList={setList}
          />
        )}
        {conversation ? (
          conversation?.messages?.map((m, key) => (
            <Message
              key={key}
              setContextMenu={setContextMenu}
              handleOpenBar={handleOpenBar}
              user={m.from === user?._id ? user : conversation.friend}
              displayAvatar={
                key !== 0 && conversation.messages[key - 1].from === m.from
                  ? false
                  : true
              }
              right={m.from === user?._id}
              message={m}
              setCarousel={setCarousel}
              carousel={carousel}
            />
          ))
        ) : (
          <div className="no-message">No message</div>
        )}
      </div>

      <Input
        conversation={conversation}
        setConversation={setConversation}
        list={list}
        setList={setList}
        socket={socket}
        user={user}
      />
      {carousel.open && (
        <Carousel
          images={images}
          carousel={carousel}
          setCarousel={setCarousel}
        />
      )}
    </div>
  );
};

export default MainContainer;
