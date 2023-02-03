import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MainWindows } from "../../App";
import { errorNotif } from "../../utils/notifications/errorNotif";
import "../../style/inventory.css";
import { successNotif } from "../../utils/notifications/successNotif";

interface WithdrawProps {
  setWindow: Dispatch<SetStateAction<MainWindows>>;
}
export function Withdraw({ setWindow }: WithdrawProps) {
  const clickParent = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    let dataValue = event.currentTarget.getAttribute("data-value");
    if (!dataValue) {
      setWindow(0);
    }
  };
  const [userItems, setUserItems] = useState<any[]>([]);
  const [blxItems, setBlxItems] = useState<any[]>([]);
  const [actionIds, setActionIds] = useState<number[]>([]);
  const setToAction = (e: React.MouseEvent<HTMLElement>) => {
    const id = parseInt(e.currentTarget.id);
    setUserItems((prev) => {
      setActionIds((prev) => [...prev, id]);
      setBlxItems((prev) => [...prev, { assetId: id, added: true }]);
      return prev.filter((el) => el.assetId !== id);
    });
  };
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    const id = parseInt(e.currentTarget.id);
    setBlxItems((prev) => {
      setActionIds((prev) => prev.filter((e) => e !== id));
      setUserItems((prev) => [...prev, { assetId: id, added: true }]);
      return prev.filter((el) => {
        return el.assetId !== id;
      });
    });
  };
  useEffect(() => {
    (async () => {
      const items = await (await fetch("/limiteds/blx")).json();
      if (items?.error) {
        errorNotif("Something went wrong. Try again later");
        return;
      }
      setUserItems(items);
    })();
    (async () => {
      const items = await (await fetch("/limiteds/user")).json();
      if (items?.error) {
        errorNotif("Something went wrong. Try again later");
        return;
      }
      setBlxItems(items);
    })();
  }, []);

  const withdraw = async () => {
    const withdraw = await (
      await fetch(`/limiteds/${actionIds.join("+")}`, { method: "DELETE" })
    ).json();
    if (withdraw?.error) {
      errorNotif("Something went wrong. Try again later");
      return;
    }
    setBlxItems((prev) =>
      prev.map((item) => {
        return { assetId: item.assetId, added: false };
      })
    );
    setActionIds([]);
    successNotif("Successfully deposited");
  };
  return (
    <div className="blurContainer" data-value="parent" onClick={clickParent}>
      <div className="container">
        <div className="x" onClick={() => setWindow(0)}>
          <FontAwesomeIcon icon={faX} />
        </div>
        <div className="inventory">
            <div>
          <div className="userItems">
            <h2>Your Blx Limiteds</h2>
            <ul>
              {userItems.map((item, i) => {
                return (
                  <li
                    key={item.assetId + i}
                    id={item.assetId}
                    onClick={setToAction}
                  >
                    <img
                      src={`https://www.roblox.com/asset-thumbnail/image?assetId=${item.assetId}&width=420&height=420&format=png`}
                      alt=""
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="blxItems">
            <h2>Your Roblox Limiteds</h2>
            <ul>
              {blxItems.map((item, i) => {
                return (
                  <li
                    key={item.assetId + i}
                    id={item.assetId}
                    className={item?.added ? "added" : "block"}
                    onClick={item?.added ? cancel : () => null}
                  >
                    <img
                      src={`https://www.roblox.com/asset-thumbnail/image?assetId=${item.assetId}&width=420&height=420&format=png`}
                      alt=""
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          </div>
          <button className="deposit" onClick={withdraw}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}

