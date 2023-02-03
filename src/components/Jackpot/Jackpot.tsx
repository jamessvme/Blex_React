import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../../style/jackpot.css";
import { JackpotWindow } from "../../types/interfaces/jackpotWindow";
import { Join } from "./Join";
import { History } from "./History";

export enum JackpotWindows {
  none,
  join,
  history,
}

export function Jackpot() {
  const [window, setWindow] = useState<JackpotWindows>(0);
  return (
    <>
    <div className="gameContainer">
      <div className="jackpotContainer">
        <h2>
          <span onClick={() => setWindow(JackpotWindows.history)}>History</span>
        </h2>
        <div className="circle">
          <div className="outline"></div>
          <div className="arrow">
            <FontAwesomeIcon icon={faAngleUp} />
          </div>
          <div className="info">
            <span>0.00%</span>
            <h3>MAX 10</h3>
          </div>
          <div
            className="pizza"
            style={{ "--total": 8 } as React.CSSProperties}
          >
            <div className="stat" style={{ "--i": 1 } as React.CSSProperties}>
              <img src="/img/exampleuser.png" alt="user" />
            </div>
            <div className="stat" style={{ "--i": 2 } as React.CSSProperties}>
              <img src="/img/exampleuser.png" alt="user" />
            </div>
            <div className="stat" style={{ "--i": 3 } as React.CSSProperties}>
              <img src="/img/exampleuser.png" alt="user" />
            </div>
            <div className="stat" style={{ "--i": 4 } as React.CSSProperties}>
              <img src="/img/exampleuser.png" alt="user" />
            </div>
            <div className="stat" style={{ "--i": 5 } as React.CSSProperties}>
              <img src="/img/exampleuser.png" alt="user" />
            </div>
            <div className="stat" style={{ "--i": 6 } as React.CSSProperties}>
              <img src="/img/exampleuser.png" alt="user" />
            </div>
            <div className="stat" style={{ "--i": 7 } as React.CSSProperties}>
              <img src="/img/exampleuser.png" alt="user" />
            </div>
            <div className="stat" style={{ "--i": 8 } as React.CSSProperties}>
              <img src="/img/exampleuser.png" alt="user" />
            </div>
          </div>
        </div>
        <button onClick={() => setWindow(JackpotWindows.join)}>Join</button>
      </div>
    </div>
    {(() => {
        switch (window) {
          case JackpotWindows.join:
            return <Join setWindow={setWindow}/>;
          case JackpotWindows.history:
            return <History setWindow={setWindow}/>;
        }
      })()}
      </>
  );
}
