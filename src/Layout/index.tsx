import { Dispatch, SetStateAction, useState, useRef } from "react";
import { MainWindows, User } from "../App";
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
      <div className="content block xl:flex w-full">
        {chat&&
          <ChatControl 
            setChatShow={setShowChat}
            showChat = {showChat}
          />
        }
        {showChat&&
          <>
            <div className="w-[50%] mx-auto xl:mx-0 xl:w-[20%] xl:ml-10">
              <Chat />
            </div>
            <div className="w-full xl:w-[80%]">
               <>
                {children}
               </> 
            </div>
          </>
        }
        {!showChat&&
          <div className="w-full">
            <>
              {children}
            </>
          </div>
        }
      </div>
      <Footer 
        setWindow={setWindow} 
      />    
    </>
  )
}