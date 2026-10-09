import { useCallback, useRef, useState } from "react";

// Returns a callback ref and the factor (≤ 1) that shrinks content of a fixed
// width to fit the width available to the ref'd element (its parent's content
// box). Grows back to 1 when there's room. A callback ref because the target
// only mounts once the CV's data has loaded.
export function useFitScale<T extends HTMLElement>(contentWidthPx: number) {
    const [scale, setScale] = useState(1);
    const observerRef = useRef<ResizeObserver | null>(null);

    const ref = useCallback(
        (element: T | null) => {
            observerRef.current?.disconnect();
            const parent = element?.parentElement;
            if (!parent) return;

            const observer = new ResizeObserver(([entry]) => {
                setScale(Math.min(1, entry.contentRect.width / contentWidthPx));
            });

            observer.observe(parent);
            observerRef.current = observer;
        },
        [contentWidthPx]
    );

    return { ref, scale };
}
