import React, { useEffect, useState } from "react"
import Logout from "./Logout.jsx";
import ChatInput from "./ChatInput.jsx";
import ChatMessage from "./ChatMessage.jsx";
import { addMsg, getMsgs } from "../utils/ApiRoutes.jsx";

const ChatContainer = ({ currentChat }) => {
  // console.log(currentChat);
  const [loading,setLoading]=useState(true);
  const [messages, setMessages] = useState([]);
  const handleSendMsg = async (msg) => {
    // console.log(msg);
    alert(msg);
    const to = currentChat._id;
    const response = await fetch(addMsg, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ msg, to }),
      credentials: "include"
    })

    const data = await response.json();
    console.log(data);


  }

  const getMessages = async () => {
    const to = currentChat._id;
    const response = await fetch(getMsgs, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ to }),
      credentials: "include",

    })

    const data = await response.json();
    console.log(data);

    setMessages(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getMessages();
  }, [currentChat])

  return (
    <div className="flex flex-col pt-3 w-3/4  overflow-hidden gap-1">

      <div className="chat-header flex justify-between items-center px-4 h-[10%]">
        <div className="user-details flex items-center gap-4">

          <img
            src={currentChat.avatarImage}
            alt="avatar"
            className="w-12"
          />

          <div className="username text-2xl text-white">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <ChatMessage messages={messages} loading={loading}/>
      <ChatInput handleSendMsg={handleSendMsg} />

    </div>
  )
};

export default ChatContainer;
