import React, { Dispatch, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { MainWindows, User } from "../App";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { successNotif } from "../utils/notifications/successNotif";
import { useCookies } from "react-cookie";


interface MainHeaderProps {
  setWindow: Dispatch<SetStateAction<MainWindows>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export function MainHeader({ setWindow, user, setUser }: MainHeaderProps) {

  const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);
  let navigate = useNavigate();
  const handleLogout = () => {
    removeCookie('loginCookie')
    setUser(null);
    navigate("/"); 
    successNotif('Successfully logged out')
  }

  return (
    <>
      <header className="w-full block md:flex justify-between relative z-10 h-[100px] items-center px-16 ">
        <div className=" flex items-center justify-between topNavLeft ">
          <div className="logo">
            <img src="/img/logo.png" className="relative -left-8" alt="" />
          </div>
          <div className="relative menu">
            <button 
              className="block  xl:hidden bg-[#44D66C] text-[white] rounded-lg w-[127px] h-[38px]"
              >Menu</button>
              <div className="hidden absolute bg-white">
                  <Link to="/">
                    <img src="/img/home.png" alt="" />
                  </Link>
                  <Link to="/coinflip" >
                    <img src="/img/starts.png"  alt="" />
                  </Link>
                  <Link to="/about">
                    <img src="/img/about.png" alt="" />
                  </Link>
              </div>
            
          </div>
          <div className="hidden xl:flex gap-16">
            <Link to="./">
              <img src="/img/home.png" alt="" />
            </Link>
            <Link to="./coinflip">
              <img src="/img/starts.png" alt="" />
            </Link>
            <Link to="about">
              <img src="/img/about.png" alt="" />
            </Link>
            
          </div>
        </div>
        <div className="topNavRigt flex gap-16 justify-between ">
          <div className="comunication gap-10 flex">
            <a href="#">
              <FontAwesomeIcon 
                color="#483969"
                size="2x"
                icon={faDiscord} />
            </a>
            <a href="#">
              <FontAwesomeIcon 
                color="#483969"
                size="2x"
                icon={faTwitter} />
            </a>
          </div>
          <button onClick={() => setWindow(MainWindows.Login)} className="bg-[#2FA1F3] rounded-[11.6px] font-['RubiK_Mono_One] text-[18.6px] w-[127px] h-[38px] tracking-[0.02em] leading-6 text-white">
            login
          </button>
        </div>
      </header>
      <header className="header">
  <a href="" className="logo">CSS Nav</a>
  <label className="menu-icon" form="menu-btn"  ><span className="navicon"></span></label>
  <ul className="menu">
    <li><a href="#work">Our Work</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#careers">Careers</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</header>
    </>
  );
}
