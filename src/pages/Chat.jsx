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

 const {toastOptions,  setContacts,currentUser, setCurrentUser,currentChat,  setSocketConnected}=useContext(chatContext);

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
  }, [currentUser]);
  

   


  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-4 bg-[#131324]">
      <div className="w-[85vw] h-[85vh] flex   bg-[#00000076]">
        <ContactsContainer/>

        {currentChat === undefined ? <Welcome  /> : <ChatContainer socket={socket} />}
      </div>
    </div>
  )
};

export default Chat;
