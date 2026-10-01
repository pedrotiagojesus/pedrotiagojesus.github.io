import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { useReveal } from "./useReveal";

type ObserverCallback = (entries: Array<Pick<IntersectionObserverEntry, "isIntersecting">>) => void;

let trigger: ObserverCallback;
const disconnect = vi.fn();
let container: HTMLDivElement;
let root: Root;

// isLoading mimics the pages this is used on, where the target only mounts
// after a loading state.
const Revealed = ({ isLoading = false }: { isLoading?: boolean }) => {
    const ref = useReveal<HTMLDivElement>();
    if (isLoading) return <p>Loading</p>;
    return <div ref={ref} id="target" className="reveal" />;
};

const renderTarget = () => {
    act(() => root.render(<Revealed />));
    return container.querySelector("#target")!;
};

beforeEach(() => {
    // Lets act() run without React warning that the environment isn't set up for it
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal(
        "IntersectionObserver",
        class {
            observe = vi.fn();
            disconnect = disconnect;
            constructor(callback: ObserverCallback) {
                trigger = callback;
            }
        }
    );
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
});

afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
    disconnect.mockClear();
});

describe("useReveal", () => {
    it("starts hidden", () => {
        expect(renderTarget().classList.contains("is-visible")).toBe(false);
    });

    it("stays hidden while the element is off-screen", () => {
        const target = renderTarget();
        trigger([{ isIntersecting: false }]);
        expect(target.classList.contains("is-visible")).toBe(false);
    });

    it("reveals the element once it enters the viewport, then stops observing", () => {
        const target = renderTarget();
        trigger([{ isIntersecting: true }]);
        expect(target.classList.contains("is-visible")).toBe(true);
        expect(disconnect).toHaveBeenCalled();
    });

    it("observes an element that only mounts after a loading state", () => {
        act(() => root.render(<Revealed isLoading />));
        act(() => root.render(<Revealed />));
        const target = container.querySelector("#target")!;
        trigger([{ isIntersecting: true }]);
        expect(target.classList.contains("is-visible")).toBe(true);
    });

    it("stops observing when the element unmounts", () => {
        renderTarget();
        act(() => root.render(<Revealed isLoading />));
        expect(disconnect).toHaveBeenCalled();
    });
});
