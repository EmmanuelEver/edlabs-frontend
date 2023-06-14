import { ToastContext } from "@/context/providers/ToastProvider";
import { useContext } from "react"

const useToast = () => {
    const {toasts, toast, removeToast} = useContext<any>(ToastContext);
    return {
        toasts, toast, removeToast
    }
}

export default useToast