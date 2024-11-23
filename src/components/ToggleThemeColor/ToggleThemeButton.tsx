import { useContext } from "react";

// CSS
import "./ToggleThemeButton.css";

// Contexts
import { ThemeContext } from "../../contexts/ThemeContext";

const ToggleThemeButton = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("ThemeContext must be used within a ThemeProvider");
    }

    const { toggleTheme, theme } = themeContext;

    return (
        <label htmlFor="check" className="toggle-theme-container">
            <input
                type="checkbox"
                id="check"
                className="toggle"
                onChange={toggleTheme}
                checked={theme === "dark"}
            />
            <div className="icons">
                {theme === "dark" ? (
                    <i className="fa-regular fa-moon"></i>
                ) : (
                    <i className="fa-regular fa-sun"></i>
                )}
            </div>
        </label>
    );
};

/**
 *
 */

export default ToggleThemeButton;
