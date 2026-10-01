import { useContext } from "react";
import type { ChangeEvent } from "react";
import { flushSync } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

// CSS
import "./ToggleThemeButton.css";

// Contexts
import { ThemeContext } from "@contexts/ThemeContext";

const REVEAL_DURATION_MS = 500;

const canAnimateThemeChange = () =>
    typeof document.startViewTransition === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Grows a circle from the toggle's centre until it covers the farthest corner
// of the viewport, revealing the page snapshot taken with the new theme.
const revealFrom = (origin: DOMRect) => {
    const x = origin.left + origin.width / 2;
    const y = origin.top + origin.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    return document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: REVEAL_DURATION_MS, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
    );
};

const ToggleThemeButton = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("ThemeContext must be used within a ThemeProvider");
    }

    const { toggleTheme, theme } = themeContext;

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!canAnimateThemeChange()) {
            toggleTheme();
            return;
        }

        const origin = event.currentTarget.parentElement!.getBoundingClientRect();
        const root = document.documentElement;
        root.classList.add("theme-transition");

        try {
            const transition = document.startViewTransition(() => flushSync(toggleTheme));
            await transition.ready;
            await revealFrom(origin).finished;
        } catch {
            // The transition was skipped (e.g. a navigation started mid-way);
            // the theme itself has already changed, so there's nothing to undo.
        } finally {
            root.classList.remove("theme-transition");
        }
    };

    return (
        <label htmlFor="check" className="toggle-theme-container">
            <input
                type="checkbox"
                id="check"
                className="toggle"
                onChange={handleChange}
                checked={theme === "dark"}
            />
            <div className="icons">
                {theme === "dark" ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
            </div>
        </label>
    );
};

export default ToggleThemeButton;
