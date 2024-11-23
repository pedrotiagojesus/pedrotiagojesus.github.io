import { createContext, useEffect, ReactNode } from "react";
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

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
