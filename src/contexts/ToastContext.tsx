import { createContext, useContext, useCallback, useState } from "react";
import { Toast, ToastType } from "../components/Toast/toast.types";
import { ToastContainer } from "@components/Toast/ToastContainer";

interface ToastContextData {
    showToast: (message: string, type?: ToastType, duration?: number) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (message: string, type: ToastType = "info", duration = 3000) => {
            const id = crypto.randomUUID();

            setToasts((prev) => [...prev, { id, message, type, duration }]);

            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
        },
        [removeToast]
    );

    return (
        <ToastContext.Provider value={{ showToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} onClose={removeToast} />
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
