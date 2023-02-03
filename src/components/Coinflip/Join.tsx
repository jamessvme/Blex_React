import {
  faAngleDown,
  faQuestion,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { SocketContext } from "../../context/Socket";
import { Coin } from "../../types/enum/Coin";
import { CoinflipWindow } from "../../types/interfaces/coinflipWindow";
import { errorNotif } from "../../utils/notifications/errorNotif";
import { toLowerKeys } from "../../utils/toLowerKeys";
import async from "async";
import { CoinflipWindows } from "./Coinflip";

interface JoinProps {
  setWindow: Dispatch<SetStateAction<CoinflipWindows>>;
  username: string | null;
}

export function Join({ setWindow, username }: JoinProps) {
  const [actionIds, setActionIds] = useState<number[]>([]);
  const [blxItems, setBlxItems] = useState<any[]>([]);
  const [coinflip, setCoinflip] = useState<any>();
  const [cookies, setCookie, removeCookie] = useCookies(["loginCookie"]);
  const [hostItems, setHostItems] = useState<any[]>([]);
  const clickParent = (event: React.MouseEvent) => {
    event.preventDefault();
    let dataValue = (event.target as HTMLElement).getAttribute("data-value");
    if (dataValue) {
      socket.emit("/disconnect");
      setWindow(0);
    }
  };
  const socket = useContext(SocketContext);
  const joinCoinflip = () => {
    socket.emit(
      "/join",
      { cookie: cookies.loginCookie, assetIds: actionIds },
      async (game: any) => {
        if (game?.error) {
          errorNotif(game.error);
          return;
        }

        const hostUsername = await (
          await fetch(`/users/username/${game.hostId}`)
        ).json();
        game.hostUsername = hostUsername.name;
        const itemsWithData = await async.map(
          game.hostLimiteds,
          async (item: any) => {
            const res = await (await fetch(`/limiteds/data/${item}`)).json();
            return toLowerKeys(res);
          }
        );
        setHostItems(itemsWithData);
        setCoinflip(game);
        socket.on("/update", (game: any) => {
          if (!game) {
            setCoinflip(null);
            return;
          }

          setCoinflip((prev: any) => {
            const obj = { ...prev };
            return { ...obj, ...game };
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
    console.log(actionIds);
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
          const obj = { ...prev };
          return { ...obj, ...game };
        });
      }
    );
  };
  if (coinflip) {
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
      <div className="h-[440px] overflow-y-auto mr-5 block xl:flex items-center justify-between pb-4">
        <div className="w-[34%] h-[390px] pr-[5%] bg-your-items">
          <p className="text-[20px] text-white leading-5 text-center mt-3">your items</p>
          <img src="/img/item.png" className="mx-auto mt-[66px]"></img>
          <p className="text-center text-white text-[20px] leading-5 mt-7">worth <span className="text-[#5DDB5E]">130r$</span></p>
          <div className="flex justify-center gap-6 mt-3">
            <button className="bg-[#232D4F] w-[102px] h-11 rounded-lg hover:bg-[#2FA1F3] text-[#0D111E]  hover:text-white text-base leading-5">add</button>
            <button className="bg-[#232D4F] w-[112px] h-11 rounded-lg hover:bg-[#2FA1F3] text-[#0D111E] hover:text-white text-base leading-5">ready</button>
          </div>
        </div>
        <div className="w-[35%] h-[440px] absolute left-[33%] bg-your-items rounded-[26px] border-[#8801B9] border-4">
          <div className="mx-[30px] mt-[30px] rounded-[26px] flex justify-center items-center h-[292px] bg-[#0F1424]">
            <img src="/img/talis.png" alt="tails" className="w-[237px]" />
          </div>
          <div className="mx-[41px] h-[69px] rounded-[29px] bg-[#181C33] mt-[18px] pt-[13px] ">
            <p className="text-white text-[20px] leading-6 text-center ">potential win:</p>
            <p className="text-[#5DDB5E] mx-auto text-[20px] leading-6 text-center">250u$</p>
          </div>
        </div>
        <div className="w-[32%] h-[390px] flex justify-center items-center bg-your-items">
          <div className="flex gap-3 mx-auto">
            <div className="bg-[#232D4F] w-[24px] rounded-[12px] h-[24px]"></div>
            <div className="bg-[#232D4F] w-[24px] rounded-[12px] h-[24px]"></div>
            <div className="bg-[#232D4F] w-[24px] rounded-[12px] h-[24px]"></div>
          </div>  
        </div>
      </div>
      <div className="create-flip-bottom mt-10">

      </div>
    </div>
  );
}
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
      <div className="h-[440px] overflow-auto block  xl:flex items-center justify-between pb-4">
        <div className="w-full mt-5 xl:mt-0 xl:w-[34%] h-[390px] pr-[5%] bg-your-items">
          <p className="text-[20px] text-white leading-5 text-center pt-5 xl:pt-0 mt-3">your items</p>
          <img src="/img/item.png" className="mx-auto mt-[66px]"></img>
          <p className="text-center text-white text-[20px] leading-5 mt-7">worth <span className="text-[#5DDB5E]">130r$</span></p>
          <div className="flex justify-center gap-6 mt-3">
            <button className="bg-[#232D4F] w-[102px] h-11 rounded-lg hover:bg-[#2FA1F3] text-[#0D111E]  hover:text-white text-base leading-5">add</button>
            <button className="bg-[#232D4F] w-[112px] h-11 rounded-lg hover:bg-[#2FA1F3] text-[#0D111E] hover:text-white text-base leading-5">ready</button>
          </div>
        </div>
        <div className="w-full mt-5 xl:mt-0 xl:w-[35%] h-[440px] xl:absolute left-[33%] bg-your-items rounded-[26px] border-[#8801B9] border-4">
          <div className="mx-[30px] mt-[30px] rounded-[26px] flex justify-center items-center h-[292px] bg-[#0F1424]">
            <img src="/img/talis.png" alt="tails" className="w-[237px]" />
          </div>
          <div className="mx-[41px] h-[69px] rounded-[29px] bg-[#181C33] mt-[18px] pt-[13px] ">
            <p className="text-white text-[20px] leading-6 text-center ">potential win:</p>
            <p className="text-[#5DDB5E] mx-auto text-[20px] leading-6 text-center">250u$</p>
          </div>
        </div>
        <div className="w-full mt-5 xl:mt-0 xl:w-[34%] h-[390px] pl-[5%] bg-your-items">
          <p className="text-[20px] text-white leading-5 text-center pt-5 xl:pt-0 mt-3">Enemy items</p>
          <img src="/img/item.png" className="mx-auto mt-[66px]"></img>
          <p className="text-center text-white text-[20px] leading-5 mt-7 opacity-60">worth <span className="text-[#5DDB5E]">130r$</span></p>
          <div className="flex justify-center mt-3">
            <button className="w-[112px] h-11 rounded-lg  text-[#9877FE] tracking-[0.03em] text-[32px] hover:text-white text-base leading-5">ready</button>
          </div>
        </div>
      </div>
      <div className="create-flip-bottom mt-10">

      </div>
    </div>
  );
}

// export function Join({ setWindow }: CoinflipWindow) {

//   const clickParent = (event: React.MouseEvent) => {
//     event.preventDefault();
//     let dataValue = (event.target as HTMLElement).getAttribute("data-value");
//     if (dataValue) {
//       setWindow(0);
//     }
//   };
//   const socket = useContext(SocketContext)
//   return (
//     <div className="blurContainer" data-value="parent" onClick={clickParent}>
//       <div className="container">
//         <div className="x" onClick={() => setWindow(0)}>
//           <FontAwesomeIcon icon={faX} />
//         </div>
//         <div className="options">
//           <b>Your option</b>
//           <div>
//             <img src="/img/token.webp" alt="token" />
//             <img src="/img/talis.webp" alt="token" />
//           </div>
//         </div>
//         <div className="selectItems">
//           <b>Select your items</b>
//           <div>
//             <input type="text" placeholder="Search" />
//             <div>
//               Highest value <FontAwesomeIcon icon={faAngleDown} />
//             </div>
//           </div>
//         </div>
//         <h2>Total Value R$ 110</h2>
//         <div className="items">
//           <div className="item">
//             <img src="/img/exampleuser.png" alt="item" />
//             <p>Saber Boss</p>
//             <b>110</b>
//             <div>
//               <span>Xyz</span>
//               <span>Xyz</span>
//             </div>
//           </div>
//         </div>
//         <div className="checkout">
//           <div>
//             <b>
//               Selected Items:R$<span> 0</span>
//             </b>
//             <b>
//               Advanced <FontAwesomeIcon icon={faAngleDown} />
//             </b>
//           </div>
//           <div>
//             <p>123k - R$123k</p>
//             <button>Submit</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
