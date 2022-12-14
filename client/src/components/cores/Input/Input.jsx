import React from "react";
import "./Input.scss";
import { FileUploader } from "react-drag-drop-files";
import { sendMessage } from "../../../api";
import EmojiPicker from "emoji-picker-react";
import Dictaphone from "../Dictaphone/Dictaphone";
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder";
const Input = ({
  conversation,
  setConversation,
  user,
  list,
  setList,
  socket,
}) => {
  let [displayDragAndDrop, setDisplayDragAndDrop] = React.useState(false);
  let [displayEmojis, setDisplayEmojis] = React.useState(false);
  let [message, setMessage] = React.useState({
    content: "",
    contentImages: [],
    targetType: 0,
    type: 0,
  });

  React.useEffect(() => {
    setDisplayDragAndDrop(false);
  }, [conversation]);

  const onSend = async () => {
    if (!message.content && message.contentImages.length === 0) return;
    const type = message.contentImages.length > 0 ? 1 : 0;
    const newMessage = {
      ...message,
      from: user?._id,
      to: conversation?.friend?._id,
      date: new Date(),
      content:
        message.contentImages.length > 0
          ? message.contentImages
          : message.content,
      type: type,
    };
    delete newMessage.contentImages;
    const newConversation = await sendMessage(newMessage);
    setConversation({
      ...conversation,
      messages: newConversation,
    });
    setMessage({
      content: type === 0 ? "" : message.content,
      contentImages: [],
      targetType: 0,
      type: 0,
    });
    setDisplayDragAndDrop(false);
    setDisplayEmojis(false);
    setList(
      list.map((item) =>
        item._id === conversation.friend._id
          ? { ...item, lastMessage: newMessage }
          : item
      )
    );
    socket.emit("send_message", newMessage);
  };
  const onSendAudio = async(content) => {
    if(!content) return;
  
    const newMessage = {
      from: user?._id,
      to: conversation?.friend?._id,
      date: new Date(),
      content:content,
      type: 2,
    };
    const newConversation = await sendMessage(newMessage);
    setConversation({
      ...conversation,
      messages: newConversation,
    });
    
    setList(
      list.map((item) =>
        item._id === conversation.friend._id
          ? { ...item, lastMessage: newMessage }
          : item
      )
    );
    socket.emit("send_message", newMessage);
  };

  const wrapperRef = React.createRef();
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDisplayDragAndDrop(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [displayDragAndDrop, wrapperRef]);
  return (
    <div className="input-container">
      
      <Dictaphone onSend={onSend} active={conversation?true:false} setMessage={setMessage} />
      <div className="input">
        <div className={"input-tools" + (conversation ? "" : " disabled")}>
          {displayDragAndDrop && conversation && (
            <div className="drag-and-drop-zone" ref={wrapperRef}>
              {message.contentImages.map((item, index) => (
                <div className="image" key={index}>
                  <img src={item} alt="uploaded-img" />
                </div>
              ))}
              <FileUploader
                handleChange={(file) => {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setMessage({
                      ...message,
                      contentImages: [...message.contentImages, reader.result],
                    });
                  };
                  reader.readAsDataURL(file);
                }}
                name="file"
                types={["png", "jpg", "jpeg"]}
              />
            </div>
          )}
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setDisplayDragAndDrop(!displayDragAndDrop)}
          >
            <path
              d="M15.5461 10.585L9.25481 16.8865C8.43003 17.6195 7.35637 18.0096 6.25343 17.9772C5.1505 17.9447 4.10164 17.4921 3.32141 16.7118C2.54118 15.9316 2.08854 14.8827 2.05607 13.7798C2.0236 12.6769 2.41376 11.6032 3.14675 10.7784L11.2908 2.63436C11.7771 2.17248 12.4221 1.91496 13.0927 1.91496C13.7633 1.91496 14.4084 2.17248 14.8946 2.63436C15.3683 3.11444 15.6339 3.76177 15.6339 4.43623C15.6339 5.1107 15.3683 5.75803 14.8946 6.23811L7.87031 13.2522C7.8008 13.3271 7.71721 13.3875 7.62434 13.4301C7.53146 13.4726 7.43112 13.4965 7.32902 13.5003C7.22693 13.504 7.12509 13.4877 7.02932 13.4521C6.93355 13.4165 6.84573 13.3624 6.77086 13.2929C6.696 13.2234 6.63556 13.1398 6.593 13.0469C6.55043 12.9541 6.52658 12.8537 6.5228 12.7516C6.51902 12.6495 6.53538 12.5477 6.57096 12.4519C6.60653 12.3562 6.66063 12.2683 6.73014 12.1935L11.9525 6.98126C12.1442 6.78956 12.2519 6.52957 12.2519 6.25847C12.2519 5.98737 12.1442 5.72738 11.9525 5.53568C11.7608 5.34399 11.5008 5.2363 11.2297 5.2363C10.9586 5.2363 10.6987 5.34399 10.507 5.53568L5.28457 10.7683C5.02325 11.0275 4.81584 11.336 4.6743 11.6758C4.53276 12.0157 4.45989 12.3802 4.45989 12.7483C4.45989 13.1164 4.53276 13.4809 4.6743 13.8207C4.81584 14.1606 5.02325 14.469 5.28457 14.7283C5.81839 15.2368 6.52736 15.5204 7.2646 15.5204C8.00183 15.5204 8.71081 15.2368 9.24463 14.7283L16.2587 7.70405C17.0679 6.83563 17.5084 5.68703 17.4875 4.50023C17.4666 3.31343 16.9858 2.18108 16.1465 1.34176C15.3071 0.502431 14.1748 0.0216535 12.988 0.000713708C11.8012 -0.020226 10.6526 0.420307 9.78417 1.2295L1.64009 9.37358C0.541863 10.5899 -0.0446844 12.1831 0.00265827 13.8212C0.0500009 15.4593 0.727583 17.016 1.89423 18.1669C3.06087 19.3178 4.62661 19.9742 6.2652 19.9993C7.9038 20.0243 9.48888 19.4162 10.6902 18.3015L16.9917 12.0102C17.0866 11.9153 17.1619 11.8026 17.2133 11.6786C17.2646 11.5546 17.2911 11.4217 17.2911 11.2874C17.2911 11.1532 17.2646 11.0203 17.2133 10.8963C17.1619 10.7723 17.0866 10.6596 16.9917 10.5647C16.8968 10.4697 16.7841 10.3944 16.6601 10.3431C16.536 10.2917 16.4031 10.2653 16.2689 10.2653C16.1347 10.2653 16.0017 10.2917 15.8777 10.3431C15.7537 10.3944 15.641 10.4697 15.5461 10.5647V10.585Z"
              fill="#6588DE"
            />
          </svg>
         
          <VoiceRecorder active={conversation?true:false} onSendAudio={onSendAudio}  />

          {displayEmojis && (
            <EmojiPicker
              onEmojiClick={(e) =>
                setMessage({ ...message, content: message.content + e.emoji })
              }
            />
          )}
          <span
            className={"emoji-trigger" + (conversation ? "" : " disabled")}
            onClick={() => {
              if (conversation) setDisplayEmojis(!displayEmojis);
            }}
          >
            &#128540;
          </span>
        </div>
        <div className="input-text">
          <input
            type="text"
            placeholder="Type a new message..."
            value={message.content}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSend();
            }}
            onChange={(e) =>
              setMessage({
                ...message,
                content: e.target.value,
              })
            }
            disabled={!conversation}
          />
        </div>
        <div
          className={"input-button" + (conversation ? "" : " disabled")}
          onClick={onSend}
        >
          <span>Send</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.3393 7.31637L4.33927 0.314359C3.78676 0.0392893 3.16289 -0.0586374 2.55271 0.0339303C1.94252 0.126498 1.37573 0.405055 0.929602 0.831623C0.483474 1.25819 0.179724 1.81201 0.0597636 2.41757C-0.0601964 3.02313 0.00947219 3.65097 0.259271 4.21548L2.65927 9.58702C2.71373 9.71689 2.74177 9.85631 2.74177 9.99714C2.74177 10.138 2.71373 10.2774 2.65927 10.4073L0.259271 15.7788C0.055971 16.2356 -0.0299735 16.7361 0.00924794 17.2346C0.0484693 17.7331 0.211613 18.2139 0.483853 18.6333C0.756092 19.0527 1.1288 19.3974 1.56809 19.6361C2.00739 19.8748 2.49935 19.9999 2.99927 20C3.4675 19.9953 3.92876 19.886 4.34927 19.6799L18.3493 12.6779C18.8459 12.428 19.2633 12.045 19.555 11.5717C19.8466 11.0983 20.0011 10.5532 20.0011 9.99714C20.0011 9.44108 19.8466 8.89597 19.555 8.4226C19.2633 7.94924 18.8459 7.56625 18.3493 7.31637H18.3393ZM17.4493 10.8874L3.44927 17.8894C3.26543 17.9777 3.059 18.0077 2.85766 17.9753C2.65631 17.9429 2.46968 17.8497 2.32278 17.7082C2.17589 17.5667 2.07575 17.3837 2.0358 17.1836C1.99585 16.9836 2.018 16.7761 2.09927 16.589L4.48927 11.2175C4.52021 11.1458 4.54692 11.0723 4.56927 10.9974H11.4593C11.7245 10.9974 11.9788 10.892 12.1664 10.7044C12.3539 10.5169 12.4593 10.2624 12.4593 9.99714C12.4593 9.73184 12.3539 9.47742 12.1664 9.28983C11.9788 9.10223 11.7245 8.99685 11.4593 8.99685H4.56927C4.54692 8.92199 4.52021 8.84851 4.48927 8.77678L2.09927 3.40524C2.018 3.21815 1.99585 3.01068 2.0358 2.81064C2.07575 2.61061 2.17589 2.42757 2.32278 2.28607C2.46968 2.14458 2.65631 2.05139 2.85766 2.019C3.059 1.98661 3.26543 2.01658 3.44927 2.10487L17.4493 9.10688C17.6131 9.19082 17.7505 9.31835 17.8465 9.47543C17.9425 9.63251 17.9933 9.81304 17.9933 9.99714C17.9933 10.1812 17.9425 10.3618 17.8465 10.5188C17.7505 10.6759 17.6131 10.8034 17.4493 10.8874Z"
              fill="#FDFDFE"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Input;
