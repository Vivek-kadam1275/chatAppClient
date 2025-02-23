import React, { useEffect, useState } from "react"
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";
import { getAllUsers } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Welcome from "../components/Welcome";

const Chat = (props) => {

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const fetchContactsData = async () => {
    const response = await fetch(getAllUsers, {
      method: "GET",
      credentials: "include",
    })
    const data = await response.json();
    // console.log(data);
    if (data.success) {
      setContacts(data.contacts);
      setCurrentUser(data.currentUser);
    } else {
      navigate('/login');
    }


  }
  useEffect(() => {
    fetchContactsData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.isAvatarSet) {
        toast.error("set avatar first", toastOptions);
        navigate("/setAvatar");
      }
    }
  }, [currentUser])

  const handleChatChange = (contact) => {
    setCurrentChat(contact);
    // console.log(contact);
  }


  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-4 bg-[#131324]">
      <div className="w-[85vw] h-[85vh] flex     bg-[#00000076]">
        <Contacts contacts={contacts} currentUser={currentUser} handleChatChange={handleChatChange} />


        {currentChat === undefined ? <Welcome currentUser={currentUser} /> : <ChatContainer currentChat={currentChat} />}
      </div>
    </div>
  )
};

export default Chat;
