import {
  faAngleDown,
  faQuestion,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useCookies } from "react-cookie";
import { User } from "../../App";
import { SocketContext } from "../../context/Socket";
import { Coin } from "../../types/enum/Coin";
import { CoinflipWindow } from "../../types/interfaces/coinflipWindow";
import { errorNotif } from "../../utils/notifications/errorNotif";
import { CoinflipWindows } from "./Coinflip";
import async from "async";
import { toLowerKeys } from "../../utils/toLowerKeys";
interface CreateProps {
  setWindow: Dispatch<SetStateAction<CoinflipWindows>>;
  username: string | null;
}

export function Create({ setWindow, username }: CreateProps) {
  const [cookies, setCookie, removeCookie] = useCookies(["loginCookie"]);
  const socket = useContext(SocketContext);
  const [blxItems, setBlxItems] = useState<any[]>([]);
  const [actionIds, setActionIds] = useState<number[]>([]);
  const [coin, setCoin] = useState<Coin | null>(null);
  const [game, setGame] = useState(false);
  const [playerItems, setPlayerItems] = useState<any[]>([]);
  const [coinflip, setCoinflip] = useState<any>();
  const clickParent = (event: React.MouseEvent) => {
    event.preventDefault();
    let dataValue = (event.target as HTMLElement).getAttribute("data-value");
    if (dataValue) {
      socket.emit("/disconnect");
      setWindow(0);
    }
  };
  const createCoinflip = () => {
    socket.emit(
      "/create",
      { cookie: cookies.loginCookie, assetIds: actionIds, coin },
      (response: any) => {
        if (response?.error) {
          errorNotif(response.error);
          return;
        }
        setGame(true);
        setCoinflip(response);
        socket.on("/coinflipJoin", async (game: any) => {
          if (game?.error) {
            return;
          }
          const playerUsername = await (
            await fetch(`/users/username/${game.playerId}`)
          ).json();
          game.playerUsername = playerUsername.name;
          const itemsWithData = await async.map(
            game.playerLimiteds,
            async (item: any) => {
              const res = await (await fetch(`/limiteds/data/${item}`)).json();
              return toLowerKeys(res);
            }
          );
          setPlayerItems(itemsWithData);
          setCoinflip(game);
          socket.on("/update", (game: any) => {
            if (!game.playerId) {
              setPlayerItems([]);
            }

            setCoinflip((prev: any) => {
              const obj = {...prev}
              return { ...obj, ...game };
            });
          });
        });
      }
    );
  };
  useEffect(() => {
    (async () => {
      const items = await (await fetch("/limiteds/blx")).json();
      if (items?.error) {
        errorNotif("Something went wrong. Try again later");
        return;
      }
      const itemsWithData = await async.map(items, async (item: any) => {
        return toLowerKeys(
          await (await fetch(`/limiteds/data/${item.assetId}`)).json()
        );
      });
      setBlxItems(itemsWithData);
    })();
  }, []);
  const setToAction = (e: React.MouseEvent<HTMLElement>) => {
    const id = parseInt(e.currentTarget.id);
    setActionIds((prev) => [...prev, id]);
    setBlxItems((prev) =>
      prev.map((e) => {
        if (e.assetId === id && e?.added) {
          setActionIds((prev) => prev.filter((e) => e !== id));
          return {
            assetId: id,
            name: e.name,
            added: false,
          };
        } else if (e.assetId === id) {
          return {
            assetId: id,
            name: e.name,
            added: true,
          };
        }
        return e;
      })
    );
  };
  const cancel = () => {
    socket.emit("/cancel", { cookie: cookies.loginCookie });
    setWindow(0);
  };
  const confirm = () => {
    socket.emit(
      "/confirm",
      { cookie: cookies.loginCookie },
      async (game: any) => {
        setCoinflip((prev: any) => {
          const obj = {...prev}
          return { ...obj, ...game };
        });
      }
    );
  };
  if (game) {
    return (
      <div className="blurContainer" data-value="parent" onClick={clickParent}>
        <div className="container">
          <div
            className="x"
            onClick={() => {
              socket.emit("/disconnect");
              setWindow(0);
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </div>
          <img className="logo" src="/img/logo.png" alt="logo" />
          <div className="view">
            <div className="players">
              <div>
                <img
                  src={`https://www.roblox.com/asset-thumbnail/image?assetId=${coinflip?.hostId}&width=150&height=150&format=png`}
                  alt="user"
                />
                <b>{username}</b>
                <img
                  className="absolute"
                  src={
                    coinflip.hostBet === Coin.green
                      ? "/img/token.webp"
                      : "/img/talis.webp"
                  }
                  alt="token"
                />
              </div>
              <div>
                {(() => {
                    if (coinflip.hostBet === "0" && coinflip.result === "1") {
                      return <img src="/img/token.webp" alt="token" />;
                    }
                     if (coinflip.hostBet === "1" && coinflip.result === "1") {
                      return <img src="/img/talis.webp" alt="token" />;
                     } 
                     if (coinflip.hostBet === "0" && coinflip.result === "0") {
                      return <img src="/img/talis.webp" alt="token" />;
                     }
                     if (coinflip.hostBet === "1" && coinflip.result === "0") {
                      return <img src="/img/token.webp" alt="token" />;
                     }
                    return <FontAwesomeIcon icon={faQuestion} />;
                  }
                )()}
                {/* <img src="/img/token.webp" alt="token" /> */}
              </div>
              <div>
                <img
                  src={
                    coinflip?.playerId
                      ? `https://www.roblox.com/asset-thumbnail/image?assetId=${coinflip?.playerId}&width=150&height=150&format=png`
                      : "/img/exampleuser.png"
                  }
                  alt="user"
                />
                <b>
                  {coinflip?.playerUsername
                    ? coinflip.playerUsername
                    : "Waiting for player to join"}
                </b>
                <img
                  className="absolute"
                  src={
                    coinflip.hostBet === Coin.orange
                      ? "/img/token.webp"
                      : "/img/talis.webp"
                  }
                  alt="token"
                />
              </div>
            </div>
            <div className="itemsContainer">
              <ul className="items border">
                {blxItems.map((item, i) => {
                  return (
                    <li className={"item noClick"} key={item.assetId + i}>
                      <img
                        src={`https://www.roblox.com/asset-thumbnail/image?assetId=${item.assetId}&width=150&height=150&format=png`}
                        alt="item"
                      />
                      <p>{item.name}</p>
                      {/* <b>110</b> */}
                      {/* <div>
              <span>Xyz</span>
              <span>Xyz</span>
            </div> */}
                    </li>
                  );
                })}
              </ul>
              {playerItems.length ? (
                <ul className="items border">
                  {playerItems.map((item, i) => {
                    return (
                      <li className={"item noClick"} key={item.assetId + i}>
                        <img
                          src={`https://www.roblox.com/asset-thumbnail/image?assetId=${item.assetId}&width=150&height=150&format=png`}
                          alt="item"
                        />
                        <p>{item.name}</p>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
            {coinflip.result ? null : (
              <div className='btnContainer'>
                {coinflip.hostReady === "1" ? <button className='defaultBtn' onClick={cancel}>Cancel</button> : <button className='defaultBtn' onClick={confirm}>Confirm</button>}     
              </div>
            )}
          </div>
          {/* <div className="status">Ended at Tue, 20 Sep 2022 14:43:43 GMT+2</div> */}
        </div>
      </div>
    );
  }
  return (
    <div className="create-clip px-[68px]" data-value="parent" onClick={clickParent}>
      <div className="h-[50px] mt-[22px]">
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px] rounded-[25px] bg-[#2C2241] border-4 border-[#9877FE]">
          </div>
          <div className="mt-2">
            <h1 className="text-[20px] leading-5 text-white">gamer21</h1>
            <p className="text-[12px] leading-4 text-white text-center opacity-40">you</p>
          </div>
        </div>
      </div>
      <div className="h-[440px] overflow-y-auto pr-5 block xl:flex items-center justify-between pb-4">
        <div className="w-[100%] xl:w-[34%] h-[390px] pr-[5%] bg-your-items">
          <p className="text-[20px] text-white leading-5 text-center mt-3">your items</p>
          <img src="/img/item.png" className="mx-auto mt-[66px]"></img>
          <p className="text-center text-white text-[20px] leading-5 mt-7">worth <span className="text-[#5DDB5E]">130r$</span></p>
          <div className="flex justify-center gap-6 mt-3">
            <button className="bg-[#232D4F] w-[102px] h-11 rounded-lg hover:bg-[#2FA1F3] text-[#0D111E]  hover:text-white text-base leading-5">add</button>
            <button className="bg-[#232D4F] w-[112px] h-11 rounded-lg hover:bg-[#2FA1F3] text-[#0D111E] hover:text-white text-base leading-5">ready</button>
          </div>
        </div>
        <div className="w-[100%] mt-5 xl:mt-5 xl:w-[35%] h-[440px] xl:absolute left-[33%] bg-your-items rounded-[26px] boder-liner border-[#8801B9] border-4">
          <div className="mx-[30px] mt-[30px] rounded-[26px] flex justify-center items-center h-[292px] bg-[#0F1424]">
            <img src="/img/talis.png" alt="tails" className="w-[237px]" />
          </div>
          <div className="mx-[41px] h-[69px] rounded-[29px] bg-[#181C33] mt-[18px] pt-[13px] ">
            <p className="text-white text-[20px] leading-6 text-center ">potential win:</p>
            <p className="text-[#5DDB5E] mx-auto text-[20px] leading-6 text-center">250u$</p>
          </div>
        </div>
        <div className="w-full mt-5 xl:mt-0 xl:w-[32%] h-[390px] flex justify-center items-center bg-your-items">
          <div className="flex gap-3 mx-auto">
            <div className="bg-[#232D4F] w-[24px] rounded-[12px] h-[24px]"></div>
            <div className="bg-[#232D4F] w-[24px] rounded-[12px] h-[24px]"></div>
            <div className="bg-[#232D4F] w-[24px] rounded-[12px] h-[24px]"></div>
          </div>  
        </div>
      </div>
      <div className="create-flip-bottom pt-10">

      </div>
    </div>
  );
}
