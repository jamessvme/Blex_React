import { faAngleDown, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import async from "async";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { User } from "../../App";
import { SocketContext } from "../../context/Socket";
import { Coin } from "../../types/enum/Coin";
import { CoinflipWindow } from "../../types/interfaces/coinflipWindow";
import { warningNotif } from "../../utils/notifications/warningNotif";
import { Coinflip, CoinflipWindows } from "./Coinflip";
interface HistoryProps {
  setWindow: Dispatch<SetStateAction<CoinflipWindows>>;
  setViewId: Dispatch<SetStateAction<string>>;
  user: User | null;
}
export function History({ setWindow, setViewId, user }: HistoryProps) {
  const clickParent = (event: React.MouseEvent) => {
    event.preventDefault();
    let dataValue = (event.target as HTMLElement).getAttribute("data-value");
    if (dataValue) {
      setWindow(0);
    }
  };
  const [games, setGames] = useState<Coinflip[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies(["loginCookie"]);
  const handleView = (e: React.MouseEvent<HTMLSpanElement>) => {
    setViewId(e.currentTarget.id);
    setWindow(CoinflipWindows.View);
  };
  const socket = useContext(SocketContext);
  useEffect(() => {
    (async () => {
      if (user) {
        const games = await (await fetch("/games/coinflip")).json();
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
    })();
  }, []);
  return (
    <div className="blurContainer" data-value="parent" onClick={clickParent}>
      <div className="container">
        <div className="x" onClick={() => setWindow(0)}>
          <FontAwesomeIcon icon={faX} />
        </div>
        <h1>History</h1>
        <ul className="users">
          {games.map((e) => {
            return (
              <li key={e.id} id={e.id}>
                <div className="vs">
                  <img
                    src={`https://www.roblox.com/asset-thumbnail/image?assetId=${e?.hostId}&width=150&height=150&format=png`}
                    alt="user"
                  />
                  {/* <b>VS</b>
              <img src="/img/exampleuser.png" alt="user" /> */}
                </div>
                <img
                  src={
                    e.hostBet === Coin.green
                      ? "/img/token.webp"
                      : "/img/talis.webp"
                  }
                  alt="token"
                />
                <div className="items">
                  {e.hostLimiteds.slice(0, 3).map((e, i) => {
                    return (
                      <img
                        key={e + i}
                        src={`https://www.roblox.com/asset-thumbnail/image?assetId=${e}&width=150&height=150&format=png`}
                        alt="item"
                      />
                    );
                  })}
                </div>
                <div className="info">
                  <b>R$ {e.price}</b>
                  {/* <span>R$ 549k - R$671k</span> */}
                </div>
                <div className="controls">
                  <button onClick={() => setWindow(CoinflipWindows.Join)}>
                    Join
                  </button>
                  <span id={e.id} onClick={handleView}>
                    View
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        {/* <ul className='users'>
          <li>
            <div className="vs">
              <img src="/img/exampleuser.png" alt="user" />
              <b>VS</b>
              <img src="/img/exampleuser.png" alt="user" />
            </div>
            <img src="/img/token.webp" alt="token" />
            <div className="items">
              <img
                style={{ marginLeft: "-20%" }}
                src="/img/exampleuser.png"
                alt="item"
              />
              <img
                style={{ marginLeft: "-20%" }}
                src="/img/exampleuser.png"
                alt="item"
              />
              <img
                style={{ marginLeft: "-20%" }}
                src="/img/exampleuser.png"
                alt="item"
              />
            </div>
            <div className="info">
              <b>123k</b>
              <span>R$ 549k - R$671k</span>
            </div>
            <div className="controls">
              <button>View</button>
            </div>
          </li>
          <li>
            <div className="vs">
              <img src="/img/exampleuser.png" alt="user" />
              <b>VS</b>
              <img src="/img/exampleuser.png" alt="user" />
            </div>
            <img src="/img/token.webp" alt="token" />
            <div className="items">
              <img
                style={{ marginLeft: "-20%" }}
                src="/img/exampleuser.png"
                alt="item"
              />
              <img
                style={{ marginLeft: "-20%" }}
                src="/img/exampleuser.png"
                alt="item"
              />
              <img
                style={{ marginLeft: "-20%" }}
                src="/img/exampleuser.png"
                alt="item"
              />
            </div>
            <div className="info">
              <b>123k</b>
              <span>R$ 549k - R$671k</span>
            </div>
            <div className="controls">
              <button>View</button>
            </div>
          </li>
          <li>
            <div className="vs">
              <img src="/img/exampleuser.png" alt="user" />
              <b>VS</b>
              <img src="/img/exampleuser.png" alt="user" />
            </div>
            <img src="/img/token.webp" alt="token" />
            <div className="items">
              <img
                style={{ marginLeft: "-20%" }}
                src="/img/exampleuser.png"
                alt="item"
              />
              <img
                style={{ marginLeft: "-20%" }}
                src="/img/exampleuser.png"
                alt="item"
              />
              <img
                style={{ marginLeft: "-20%" }}
                src="/img/exampleuser.png"
                alt="item"
              />
            </div>
            <div className="info">
              <b>123k</b>
              <span>R$ 549k - R$671k</span>
            </div>
            <div className="controls">
              <button>View</button>
            </div>
          </li>
        </ul> */}
      </div>
    </div>
  );
}
