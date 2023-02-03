import {
  faAngleDown,
  faKey,
  faQuestion,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import async from "async";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Coin } from "../../types/enum/Coin";
import { CoinflipWindow } from "../../types/interfaces/coinflipWindow";
import { toLowerKeys } from "../../utils/toLowerKeys";
import { CoinflipWindows } from "./Coinflip";
interface ViewProps {
  setWindow: Dispatch<SetStateAction<CoinflipWindows>>;
  gameId: string;
}

export function View({ setWindow, gameId }: ViewProps) {
  const clickParent = (event: React.MouseEvent) => {
    event.preventDefault();
    let dataValue = (event.target as HTMLElement).getAttribute("data-value");
    if (dataValue) {
      setWindow(0);
    }
  };
  const [coinflip, setCoinflip] = useState<any>(null);
  const [hostItems, setHostItems] = useState<any[]>([]);
  const [playerItems, setPlayerItems] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const game = await (await fetch(`/games/coinflip/${gameId}`)).json();
      const hostUsername = await (
        await fetch(`/users/username/${game.hostId}`)
      ).json();
      game.hostUsername = hostUsername.name;
      if (game?.playerId) {
        const playerUsername = await (
          await fetch(`/users/username/${game.playerId}`)
        ).json();
        game.playerUsername = playerUsername.name;
        const playerItemsWithData = await async.map(
          game.playerLimiteds,
          async (item: any) => {
            const res = await (await fetch(`/limiteds/data/${item}`)).json();
            const price = await (await fetch(`/limiteds/price/${item}`)).json();
            res.price = price.price
            return toLowerKeys(res);
          }
        );
        setPlayerItems(playerItemsWithData);
      }
      const hostItemsWithData = await async.map(
        game.hostLimiteds,
        async (item: any) => {
          const res = await (await fetch(`/limiteds/data/${item}`)).json();
          const price = await (await fetch(`/limiteds/price/${item}`)).json();
            res.price = price.price
          return toLowerKeys(res);
        }
      );
      setHostItems(hostItemsWithData);
      setCoinflip(game);
    })();
  }, []);

  return (
    <div className="create-clip px-[68px]" data-value="parent" onClick={clickParent}>
      <div className="h-[50px] mt-[22px] flex">
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px] rounded-[25px] bg-[#2C2241] border-4 border-[#9877FE]">
          </div>
          <div className="mt-2">
            <h1 className="text-[20px] leading-5 text-white">gamer21</h1>
            <p className="text-[12px] leading-4 text-white text-center opacity-40">you</p>
          </div>
        </div>
        <div className="flex items-center gap-4 ml-[60%]">
          <div className="w-[50px] h-[50px] rounded-[25px] bg-[#2C2241] border-4 relative border-[#9877FE]">
            <div className="h-[34px] w-[34px] absolute bg-[#77BB7A] rounded-[17px] -left-5 top-6"></div>
          </div>
          <div className="mt-2">
            <h1 className="text-[20px] leading-5 text-white">gamer21</h1>
            <p className="text-[12px] leading-4 text-white text-center opacity-40">emomy</p>
          </div>
        </div>
      </div>
      <div className="h-[440px] overflow-y-auto pr-5 block xl:flex items-center justify-between pb-4">
        <div className="w-full xl:w-[34%] mt-5 xl:mt-0 h-[390px] pt-5 xl:pt-0 pr-[5%] bg-your-items">
          <p className="text-[20px] text-white leading-5 text-center mt-3">your items</p>
          <img src="/img/item.png" className="mx-auto mt-[66px]"></img>
          <p className="text-center text-white text-[20px] leading-5 mt-7">worth <span className="text-[#5DDB5E]">130r$</span></p>
          <div className="flex justify-center gap-6 mt-3">
            <button className=" h-11 rounded-lg  text-[#232D4F;] tracking-[0.03em] text-[32px] hover:text-white text-base leading-5">unready</button>
          </div>
        </div>
        <div className="w-full xl:w-[35%] mt-5 xl:mt-0 h-[440px] xl:absolute left-[33%] bg-your-items rounded-[26px] border-[#8801B9] border-4">
          <div className="mx-[30px] mt-[30px] rounded-[26px] flex justify-center items-center h-[292px] bg-[#0F1424]">
            <img src="/img/talis.png" alt="tails" className="w-[237px]" />
          </div>
          <div className="mx-[41px] h-[69px] rounded-[29px] bg-[#181C33] mt-[18px] pt-[13px] ">
            <p className="text-white text-[20px] leading-6 text-center ">potential win:</p>
            <p className="text-[#5DDB5E] mx-auto text-[20px] leading-6 text-center">250u$</p>
          </div>
        </div>
        <div className="w-full xl:w-[34%] mt-5 xl:mt-0 h-[390px] pl-[5%] bg-your-items">
          <p className="text-[20px] text-white leading-5 text-center pt-5 xl:pt-0 mt-3">Enemy items</p>
          <img src="/img/item.png" className="mx-auto mt-[66px]"></img>
          <p className="text-center text-white text-[20px] leading-5 mt-7 opacity-60">worth <span className="text-[#5DDB5E]">130r$</span></p>
          <div className="flex justify-center mt-3">
            <button className=" h-11 rounded-lg  text-[#232D4F;] tracking-[0.03em] text-[32px] hover:text-white text-base leading-5">unready</button>
          </div>
        </div>
      </div>
      <div className="create-flip-bottom mt-10">

      </div>
    </div>
  );
}
