import React from "react"

import { MdOutlineLogout } from "react-icons/md";
import { logoutRoute } from "../utils/ApiRoutes.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Logout = (props) => {
    const navigate=useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const handleLogout = async () => {
        try {
            const response = await fetch(logoutRoute, {
                method: "GET",
                credentials: "include",
            })
            const data = await response.json();
            console.log(data);

            if (data.success) {
                toast.success("logged out successfully...",toastOptions);
                
                navigate("/login");

                setTimeout(() => {

                    window.location.reload(); // Ensure fresh auth check
                }, 500);


            }

        } catch (error) {
            console.log("error in logout step....", error);
            toast.error(error,toastOptions);
            navigate("/login");
        }
    }

    return (
        <button className="flex justify-center items-center p-2 rounded-md bg-[#9a86f3] cursor-pointer" onClick={handleLogout}>
            <MdOutlineLogout className="text-1xl text-[#ebe7ff]" />

        </button>
    )
};

export default Logout;
