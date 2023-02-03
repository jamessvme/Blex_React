import React, { Dispatch, SetStateAction, useState, useRef } from "react";
import { Content } from "../types/main"
import { MainWindows, User } from "../App";

import { MainHeader } from "../components/MainHeader";
import { Footer } from "../components/Footer";
import { Chat } from './../components/Chat';
import ChatControl from "../components/baseComponet/ChatControl";
import { useOnClickOutside } from "../Hooks/hooks";
import Header from "../Layout/Header";

interface LayoutProps {
  setWindow: Dispatch<SetStateAction<MainWindows>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  footer: Boolean | null,
  children: Object,
  chat: Boolean,
  showChat: Boolean,
  setShowChat: Function
}

export default function Templete ({setWindow, user, chat, showChat, footer, setShowChat, setUser, children}: LayoutProps) {
  
  const [open, setOpen] = useState(false);
  const node = useRef(); 
  useOnClickOutside(node, () => setOpen(false));
  const handleShowClick = () => {
    setShowChat(true);
    setTimeout(() => {
      setShowChat(false);
    }, 5000);
  }
  
  return (
    <>
      <Header setWindow={setWindow} user={user} setUser={setUser}/>    
    </>
    // <div className="">
    //   <div className="background w-full overflow-x-hidden h-full">
    //     <img className="backMask -z-0" src="/img/backMask.png"></img>
    //     <div className="backMaskleft -z-0"></div>
    //     <div className="backMaskRight -z-0"></div>
    //     <div className="backTopRight -z-0"></div>
    //   </div>
    //   {
    //     chat&&
    //       <ChatControl 
    //         setChatShow = {setShowChat} 
    //         showChat = {showChat}
    //         />
    //   }
      
    //   <MainHeader 
    //     setWindow={setWindow} user={user} setUser={setUser}
    //   />
    //   <>
    //   <div className="h-[calc(100vh-330px)] mt-[100px] flex gap-14 px-[74px]" >
    //     {showChat&&
    //     <div className="w-[370px]">
    //       <Chat />
    //     </div>
    //     }
    //     <>
    //       {/* {children} */}
    //     </>
    //   </div>
    //   </>
    //   {/* <Footer 
    //     setWindow={setWindow} 
    //     footer1={footer}
    //   /> */}
    // </div>
  )
}