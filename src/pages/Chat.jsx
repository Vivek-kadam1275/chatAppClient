import React, { useContext, useEffect, useState } from "react"
import ChatContainer from "../components/ChatContainer";
import { getAllUsers } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Welcome from "../components/Welcome";
import { io } from "socket.io-client";
import { baseUrl } from "../utils/ApiRoutes";
import { chatContext } from "../context/chatContext";
import ContactsContainer from "../components/ContactsContainer";
var socket;
const Chat = (props) => {

  const { toastOptions, setContacts, currentUser, setCurrentUser, setSocketConnected, socketConnected, setIsTyping, setMessages, currentChat, messages } = useContext(chatContext);

  const navigate = useNavigate();


  const fetchContactsData = async () => {
    const response = await fetch(getAllUsers, {
      method: "GET",
      credentials: "include",
    })
    const data = await response.json();
    if (data.success) {
      setContacts(data.contacts);
      setCurrentUser(data.currentUser);
    } else {
      navigate('/login');
    }


  }
  // fetch contacts from database
  useEffect(() => {
    fetchContactsData();
  }, []);

  //  if avatar is not set, then set first
  useEffect(() => {
    if (currentUser) {
      if (!currentUser.isAvatarSet) {
        toast.error("set avatar first", toastOptions);
        navigate("/setAvatar");
      }
    }
  }, [currentUser])



  // After getting currentUser, connect  socket to the socket.io circuit. and do setup
  useEffect(() => {
    if (currentUser) {
      socket = io(baseUrl);

      socket.emit("setup", currentUser);

      socket.on("connected", () => {

        setSocketConnected(true);
      })
    }


    return () => {
      if (socket) {
        socket.disconnect();  // 4️⃣ Disconnects the WebSocket
        console.log("Socket disconnected");
      }
    };
  }, [currentUser]);



  // continuous running useEffect:
  useEffect(() => {
    if (!socketConnected) return;


    const handleMessageReceive = (data) => {
      if (!currentChat || currentChat._id !== data.from) {
        console.log("Message received, but not in the correct chat.");
        return;
      }
      setMessages((prev) => [...prev, { fromSelf: false, message: data.msg }]);
    };

    const handleTyping = (data) => {
       console.log("started")
      
      if(data===currentChat._id){
        setIsTyping(true);
      }
    }

    const handleStopTyping = (data) => {

      console.log("stopped")
     
      setIsTyping(false)
    
    };

    socket.on("msg-recieve", handleMessageReceive);
    socket.on("typing", handleTyping);
    socket.on("stop-typing", handleStopTyping);

    return () => {
      socket.off("msg-recieve", handleMessageReceive);
      socket.off("typing", handleTyping);
      socket.off("stop-typing", handleStopTyping);
    };
  }, [socketConnected, currentChat]);




  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-4 bg-[#131324]">
      <div className="w-[85vw] h-[85vh] flex   bg-[#00000076]">
        <ContactsContainer />

        {currentChat === undefined ? <Welcome /> : <ChatContainer socket={socket} />}
      </div>
    </div>
  )
};

export default Chat;
