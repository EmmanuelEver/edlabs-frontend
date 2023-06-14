import { toast as fireToast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { createContext, FC, PropsWithChildren, useCallback, useRef } from "react";

export const ToastContext = createContext({});

type ToastTypes = "SUCCESS" | "DANGER" | "INFO" | "WARNING"


const ToastProvider:FC<PropsWithChildren> = ({ children }) => {
  const toastCount = useRef(0);
  const toast = useCallback((type: ToastTypes, message: string, autoClose = 7000, ...options: any) => {
    toastCount.current = toastCount.current + 1;
    if (type === "SUCCESS") {
      fireToast.success(message, {
        position: "top-right",
        autoClose: autoClose,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        ...options,
      });
    }
    if (type === "DANGER") {
      fireToast.error(message, {
        position: "top-right",
        autoClose: autoClose,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        ...options,
      });
    }
    if (type === "INFO") {
      fireToast.info(message, {
        position: "top-right",
        autoClose: autoClose,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        ...options,
      });
    }
    if (type === "WARNING") {
      fireToast.warn(message, {
        position: "top-right",
        autoClose: autoClose,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        ...options,
      });
    }
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>{children}</ToastContext.Provider>
  );
};

export default ToastProvider;
