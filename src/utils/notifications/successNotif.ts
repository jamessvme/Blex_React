import { toast } from "react-toastify";

export const successNotif = (message: string) => {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        icon: '🥳',
    });
}