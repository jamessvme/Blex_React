import { toast } from "react-toastify";

export const warningNotif = (message: string) => {
    toast.warn(message, {
        position: toast.POSITION.TOP_CENTER,
        icon: '⚠'
    });
}