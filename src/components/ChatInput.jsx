import React, { useState } from "react"
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";

const ChatInput = ({ handleSendMsg }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerToggle = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleChange = (e) => {
        setMsg(e.target.value);
        // console.log(msg)
    }

    const handleEmojiClick = (emojiObject) => {

        // console.log(emojiObject.emoji);
        // let message=msg;
        // message +=emojiObject.emoji;
        setMsg(msg + emojiObject.emoji);
        // console.log(message);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        handleSendMsg(msg);

        setMsg("");
    }

    return (
        <div className="h-[10%]   flex items-center px-1 md:px-8 bg-[#080420] gap-2 relative">
            <div className="button-container w-[5%]  flex justify-center items-center ">
                <div className=" flex items-center text-white gap-4   " >
                    <BsEmojiSmileFill onClick={handleEmojiPickerToggle} className={`cursor-pointer text-[1.5rem] ${showEmojiPicker ? "text-[#ffff00c8] " : ""}  relative z-20 `} />

                    {showEmojiPicker && <div className="absolute   ">
                        <EmojiPicker onEmojiClick={handleEmojiClick} className="emoji-picker-react"
                        />
                    </ div>}
                </div>
            </div>
            <form className="w-[95%] h-full rounded-md flex items-center gap-2 md:gap-8 bg-[#ffffff34] pl-4" onSubmit={submitHandler} >
                <input
                    type="text"
                    placeholder="type your message here"
                    value={msg}
                    name="msg"
                    onChange={handleChange}
                    className="w-[90%] h-full bg-transparent text-white border-none p-1 md:p-2 text-[1.1rem] md:text-[1.2rem] outline-none selection:bg-[#9a86f3] "

                />
                <button type="submit" className="px-2  md:px-8 py-4 rounded-md flex justify-center items-center bg-[#9a86f3] border-none cursor-pointer">
                    <IoMdSend className="text-[2rem] text-white" />
                </button>
            </form>
        </div>
    )
};


export default ChatInput;