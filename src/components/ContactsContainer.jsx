import React, { useContext, useState } from "react"
import AvatarPreview from "./AvatarPrieview.jsx";
import { useNavigate } from "react-router-dom";
import { GoBellFill } from "react-icons/go";
import { chatContext } from "../context/chatContext";
import Contacts from "./Contacts.jsx";

const ContactsContainer = (props) => {
    const { contacts, currentUser, currentChat, setCurrentChat } = useContext(chatContext);
    const navigate = useNavigate();

   
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
                    <Contacts/>
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

export default ContactsContainer;
