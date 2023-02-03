import { Dispatch, SetStateAction } from "react";
import { JackpotWindows } from "../../components/Jackpot/Jackpot";

export interface JackpotWindow {
    setWindow: Dispatch<SetStateAction<JackpotWindows>>;
}