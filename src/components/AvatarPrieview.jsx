import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const AvatarPreview = ({ avatarImage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate=useNavigate();
    return (
        <div className="relative">
            {/* ✅ Small Avatar (Clickable) */}
            <img
                src={avatarImage}
                alt="avatar"
                className="w-8 sm:w-13  lg:w-16  rounded-full cursor-pointer"
                onClick={() => setIsOpen(true)}
                
            />

            {/* ✅ Modal (Enlarged Image) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                    onClick={() => setIsOpen(false)} // Close when clicking outside
                >
                    <div
                        className="w-1/2 bg-gray-900 p-4 rounded-lg flex justify-center"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <img
                            src={avatarImage}
                            alt="Enlarged Avatar"
                            className="w-[95%] max-h-[50vh] rounded-lg "
                        />
                        <div className="w-[5%] h-fit rounded-full cursor-pointer" onClick={()=>{
                            navigate("/setAvatar")
                        }}><CiEdit className="w-full h-10 rounded-full" />
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default AvatarPreview;
