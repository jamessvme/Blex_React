import React, { ChangeEvent, useRef, useState } from "react";
import { message } from "../types/interfaces/message";
import "../style/chat.css";
import { formatAMPM } from "../utils/formatAMPM";
import Picker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faSmile } from "@fortawesome/free-solid-svg-icons";

export function Chat() {
  const [messages, setMessages] = useState<message[]>([
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/user_avatar.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/exampleuser.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "img/exampleuser.png",
      date: new Date(),
    },
    {
      username: "Test User",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, deserunt!",
      pfp: "",
      date: new Date(),
    },
  ]);

  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject);
    setInputText(inputText + emojiObject.emoji);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  const [inputText, setInputText] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [options, setOptions] = useState(false);
  return (
    <>
      <div className="bg-[#483969] pb-[30px] rounded-[10px] z-10 relative">
        <div className="h-[35px] w-[100%] bg-[#8700B8] rounded-[10px] chatHeaderBorder flex items-center justify-end pr-[7px] gap-3">
          <div 
            className="icon_container flex justify-center items-center px[11px] py-[5] w-[40px] h-[25px] bg-[#2FA1F3] rounded-[6.2px]"
            >
            <img src="/img/twitter.png" alt="twitter" />
          </div>
          <div className="icon_container flex justify-center items-center px[11px] py-[5] w-[40px] h-[25px] bg-[#2FA1F3] rounded-[6.2px]">
            <img src="/img/discord.png" className="w-[18px] h-[16px]" alt="" />
          </div>
          <div className="icon_container flex justify-center items-center py-[5] w-[40px] h-[25px] bg-[#2FA1F3] rounded-[6.2px]">
            <img src="/img/gear.png" alt="" />
          </div>
        </div>
      </div>
      <div className="mx-1 -mt-3 h-[533px] overflow-y-scroll bg-chat-back rounded-[10px]" id="style-1" >
        <ul className="messages pt-10 px-[16px]">
          {messages.map((message, i) => {
            return (
              <li key={Number(message.date) + i} className='flex  mb-[44px]'>
                <div className="flex items-start w-[25%]">
                  <img className="w-[65px] h-[65px]" src={message.pfp || "img/user_avatar.png"} alt="" />
                </div>
                <div className="flex items-start w-[73%] bg-[#483969] rounded-[10px]">
                  <p className="text-white font-sans p-3  leading-[23px] font-[400] text[13px]" >{message.content}</p>
                </div>
              </li>
            );
          })}
        </ul>   
      </div> 
      <div className="chatInput p-4 flex justify-between relative mx-1 -top-8 z-10">
          <div className='flex w-[78%] relative'>
            <input 
              className="h-[42px] px-3 w-[100%] rounded-[11px] border-none"
              type="text" 
              value={inputText} 
              onChange={handleInputChange} 
              />
            <button className="send pl-[8px] pr-[2px] pt-[6px] pb-[6px] bg-[#2FA1F3] rounded-[11px]">
              <img className="w-[31px] h-[30px]" src="/img/btn_chat.png" alt="chat" />
            </button>
          </div>
          {/* <span>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              onClick={() => {
                setOptions(!options);
                setEmoji(false);
              }}
            />
            {options ? (
              <div className="optionBox">
                <div>Chat Rules</div>
                <div>Hide Chat</div>
                <div className="triangle"></div>
              </div>
            ) : null}
          </span> */}
          <span className="w-[20%] flex justify-center items-center">
            <FontAwesomeIcon
              icon={faSmile}
              color="#2FA1F3"
              cursor={"pointer"}
              size="2x"
              onClick={() => {
                setEmoji(!emoji);
                setOptions(false);
              }}
            />
            
          </span>
        </div>
        <div className="flex justify-center">
          {emoji ? <Picker onEmojiClick={onEmojiClick} /> : null}
        </div>
    </>
  );
}
