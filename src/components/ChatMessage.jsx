import React, { useRef, useEffect, useContext } from "react"
import animationData from "../animations/typing.json";
import Lottie from "react-lottie";
import { chatContext } from "../context/chatContext";
const ChatMessage = ({    }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const messagesEndRef = useRef(null);
  const {messages,messagesLoading,istyping}=useContext(chatContext);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages,istyping]); // Scrolls when messages update

  return (
    <div className="h-[80%] w-full text-white  py-4 px-2 overflow-auto" >
      {messagesLoading ? <div>loader</div> :
        <div className={`flex flex-col gap-5  `}>
          {messages.map((message, id) => {
            return (
              <div key={id} className={`flex items-center justify-end  ${message.senderBoolean ? "justify-end  text-right" : "justify-start   "} `}>
                <span className={`rounded-[4px] text-[#d1d1d1] p-2 ${message.senderBoolean ? "  bg-[#130833]  " : "  bg-[#9900ff20] "}`}> {message.message}</span>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div >}
      {istyping ? <div className="text-white">
        <Lottie
          options={defaultOptions}
          // height={50}
          width={70}
          style={{ marginBottom: 0, marginLeft: 0 }}
        />
      </div> : <></>}
    </div>
  )
};

export default ChatMessage;
