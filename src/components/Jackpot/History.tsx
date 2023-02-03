import {
  faAngleDown,
  faFingerprint,
  faKey,
  faPercent,
  faTrophy,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { JackpotWindow } from "../../types/interfaces/jackpotWindow";

export function History({ setWindow }: JackpotWindow) {
  const clickParent = (event: React.MouseEvent) => {
    event.preventDefault();
    let dataValue = (event.target as HTMLElement).getAttribute("data-value");
    if (dataValue) {
      setWindow(0);
    }
  };
  return (
    <div className="blurContainer" data-value="parent" onClick={clickParent}>
      <div className="container">
        <div className="x" onClick={() => setWindow(0)}>
          <FontAwesomeIcon icon={faX} />
        </div>
        <h1>History</h1>
        <ul className="jackpot">
          <li>
            <div className="user">
              <img src="/img/exampleuser.png" alt="user" />
              <b>UserName123</b>
            </div>
            <div className="statsItems">
              <b>
                <FontAwesomeIcon icon={faTrophy} /> 47.47k
              </b>
              <span>
                <FontAwesomeIcon icon={faPercent} /> 47.47
              </span>
              <div>
                <img src="/img/exampleuser.png" alt="user" />
                <img src="/img/exampleuser.png" alt="user" />
                <img src="/img/exampleuser.png" alt="user" />
                <img src="/img/exampleuser.png" alt="user" />
                <img src="/img/exampleuser.png" alt="user" />
              </div>
            </div>
            <div className="keys">
              <b>
                <FontAwesomeIcon icon={faFingerprint} /> 123123123
              </b>
              <span>
                <FontAwesomeIcon icon={faKey} /> 123123123
              </span>
            </div>
          </li>
          <li>
            <div className="user">
              <img src="/img/exampleuser.png" alt="user" />
              <b>UserName123</b>
            </div>
            <div className="statsItems">
              <b>
                <FontAwesomeIcon icon={faTrophy} /> 47.47k
              </b>
              <span>
                <FontAwesomeIcon icon={faPercent} /> 47.47
              </span>
              <div>
                <img src="/img/exampleuser.png" alt="user" />
                <img src="/img/exampleuser.png" alt="user" />
                <img src="/img/exampleuser.png" alt="user" />
                <img src="/img/exampleuser.png" alt="user" />
                <img src="/img/exampleuser.png" alt="user" />
              </div>
            </div>
            <div className="keys">
              <b>
                <FontAwesomeIcon icon={faFingerprint} /> 123123123
              </b>
              <span>
                <FontAwesomeIcon icon={faKey} /> 123123123
              </span>
            </div>
          </li>
          <li>
            <div className="user">
              <img src="/img/exampleuser.png" alt="user" />
              <b>UserName123</b>
            </div>
            <div className="statsItems">
              <b>
                <FontAwesomeIcon icon={faTrophy} /> 47.47k
              </b>
              <span>
                <FontAwesomeIcon icon={faPercent} /> 47.47
              </span>
              <div>
                <img src="/img/exampleuser.png" alt="user" />
                <img src="/img/exampleuser.png" alt="user" />
                <img src="/img/exampleuser.png" alt="user" />
                <img src="/img/exampleuser.png" alt="user" />
                <img src="/img/exampleuser.png" alt="user" />
              </div>
            </div>
            <div className="keys">
              <b>
                <FontAwesomeIcon icon={faFingerprint} /> 123123123
              </b>
              <span>
                <FontAwesomeIcon icon={faKey} /> 123123123
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
