import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronCircleDown,
  faCircleQuestion,
  faFileLines,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import React, { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MainWindows } from "../App";
import "../style/footer.css";
import { MainWindow } from "../types/interfaces/mainWindow";

interface footer2 {
  setWindow: Dispatch<SetStateAction<MainWindows>>;
  
}
export function Footer({ setWindow }: footer2) {
      return (
        <footer className="w-full bg-[#0E0D12] pt-5 px-[5%] z-10 relative">
            <img src="/img/footer_logo.png" className="mx-auto mt-15" />
            <h1 className="font-[12px] leading-4  text-white text-center font-['Rubik_Mono_One'] mt-5">
              Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
            </h1>
            <div className="text-center text-[10.1157px] font-normal  leading-[18px] mt-[22px] font-['Noto_Music'] w-[69%] mx-auto  text-white">
                Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur 
                Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur 
                Lorem ipsum dol
                or sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur 
                Lorem ipsum dolor sit amet, consectetur 
            </div>
        </footer>
      )
    
}
