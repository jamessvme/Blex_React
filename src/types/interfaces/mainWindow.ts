import { Dispatch, SetStateAction } from "react";
import { MainWindows } from "../../App";

export interface MainWindow {
    setWindow: Dispatch<SetStateAction<MainWindows>>;
}