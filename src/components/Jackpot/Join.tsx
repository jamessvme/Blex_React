import { faAngleDown, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { JackpotWindow } from "../../types/interfaces/jackpotWindow";

export function Join({ setWindow }: JackpotWindow) {
  const clickParent = (event: React.MouseEvent) => {
    event.preventDefault();
    let dataValue = (event.target as HTMLElement).getAttribute("data-value");
    if (dataValue) {
      setWindow(0);
    }
  };
  return (
    <div className="blurContainer" data-value='parent' onClick={clickParent}>
      <div className="container">
        <div className="x" onClick={() => setWindow(0)}>
          <FontAwesomeIcon icon={faX} />
        </div>
        <div className="options">
          <b>Your option</b>
          <div>
            <img src="/img/token.webp" alt="token" />
            <img src="/img/talis.webp" alt="token" />
          </div>
        </div>
        <div className="selectItems">
          <b>Select your items</b>
          <div>
            <input type="text" placeholder="Search" />
            <div>
              Highest value <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>
        </div>
        <h2>Total Value R$ 110</h2>
        <div className="items">
          <div className="item">
            <img src="/img/exampleuser.png" alt="item" />
            <p>Saber Boss</p>
            <b>110</b>
            <div>
              <span>Xyz</span>
              <span>Xyz</span>
            </div>
          </div>
        </div>
        <div className="checkout">
          <div>
            <b>
              Selected Items:R$<span> 0</span>
            </b>
            <b>
              Advanced <FontAwesomeIcon icon={faAngleDown} />
            </b>
          </div>
          <div>
            <p>123k - R$123k</p>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
