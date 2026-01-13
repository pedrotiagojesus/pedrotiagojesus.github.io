import { useEffect, useState } from "react";
import { Toast } from "./toast.types";

interface Props {
    toast: Toast;
    onClose: (id: string) => void;
}

export function ToastItem({ toast, onClose }: Props) {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = 50;
        const step = 100 / (toast.duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => Math.max(prev - step, 0));
        }, interval);

        return () => clearInterval(timer);
    }, [toast.duration]);

    return (
        <div className={`toast toast-${toast.type}`}>
            <button className="toast-close" onClick={() => onClose(toast.id)}>
                ✕
            </button>

            <span>{toast.message}</span>

            <div className="toast-progress">
                <div className="toast-progress-bar" style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
}
