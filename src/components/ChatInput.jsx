import React, { useContext, useState } from "react"
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import { chatContext } from "../context/chatContext";
import { useRef } from "react";

const ChatInput = ({  handleSendMsg,socket}) => {
    const {currentChat,typing,setTyping,socketConnected,currentUser}=useContext(chatContext);
    const lastTypingTimeRef = useRef(null);

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerToggle = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleChange = (e) => {
        setMsg(e.target.value);

        if(!socketConnected){
            return
        }
        if(socketConnected && !typing ){
            setTyping(true);
            socket.emit("typing",{currentChat,currentUser})
           
        }

        lastTypingTimeRef.current = new Date().getTime();  // ✅ Store last typing time globally
        var timerLength = 3000;
        setTimeout(() => {
          var timeNow = new Date().getTime();
          var timeDiff = timeNow - lastTypingTimeRef.current;
          if (timeDiff >= timerLength && typing) {
            socket.emit("stop typing", {currentChat,currentUser});
            setTyping(false);
          }
        }, timerLength);
        // console.log(msg)
    }

    // add selected emoji to message
    const handleEmojiClick = (emojiObject) => {
        // console.log(emojiObject.emoji);
        setMsg(msg + emojiObject.emoji);
     }

    // submit message
    const submitHandler = (event) => {
        event.preventDefault();
        handleSendMsg(msg);
        setMsg("");
    }

    return (
        <div className="h-[10%]   flex items-center px-1 md:px-8 bg-[#080420] gap-2  relative" >
            <div className=" w-[5%]  flex justify-center items-center ">
                <div className=" flex items-center text-white gap-4   " >
                    <BsEmojiSmileFill onClick={handleEmojiPickerToggle} className={`cursor-pointer text-[1.5rem] ${showEmojiPicker ? "text-[#ffff00c8] " : ""}  relative z-20 `}/>

                    {showEmojiPicker && <div className="absolute bottom-full left-0 mb-2  ">
                        <EmojiPicker onEmojiClick={handleEmojiClick} className="emoji-picker-react"
                        />
                    </ div>}
                </div>
            </div>
            <form className="w-[95%] h-full rounded-md flex items-center gap-2 md:gap-8 bg-[#ffffff34] pl-4 " onSubmit={submitHandler} >
                <input
                    type="text"
                    placeholder="type your message here"
                    value={msg}
                    name="msg"
                    onChange={handleChange}
                    className="w-[90%] h-full bg-transparent text-white border-none p-1 md:p-2 text-[1.1rem] md:text-[1.2rem] outline-none selection:bg-[#9a86f3] "

                />
                <button type="submit" className="px-2  md:px-8 py-[14px] rounded-md flex justify-center items-center bg-[#9a86f3] border-none cursor-pointer">
                    <IoMdSend className="text-[2rem] text-white" />
                </button>
            </form>
        </div>
    )
};


export default ChatInput;