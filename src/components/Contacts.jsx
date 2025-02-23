import React, { useEffect, useState } from "react"

const Contacts = ({ contacts, currentUser,handleChatChange }) => {

  const [selectedChat,setSeletedChat]=useState(undefined);
  const handleSelect=(contact,index)=>{
      // console.log("clicked");
      // console.log(index);
      setSeletedChat(index);
      handleChatChange(contact);
       
  }

  // useEffect(()=>{
  //   console.log("after clicked",selectedChat);
  // },[selectedChat]);
   
  return (
    <div className="text-white w-1/4 h-full bg-[#080420]">
      {
        currentUser && <div className="flex flex-col h-full w-full overflow-hidden">

          <div className="flex w-full  justify-center items-center gap-4 h-[10%]">
            <img src="https://res.cloudinary.com/dti8wm0fk/image/upload/v1739619094/logo_d8c0as.svg" alt="logo"  className="w-12"/>
            <h3 className=" uppercase text-2xl font-bold">snappy</h3>
          </div>
          <div className="flex  flex-col overflow-auto items-center gap-5 h-[75%]   ">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                   className={`flex gap-4 h-full items-center  w-[90%] bg-[#ffffff34] cursor-pointer rounded-md p-2 transition-all duration-1000 ${selectedChat === index ? "text-black bg-violet-400" : ""}
                   `}
                   onClick={ ()=>{handleSelect(contact,index)             
                   }}
                >
                  <div className="avatar">
                    <img
                      src={contact.avatarImage}
                      alt="avatar"
                       className="w-12 rounded-full"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
            
          </div>
          <div className="bg-[#0d0d30] flex justify-center items-center h-[15%] gap-4 ">
            <div className="avatar">
              <img
                src={currentUser.avatarImage}
                alt="avatar"
                 className="w-16 rounded-full"
              />
            </div>
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
