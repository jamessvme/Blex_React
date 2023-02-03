import React, { Dispatch, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Hamburger from "hamburger-react";
import { Login } from './../components/Login';
import { MainWindows, User } from "../App";
interface MainHeaderProps {
  setWindow: Dispatch<SetStateAction<MainWindows>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export default function({ setWindow, user, setUser }: MainHeaderProps) {
	const [isOpen, setOpen] = useState(false);
	
	return (
		<>
			<header className="w-full flex justify-between items-center py-3 px-[2%]">
			<div className="logo">
				<img src="/img/logo.png" alt="logo" />
			</div>
			<div className="xl:hidden header">
				<Hamburger 
					toggled={isOpen} 
					toggle={setOpen}
					color="white"
				/>	
			</div> 
			<ul  className="menu hidden xl:flex gap-16">
				<li >
				<Link to="/">
					<img src="/img/home.png" alt="home" />
				</Link>
				</li>
				<li>
				<Link to="/stats">
					<img src="/img/starts.png" alt="home" />
				</Link>
				</li>
				<li>
				<Link to="/about">
					<img src="/img/about.png" alt="home" />
				</Link>
				</li>
		</ul>
			<div className="gap-16 hidden xl:flex">
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
			<div className="float-right hidden xl:block">
				<button onClick={() => setWindow(MainWindows.Login)} className="bg-[#2FA1F3]  my-auto rounded-[11.6px] font-['RubiK_Mono_One] text-[18.6px] w-[127px] h-[38px] tracking-[0.02em] leading-6 text-white">
						login
				</button>
			</div>     
			</header>
			{isOpen&&
				<ul className="w-100%  text-[#9877FE] border-blue-800  text-center">
					<li onClick={() => setOpen(false)} className="p-1 "><Link to="/" className=" text-[#9877FE]"> HOME</Link></li>
					<li onClick={() => setOpen(false)} className="p-1"><Link to="/stats" className=" text-[#9877FE]"> Stats</Link></li>
					<li onClick={() => setOpen(false)} className="p-1"><Link to="/about" className=" text-[#9877FE]"> about us</Link></li>
					<li onClick={() => {
						setOpen(false)
						setWindow(MainWindows.Login);
						}} className="p-1">
						Login
					</li>
				</ul>
			}
		</>
	)
}