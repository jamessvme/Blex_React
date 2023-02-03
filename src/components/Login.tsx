import { faAngleDown, faCookie, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import "../style/login.css";
import { MainWindows, User } from "../App";
import { errorNotif } from "../utils/notifications/errorNotif";
import { warningNotif } from "../utils/notifications/warningNotif";
import { successNotif } from "../utils/notifications/successNotif";
import { useCookies } from 'react-cookie';
interface LoginProps {
  setWindow: Dispatch<SetStateAction<MainWindows>>;
  setUser: Dispatch<SetStateAction<User | null>>;
}
export function Login({ setWindow, setUser }: LoginProps) {
  const clickParent = (event: React.MouseEvent) => {
    event.preventDefault();
    let dataValue = (event.target as HTMLElement).getAttribute("data-value");
    if (dataValue) {
      setWindow(0);
    }
  };
  const [cookies, setCookie] = useCookies(['loginCookie']);
  const [loginCookie, setLoginCookie] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [loginCheck, setLoginCheck] = useState(0);

  // const login = async () => {
  //   if (!checkbox) {
  //     warningNotif("You need to agree to our statement before you login");
  //     return;
  //   }
  //   try {
  //     setCookie("loginCookie", loginCookie, { maxAge: 60 * 24 * 7 });
  //     const res = await (await fetch(`/users/`)).json();
  //     if (String(res.statusCode)[0] === '4') {
  //       errorNotif("Invalid cookie");
  //       return;
  //     }
  //     setUser(res);
  //     setWindow(0);
  //     setLoginCheck(1);
  //     successNotif("Successfully logged in");
  //   } catch (err) {
  //     setLoginCheck(2)
  //     errorNotif("Something went wrong, try again later.");
  //   }
  // };
    const login = () => {
      if(!checkbox) {
        warningNotif("You need to agree to our statement before you login");
          return;
      }
      if(loginCookie ==="123") {
        setLoginCheck(1);
        successNotif("Successfully logged in");
        // setWindow(0);
       
      }
      else {
        setLoginCheck(2)
        errorNotif("Something went wrong, try again later.");    
      }
    }
 
  const handleCookieChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCookie(e.target.value);
  };
  
  const handleCheckboxChange = () => {
    setCheckbox((prev) => !prev);
  };

  const handleInputType = () => {
    if (inputType == 'text') setInputType("password");
    else setInputType("text")
  }

  return (
    <div className=" login_wrapper z-50" data-value='parent' onClick={clickParent}>
      <div className="loginBackground">
        <div className="loginBackgroundLeft" />
        <div className="loginBackgroundRight" />
      </div>
      <div className="loginContainer">
        <div className="login_header pl-[99px] pr-[107px] pt-[14px] pb-[12px] ">
          <img src="/img/login_logo.png" alt="login_logo" />
        </div>
        <div className="login-content">
          <div className="flex justify-center items-center mt-[95px]">
            <img src="/img/login_with_roblox.png "></img>
            <span className="roblex_icon_rec"></span>
          </div>
          <div className="inputBox relative mt-[20px]">
            <div>
              <input 
                placeholder="YOUR COOKIE"
                type={inputType}
                className="relative  w-[394px] pl-[32px] text-[10px] font-['Rubik_Mono_One'] h-[40px] mx-[20px] rounded-[15px] cookie" 
                value={loginCookie}
                onChange={handleCookieChange}
                />
              <span onClick={handleInputType}>
                <img className="absolute top-3 right-9" src="/img/show_eye.png" />
              </span>  
            </div>
            <div 
              className="flex items-center cursor-pointer justify-center mt-6 "
              onClick={handleCheckboxChange}
              >
              <p className="uppercase font-['Rubik_Mono_One'] font-normal leading-3 text-[10px] text-center tracking-[0.045px] text-white">Lorem Ipsum is simply</p>
              <input 
                type='checkbox' 
                className="mx-4 simply_icon bg-black border-gray-300 rounded"
                checked={checkbox}
                onClick={handleCheckboxChange}
                to-transparent
                />
            </div>
            <div className="flex">
              <p className="mx-auto font-['Rubik_Mono_One'] uppercase font-normal text-[9px] leading-3 text-center tracking-[0.045em] text-white w-[325px] mt-[18px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
              </p>
            </div>
          </div>
          <div className="flex mt-[12px] justify-center">
            <button 
              className="login_button mt-[12px]"
              onClick={login}
              >
              LOGIN  
            </button> 
          </div>
          {loginCheck==1&&
            <div className="login_footer mt-4 flex items-center justify-center">
              <p className="font-['Rubik_Mono_One'] uppercase text-white text-[14px] leading-4 tracking-[0.045em] text-center ">Login succesful</p>
            </div>
          }
          {loginCheck==2&&
            <div className="login_footer1 mt-4 flex items-center justify-center">
              <p className="font-['Rubik_Mono_One'] uppercase text-white text-[14px] leading-4 tracking-[0.045em] text-center ">Wrong Cookie</p>
            </div>  
          }
        </div>
      </div>
    </div>
  );
}
