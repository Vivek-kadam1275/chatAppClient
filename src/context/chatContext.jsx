import { createContext } from "react";
import { useState } from "react"; 
export const chatContext = createContext();



export default function ChatProvider({ children }) {

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    
    const [contacts, setContacts] = useState([]);// All contacts:
    const [currentUser, setCurrentUser] = useState(undefined); // Current logged in user
    const [currentChat, setCurrentChat] = useState(undefined); // current Chat user
    const [socketConnected, setSocketConnected] = useState(false);

    
    const [messages, setMessages] = useState([]); // all messages in chat
    const [typing, setTyping] = useState(false);   // does current user is typing or not
    const [istyping, setIsTyping] = useState(false); // does currentChat user is typing or not.

    const [messagesLoading, setMessagesLoading] = useState(true); // messages loader set.

    const value = { toastOptions,contacts, setContacts,currentUser, setCurrentUser,currentChat, setCurrentChat ,socketConnected, setSocketConnected ,messages,setMessages,typing,setTyping,istyping,setIsTyping ,messagesLoading, setMessagesLoading};

    return (<chatContext.Provider value={value}>
        {children}
    </chatContext.Provider>)
}


