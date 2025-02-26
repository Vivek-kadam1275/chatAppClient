import React, { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { chatContext } from "../context/chatContext";

const Welcome = ({}) => {

    const [loading, setLoading] = useState(true);
    const {currentUser}=useContext(chatContext);

// check that currentUser is fetched or not
    useEffect(() => {
        if (currentUser) {
            setLoading(false);
        }
    })
    return (
        <div className="w-3/4">
            {loading ? <div className="flex flex-col justify-center items-center w-full h-full text-white gap-1"> 
                <img src="https://res.cloudinary.com/dti8wm0fk/image/upload/v1740000075/robot_blxhsc.gif" alt="robot"  className="h-80"/>
                </div> : <div className=" flex flex-col justify-center items-center w-full h-full text-white">
                <img src="https://res.cloudinary.com/dti8wm0fk/image/upload/v1740000075/robot_blxhsc.gif" alt="robot"  className="h-80"/>
                <h1 className="text-3xl">
                    Welcome, <span className="text-[#4e0eff]">{currentUser.username}!</span>
                </h1>
                <h3 className="">Please select a chat to Start messaging.</h3>
            </div>}
        </div>
    )
};

export default Welcome;
