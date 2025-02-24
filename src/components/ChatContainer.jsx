import React, { useEffect, useState } from "react"
import Logout from "./Logout.jsx";
import ChatInput from "./ChatInput.jsx";
import ChatMessage from "./ChatMessage.jsx";
import { addMsg, getMsgs } from "../utils/ApiRoutes.jsx";
var selectedChatCompare;
const ChatContainer = ({ currentChat, currentUser, socket, socketConnected }) => {
  // trial of socket:
  // useEffect(() => {
  //   if (currentUser) {
  //     socket = io(baseUrl);

  //     socket.emit("setup", currentUser);
  //     socket.on("connected", () => {
  //       setSocketConnected(true);
  //     })
  //   }
  // }, [])

  // console.log(currentChat);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const handleSendMsg = async (msg) => {
    // console.log(msg);
    // alert(msg);
    const to = currentChat._id;
    const from = currentUser._id;
    if (socket && socketConnected) {
      socket.emit("send-msg", { from, to, msg });
    }

    const response = await fetch(addMsg, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ msg, to }),
      credentials: "include"
    })

    const data = await response.json();
    // console.log(data);

    const msgs = [...messages];
    msgs.push({ senderBoolean: true, message: msg });
    setMessages(msgs);

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
    // console.log(data);

    setMessages(data.data);
    setLoading(false);

    // socket.emit("join-chat", to)

  }

  useEffect(() => {
    getMessages();
    selectedChatCompare = currentChat;
  }, [currentChat])

  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    if (socket && socketConnected) {

      socket.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  });
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);



  return (
    <div className="flex flex-col pt-3 w-3/4  overflow-hidden gap-1">

      <div className="chat-header flex justify-between items-center sm:px-2 md:px-4 :lg:px-4 h-[10%] gap-2">
        <div className="user-details flex items-center   gap-4">

          <img
            src={currentChat.avatarImage}
            alt="avt"
            className="w-8 sm:w-10  lg:w-12 "
          />


          <h3 className="username text-xl md:text-2xl lg:text-3xl text-white">{currentChat.username}</h3>

        </div>
        <Logout />
      </div>
      <ChatMessage messages={messages} loading={loading} />
      <ChatInput handleSendMsg={handleSendMsg} />

    </div>
  )
};

export default ChatContainer;
