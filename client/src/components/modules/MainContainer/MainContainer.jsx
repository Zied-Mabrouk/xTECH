import React from "react";
import "./MainContainer.scss";
import io from "socket.io-client";
import Message from "../../cores/Message/Message";
import Input from "../../cores/Input/Input";
import Carousel from "../../cores/Carousel/Carousel";

const MainContainer = ({
  conversation,
  setConversation,
  width,
  user,
  list,
  setList,
  handleOpenBar,
}) => {
  let [socket] = React.useState(io("http://localhost:5000"));
  let [carousel, setCarousel] = React.useState({
    open:false,
    selected:null
  });

  const images = conversation?.messages.filter((message) => message.type === 1).map((message) => message.content).flat(1);
  React.useEffect(() => {
    socket.on("receive_message", (data) => {
      if (!data) return;
      if (!user) return;

      // if this session's user is the sender of the message
      if (data.from === user._id) {
        setConversation({
          ...conversation,
          messages: [...conversation.messages, data],
        });
        return;
      }
      // if this session's user is the receiver of the message
      if (data.to === user?._id) {
        //if the conversation is already opened, update the conversation
        if (conversation && conversation.friend._id === data.from)
          setConversation({
            ...conversation,
            messages: [...conversation.messages, data],
          });
        //update the last Message on the left Bar
        setList(
          list.map((item) =>
            item._id === data.from ? { ...item, lastMessage: data } : item
          )
        );
      }
    });
  }, [socket, user, conversation, setConversation, list, setList]);

  return (
    <div className="main-container" style={{ width: width }}>
      <div className="conversation">
        {conversation ? (
          conversation?.messages?.map((m, key) => (
            <Message
              key={key}
              handleOpenBar={handleOpenBar}
              user={
                key !== 0 && conversation.messages[key - 1].from === m.from
                  ? null
                  : m.from === user?._id
                  ? user
                  : conversation.friend
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
      {carousel.open && <Carousel images={images} carousel={carousel} setCarousel={setCarousel} />}
    </div>
  );
};

export default MainContainer;
