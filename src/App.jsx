import { useEffect, useRef, useState } from 'react'
import Signup from './pages/Signup.jsx'
 import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SetAvatar from './pages/setAvatar.jsx';


function App() {

  const router = createBrowserRouter([
    {
      path: "/signup",
      element:
        <Signup/>

    },
    {
      path: "/login",
      element:
          <Login/>
    },
    {
      path: "/",
      element:
        <Chat/>

    },
    {
      path: "/setAvatar",
      element:
          <SetAvatar/>
    },     
  ])

   

  
  return (
    <>
      <RouterProvider router={router}/>
      <Toaster/>
       
    </>
  )
}

export default App
