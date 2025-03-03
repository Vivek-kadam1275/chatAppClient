import React, { useContext, useEffect, useState } from "react"
import Logout from "./Logout.jsx";
import ChatInput from "./ChatInput.jsx";
import ChatMessage from "./ChatMessage.jsx";
import { addMsg, getMsgs } from "../utils/ApiRoutes.jsx";
import { chatContext } from "../context/chatContext.jsx";
import { data } from "react-router-dom";


var selectedChatCompare;
const ChatContainer = ({ socket }) => {

  const { currentChat, currentUser, socketConnected, messages, setMessages, typing, setTyping, setIsTyping, setMessagesLoading } = useContext(chatContext);

   
  const handleSendMsg = async (msg) => {

    const to = currentChat._id;
    const from = currentUser._id;
    if (socketConnected) {
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


    setMessages(data.data);
    setMessagesLoading(false);
    // if (socketConnected) {
    //   socket.emit("join-chat", to)
    //   selectedChatCompare = currentChat;
    // }

  }

  // fetch Messages and join socket to chatroom 
  useEffect(() => {
    getMessages();
    selectedChatCompare = currentChat;
    // console.log(currentChat);
  }, [currentChat])

  


 
  // continuous running useEffect:

  // useEffect(() => {

    
  //   if (!socketConnected) return;

  //   console.log("👂 Listening for messages...");

  //   const handleMessageReceive = (data) => {
  //      console.log("message recived...")
  //     if (currentChat._id !== data.from  || !currentChat ) {
  //       console.log("not in chat...");
  //     } else {
  //       setArrivalMessage({ fromSelf: false, message: data.msg });
  //     }
  //   };

  //   const handleTyping = (room) => {
  //     if (currentChat._id === room) {
  //       setIsTyping(true)
  //     } else {
  //       // console.log(currentChat._id);
  //       // console.log(room);
  //       console.log("not in chat...");
  //     }
  //   }

  //   const handleStopTyping = (room) => {
  //     if (currentChat._id === room) {
  //       setIsTyping(false)
  //     } else {
  //       // console.log(currentChat._id);
  //       // console.log(room);
  //       console.log("not in chat...");
  //     }
  //   };

  //   socket.on("msg-recieve", handleMessageReceive);
  //   socket.on("typing", handleTyping);
  //   socket.on("stop typing",handleStopTyping);

  //   return () => {
  //     socket.off("msg-recieve", handleMessageReceive);
  //     socket.off("typing", handleTyping);
  //     socket.off("stop typing", handleStopTyping);
  //   };
  // },[socketConnected]);




  return (
    <div className="flex flex-col pt-3 w-3/4 overflow-hidden gap-1">

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
      <ChatMessage />
      <ChatInput handleSendMsg={handleSendMsg} socket={socket} />

    </div>
  )
};

export default ChatContainer;
