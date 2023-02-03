import async from "async";
import React, { ChangeEvent, useContext, useMemo, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { User } from "../../App";
import { SocketContext } from "../../context/Socket";
import "../../style/coinflip.css";
import { Coin } from "../../types/enum/Coin";
import { errorNotif } from "../../utils/notifications/errorNotif";
import { warningNotif } from "../../utils/notifications/warningNotif";
import { Create } from "./Create";
import { History } from "./History";
import { Join } from "./Join";
import { View } from "./View";


export enum CoinflipWindows {
  None,
  Join,
  History,
  View,
  Create,
}

enum GameAction {
  add,
  delete,
}

interface CoinflipProps {
  user: User | null;
}

enum Bool {
  false = "0",
  true = "1",
}

export interface Coinflip {
  id: string;
  hostId: number;
  hostSocketId: string;
  playerId: number | null;
  hostLimiteds: number[];
  playerLimiteds: number[];
  hostBet: Coin;
  result: Bool;
  settledAt: Date | null;
  price: number;
} 
let testData: Coinflip[] = [{
    id: '1',
    hostId: 1,
    hostSocketId: '1',
    playerId: 1,
    hostLimiteds: [1,2,3,4],
    playerLimiteds: [1,2,3],
    hostBet: Coin.orange,
    result: Bool.false,
    settledAt:  null,
    price: 400
  },{
    id: '1',
    hostId: 1,
    hostSocketId: '1',
    playerId: 1,
    hostLimiteds: [1,2,3,4],
    playerLimiteds: [1,2,3],
    hostBet: Coin.orange,
    result: Bool.false,
    settledAt:  null,
    price: 400
  },{
    id: '1',
    hostId: 1,
    hostSocketId: '1',
    playerId: 1,
    hostLimiteds: [1,2,3,4],
    playerLimiteds: [1,2,3],
    hostBet: Coin.green,
    result: Bool.false,
    settledAt:  null,
    price: 400
  },{
    id: '1',
    hostId: 1,
    hostSocketId: '1',
    playerId: 1,
    hostLimiteds: [3,4],
    playerLimiteds: [1,3],
    hostBet: Coin.green,
    result: Bool.false,
    settledAt:  null,
    price: 400
  },
  {
    id: '1',
    hostId: 1,
    hostSocketId: '1',
    playerId: 1,
    hostLimiteds: [1,2,3,4],
    playerLimiteds: [1,2,3],
    hostBet: Coin.green,
    result: Bool.false,
    settledAt:  null,
    price: 1
  },{
    id: '1',
    hostId: 1,
    hostSocketId: '1',
    playerId: 1,
    hostLimiteds: [1,2,3,4],
    playerLimiteds: [1,2,3],
    hostBet: Coin.green,
    result: Bool.false,
    settledAt:  null,
    price: 1
  },{
    id: '1',
    hostId: 1,
    hostSocketId: '1',
    playerId: 1,
    hostLimiteds: [1,2,3,4],
    playerLimiteds: [1,2,3],
    hostBet: Coin.orange,
    result: Bool.false,
    settledAt:  null,
    price: 1
  },{
    id: '1',
    hostId: 1,
    hostSocketId: '1',
    playerId: 1,
    hostLimiteds: [1,2,3,4],
    playerLimiteds: [1,2,3],
    hostBet: Coin.green,
    result: Bool.false,
    settledAt:  null,
    price: 1
  }
];
export function Coinflip({ user }: CoinflipProps) {
  const [window, setWindow] = useState<CoinflipWindows>(0);
  const [cookies, setCookie, removeCookie] = useCookies(["loginCookie"]);
  const socket = useContext(SocketContext);
  const [games, setGames] = useState<Coinflip[]>(testData);
  const [prevLoggedIn, setPrevLoggedIn] = useState(false);
  const [stats, setStats] = useState({ green: 0, orange: 0, value: 0 });
  
    
  useMemo(() => {
    if (user) {
      socket.emit(
        "/findAllGames",
        { cookie: cookies.loginCookie },
        async (games: any) => {
          if (!Array.isArray(games)) {
            warningNotif("Login to see the games");
            return;
          }
          const gamesWithPrice = await async.map(games, async (game: any) => {
            const price = await (
              await fetch(`/limiteds/price/${game.hostLimiteds.join("+")}`)
            ).json();
            return { ...game, price: price.price };
          });
          setGames(gamesWithPrice);
        }
      );
      socket.on("/coinflip", async (res: any) => {
        if (res?.gameAction === GameAction.add) {
          const price = await (
            await fetch(`/limiteds/price/${res.game.hostLimiteds.join("+")}`)
          ).json();
          const gameWithPrice = { ...res.game, price: price.price };
          setGames((actualState) => {
            return [...actualState, gameWithPrice];
          });
        } else if (res?.gameAction === GameAction.delete) {
          setGames((actualState) => {
            return actualState.filter(
              (e) => e.hostSocketId !== res.hostSocketId
            );
          });
        }
      });
      (async () => {
        const stats = await (await fetch("/games/stats")).json();
        let green = 0;
        let orange = 0;
        let value = 0;
        if (typeof stats?.green === 'number') {
          green = stats.green;
        }
        if (typeof stats?.orange === 'number') {
          orange = stats.orange;
        }
        if (typeof stats?.value === 'number') {
          value = stats.value;
        }
        const safeStats = {green, orange, value}
        setStats(safeStats);
      })();
    }
  }, [user?.UserID]);
  const [viewId, setViewId] = useState("");
  const handleView = (e: React.MouseEvent<HTMLSpanElement>) => {
    setViewId(e.currentTarget.id);
    setWindow(CoinflipWindows.View);
  };
  
  
  
  return (
    
    <>
      <div className="gameContainer h-[695px] pr-[154px]">
        <div className="img">
          <img src="/img/confnflip.png" alt="" />
        </div>
        <div className="block 2xl:flex justify-between items-end pr-10">
          <div className="block sm:flex sm:justify-between w-[100%] 2xl:w-[40%] ">
            <div className="w-full mt-5 sm:w-[49%] h-[82px] rounded-[14px] value_div  block pt-4">
              <b className="font-['Rubik_Mono_One'] block  font-normal text-2xl leading-7 ml-6 -tracking-[0.12em] text-white">70,329</b> 
              {/* {stats.value}   */}
              <span className="ml-6 font-[Robik_Mono_One font-normal text-base leading-5 text-[#FFFFFF]">Value</span>
            </div>
            <div className="w-full mt-5 sm:w-[49%] h-[82px] rounded-[14px] games_value  block pt-4">
              <b className="font-['Rubik_Mono_One'] block  font-normal text-2xl leading-7 ml-6 -tracking-[0.12em] text-white">123</b> 
              {/* {games.length}   */}
              <span className="ml-6 font-[Robik_Mono_One font-normal text-base leading-5 text-[#FFFFFF]">Games</span>
            </div>
          </div>
          <div className="  block sm:flex w-full mt-5 2xl:w-[58%] bg-[#181C33] items-center p-3 rounded-[14px] justify-between">
            <div className="flex items-center w-full sm:block sm:mt-0 sm:w-[40%] lg:w-[20%] ">
              <p className="leading-4 text-[14px] font-normal white-alpa  ml-[20px]">PAST 100</p>
              <div className="flex ml-[20px] gap-3">
                <div className="flex items-center gap-2">
                  <img src="/img/blex1.png" />
                  <span className=" text-[10px] text-[#82F6F4]">33</span>
                  {/*  {stats.orange}*/}
                </div>
                <div className="flex items-center gap-2">
                  <img src="/img/blex2.png" />
                  <span className="text-[10px] text-[##A282FE]">33</span>
                  {/* {stats.green} */}
                </div>
              </div>
            </div>
            <div className="mt-5 block sm:mt-0 w-full sm:w-[70%] sm:flex lg:w-[42%] justify-between px-4 items-center">
              <p className="w-full sm:w-auto cursor-pointer text-[#475493] font-['Rubik_Mono_One'] text-[14px] leading-4" onClick={() => setWindow(CoinflipWindows.History)}>History</p>
              <button className="w-full mt-5 sm:w-[40%]  bg-[#2FA1F3] p-2 rounded-2xl uppercase font-['Rubik_Mono_One']" onClick={() => setWindow(CoinflipWindows.Create)}>
                Create
              </button>
            </div>
          </div>
        </div>
        
        <ul className="pr-10 h-[400px]"  id="style-1">
          
          {games.map((e) => {
            return (
              <li key={e.id} id={e.id} className="block xl:flex justify-between">
                <div className="w-100% blcok lg:flex items-center justify-between xl:w-[80%] 2xl:w-60%">
                  <div className="flex w-full lg:w-[40%] justify-between">
                    <div className="vs w-full sm:w-auto flex justify-between">
                      <div className="bg-[#9877FE] h-[60px] w-[60px] border-[#3A96F4] border-[3px] rounded-[30px]">
                        {/* <img
                          src={`https://www.roblox.com/asset-thumbnail/image?assetId=${e?.hostId}&width=150&height=150&format=png`}
                          alt="user"
                        /> */}
                      </div>
                      <b className="mx-3">VS</b>
                      <div className="bg-[#9877FE] h-[60px] w-[60px] border-[#3A96F4] border-[3px] rounded-[30px]">
                        {/* <img
                          src={`https://www.roblox.com/asset-thumbnail/image?assetId=${e?.hostId}&width=150&height=150&format=png`}
                          alt="user"
                        /> */}
                      </div> 
                    </div>
                    <img
                      className="imgBlex hidden sm:block"
                      src={
                        e.hostBet === Coin.green
                          ? "/img/token.png"
                          : "/img/talis.png"
                      }
                      alt="token"
                    />
                  </div>
                  <div className="flex w-full lg:w-[50%] mt-3 lg:mt-0 justify-between">
                    <div className="flex w-[50%]">
                      {e.hostLimiteds.slice(0, 3).map((e, i) => {
                          return (
                            <div className="w-[46px] -ml-4 h-[46px] bg-[#2C2241] rounded-[23px] border-[#483969] border-[4px] ">

                            </div>
                        // <img
                        //   key={e + i}  
                        //   src={`https://www.roblox.com/asset-thumbnail/image?assetId=${e}&width=150&height=150&format=png`}
                        //   alt="item"
                        // />
                        );
                      })}
                        
                    </div>
                    <div className="w-[50%] text-center">
                      <b className="text-[#5DDB5E] text-center text-[24px] flex justify-center">{e.price} <span className="text-[15px] mt-1"> R$</span></b>
                      <span className="text-[#2D2341] text-[12px]">300 - 500</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-[100%] mt-4 xl:w-[14%] xl:mt-0">
                  <span id={e.id} className="text-[#483969] bg-[#312748] cursor-pointer pt-1 text-center rounded-[9px] h-[29px] w-[45%]" onClick={handleView}>
                    View
                  </span>
                  <button className="w-[50%] bg-[#2FA1F3] rounded-[9px] h-[29px]" onClick={() => setWindow(CoinflipWindows.Join)}>
                    Join
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {(() => {
        switch (window) {
          case CoinflipWindows.Join:
            return (
              <Join setWindow={setWindow} username={user?.UserName || null} />
            );
          case CoinflipWindows.History:
            return (
              <History
                setWindow={setWindow}
                setViewId={setViewId}
                user={user}
              />
            );
          case CoinflipWindows.View:
            return <View setWindow={setWindow} gameId={viewId} />;
          case CoinflipWindows.Create:
            return (
              <Create setWindow={setWindow} username={user?.UserName || null} />
            );
        }
      })()}
    </>
  );
}
