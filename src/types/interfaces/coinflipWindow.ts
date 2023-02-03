import { Dispatch, SetStateAction } from "react";
import { CoinflipWindows } from "../../components/Coinflip/Coinflip";

export interface CoinflipWindow {
    setWindow: Dispatch<SetStateAction<CoinflipWindows>>;
}