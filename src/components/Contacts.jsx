import React, { useContext, useState } from "react"
import { chatContext } from "../context/chatContext";
const Contacts = (props) => {
  const { contacts, currentChat, setCurrentChat } = useContext(chatContext);

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
    <div className="h-[80%] w-full flex flex-col">
      <div className="h-[5%] w-full flex justify-center items-center">
        <input type="search" placeholder="search contact" className="w-[90%] h-[90%] border focus:outline-none border-[#0d5cc7] focus:border-[#0d5cc7] rounded-md  px-2" value={searchContact} name="searchContact" onChange={(e) => {
          setSearchContact(e.target.value);
          if (!e.target.value) {
            findIndex = contacts.findIndex((contact) => contact.username === currentChat.username);
            setSeletedChat(findIndex);
          } else {
            setSeletedChat(undefined);
          }

        }} />
      </div>
      <div className="flex  flex-col overflow-auto items-center gap-3 sm:gap-5 h-[95%]  pt-6 ">
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

    </div>
  )
};

export default Contacts;
