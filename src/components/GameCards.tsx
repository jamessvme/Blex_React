import React from "react";
import { Link } from "react-router-dom";
import "../style/gameCards.css";
// import { Coinflip } from './../../../BLXBET-client-develop/src/components/Coinflip/Coinflip';
// import function from './../pages/Main2';

interface ContentProps {
  showChat: Boolean,
  setShowChat: Function
}

export function GameCards() {
  
  return (
    <div className=" w-[100%]  ">
      <div className="text-white text-center leading-[87px] text-[37.3px] font-normal tracking-[0.03em] font-['Rubik_Mono_One']">
        -GAMES 
      </div>
      <div className="w-[90%] lg:w-[70%] mx-auto overflow-y-auto h-[600px] pb-5 pr-[5%]">
        <div className="gameBox sm:grid sm:grid-cols-3 px-[5%] gap-[4%] pb-[10%]  rounded-[42px] ">
          <div className="card">
            <div className="flex text-center  items-center justify-center">
              <h1 className="font-['Rubik_Mono_One'] font-normal text-[19px] leading-[60px] text-white">JACKPORT</h1>
            </div>
            <div className=" flex items-center justify-center">
              <Link to='/jackpot'>
                <img className="z-20 relative cursor-pointer w-[100%]" src="img/jackpot_image.png" alt="jackpot" />
              </Link>
            </div>
            
          </div>
          <div className="card">
            <div className="flex text-center  items-center justify-center">
              <h1 className="font-['Rubik_Mono_One'] font-normal text-[19px] leading-[60px] text-white">Coinflip</h1>
            </div>
            <div className=" flex items-center justify-center">
              <Link to='/coinflip'>
                <img className="z-20 relative cursor-pointer w-[100%]" src="img/coinflip_image.png" alt="jackpot" />
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="flex text-center  items-center justify-center">
              <h1 className="font-['Rubik_Mono_One'] font-normal text-[19px] leading-[60px] text-white">RPS</h1>
            </div>
            <div className=" flex items-center justify-center">
              <Link to='/rps'>
                <img className="z-20 relative cursor-pointer w-[100%]" src="img/rps_image.png" alt="jackpot" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
