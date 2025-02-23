import React from "react"

const ChatMessage = ({ messages, loading }) => {
  return (
    <div className="h-[75%] w-full text-white  py-4 px-2 overflow-auto">
      {loading ? <div>loading</div> :
        <div className={`flex flex-col gap-5  `}>
          {messages.map((message, id) => {
            return (
              <div key={id} className={`flex items-center justify-end  ${message.senderBoolean ? "justify-end  text-right" : "justify-start   "} `}>
                <span className={`rounded-[4px] text-[#d1d1d1] p-2 ${message.senderBoolean ? "  bg-[#101218]  " : "  bg-[#9900ff20] "}`}> {message.message}</span>
              </div>
            )
          })}
        </div>}

    </div>
  )
};

export default ChatMessage;
