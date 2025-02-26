import React, { useContext, useState } from "react"
import AvatarPreview from "./AvatarPrieview.jsx";
import { useNavigate } from "react-router-dom";
import { GoBellFill } from "react-icons/go";
import { chatContext } from "../context/chatContext";

const Contacts = ({ }) => {

  const { contacts, currentUser,currentChat, setCurrentChat } = useContext(chatContext);
  const navigate = useNavigate();
   
  // store index of chat :
  const [selectedChat, setSeletedChat] = useState(undefined);

  const handleChatSelect = (contact, index) => {

    // console.log(index);
    setSeletedChat(index);
    setCurrentChat(contact);

  }

  // filter contacts based on seach input
  const [searchContact, setSearchContact] = useState("");
  const filteredContacts = contacts.filter((item) => (item.username.toLowerCase().includes(searchContact.toLowerCase())));

  var findIndex;

  return (
    <div className="text-white sm:w-[300px] w-[200px] h-full bg-[#080420]">
      {
        currentUser && <div className="flex flex-col h-full w-full overflow-hidden">

          <div className=" flex w-full  justify-around items-center   h-[10%]">
            <div onClick={() => {
              window.location.reload();
            }} className="cursor-pointer flex  items-center w-[60%] justify-between h-[90%]" >
              <img src="https://res.cloudinary.com/dti8wm0fk/image/upload/v1739619094/logo_d8c0as.svg" alt="logo" className="w-8 sm:w-10  lg:w-12  " />
              <h3 className=" uppercase text-xl md:text-2xl font-bold">snappy</h3>
            </div>

            <div className="w-[10%] ">
              <GoBellFill className="w-full text-2xl cursor-pointer" />
            </div>


          </div>
          <div className="h-[5%] w-full flex justify-center items-center">
            <input type="search" placeholder="search contact" className="w-[90%] h-[90%] border focus:outline-none border-[#0d5cc7] focus:border-[#0d5cc7] rounded-md  px-2" value={searchContact} name="searchContact" onChange={(e) => {
              setSearchContact(e.target.value);
              if(!e.target.value){
                  findIndex=contacts.findIndex((contact)=>contact.username===currentChat.username);
                  setSeletedChat(findIndex);
              }else{
                setSeletedChat(undefined);
              }
              
            }} />
          </div>
          <div className="flex  flex-col overflow-auto items-center gap-3 sm:gap-5 h-[75%]  pt-6 ">
            {filteredContacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`flex gap-2 sm:gap-4  items-center  w-[90%] bg-[#ffffff34] cursor-pointer rounded-md p-1 sm:p-2 transition-all duration-1000 ${selectedChat === index ? "text-black bg-violet-400" : ""}
                   `}
                  onClick={() => {
                    handleChatSelect(contact, index)
                  }}
                >
                  <div className="avatar">
                    <img
                      src={contact.avatarImage}
                      alt="avatar"
                      className="w-8 sm:w-10  lg:w-12  rounded-full"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}

          </div>
          <div className="bg-[#0d0d30] flex justify-center items-center h-[10%] gap-4 ">

            <AvatarPreview avatarImage={currentUser.avatarImage} />


            <div className="text-3xl">
              <h2>{currentUser.username}</h2>
            </div>
          </div>

        </div>
      }

    </div>
  )
};

export default Contacts;
