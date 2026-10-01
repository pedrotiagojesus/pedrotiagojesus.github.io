import { useCallback, useRef } from "react";

// Returns a callback ref that adds .is-visible to the element the first time
// it scrolls into view, which .reveal / .reveal-group (globals.css) turn into
// a fade + slide-up. A callback ref rather than useRef + useEffect, because
// most targets only mount after a loading state, long after the first render.
export function useReveal<T extends Element>() {
    const observerRef = useRef<IntersectionObserver | null>(null);

    return useCallback((element: T | null) => {
        observerRef.current?.disconnect();
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                element.classList.add("is-visible");
                observer.disconnect();
            },
            // threshold 0 + a bottom margin instead of a ratio threshold: a
            // ratio can never be reached by a list taller than the viewport.
            { rootMargin: "0px 0px -10% 0px" }
        );

        observer.observe(element);
        observerRef.current = observer;
    }, []);
}
