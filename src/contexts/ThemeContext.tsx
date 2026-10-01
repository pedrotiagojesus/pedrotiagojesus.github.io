import { createContext, useLayoutEffect, ReactNode } from "react";
import useLocalStorage from "use-local-storage";

interface ThemeContextContextType {
    theme: string;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextContextType | undefined>(
    undefined
);

interface ThemeProps {
    children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeProps) => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const [theme, setTheme] = useLocalStorage(
        "themeColor",
        mediaQuery.matches ? "light" : "dark"
    );

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    // Layout effect (not useEffect) so the attribute is set during the commit:
    // ToggleThemeButton's View Transition snapshots the page right after
    // flushSync(toggleTheme) returns, and needs the new theme already applied.
    useLayoutEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
