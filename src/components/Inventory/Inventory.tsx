import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MainWindows } from "../../App";
import { errorNotif } from "../../utils/notifications/errorNotif";
import "../../style/inventory.css";
import { successNotif } from "../../utils/notifications/successNotif";

interface InventoryProps {
  setWindow: Dispatch<SetStateAction<MainWindows>>;
}
export function Inventory({ setWindow }: InventoryProps) {
  const clickParent = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    let dataValue = event.currentTarget.getAttribute("data-value");
    if (!dataValue) {
      setWindow(0);
    }
  };
  const [blxItems, setBlxItems] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const items = await (await fetch("/limiteds/blx")).json();
      if (items?.error) {
        errorNotif("Something went wrong. Try again later");
        return;
      }
      setBlxItems(items);
    })();
  }, []);
  return (
    <div className="blurContainer" data-value="parent" onClick={clickParent}>
      <div className="container">
        <div className="x" onClick={() => setWindow(0)}>
          <FontAwesomeIcon icon={faX} />
        </div>
        <div className="inventory">
          <div>
            <div className="blxItems">
              <h2>Your Blx Limiteds</h2>
              {blxItems.length ? (
                <ul>
                  {blxItems.map((item, i) => {
                    return (
                      <li key={item.assetId + i} id={item.assetId}>
                        <img
                          src={`https://www.roblox.com/asset-thumbnail/image?assetId=${item.assetId}&width=420&height=420&format=png`}
                          alt=""
                        />
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </div>
          <div>
          <button
            className="deposit"
            onClick={() => setWindow(MainWindows.Deposit)}
          >
            Deposit
          </button>
          <button
            className="deposit"
            onClick={() => setWindow(MainWindows.Withdraw)}
          >
            Withdraw
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
