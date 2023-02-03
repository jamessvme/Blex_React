import { toast } from "react-toastify";

export const errorNotif = (message: string) => {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        icon: '😔'
    });
}