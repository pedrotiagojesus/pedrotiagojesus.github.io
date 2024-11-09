import React, { createContext, useContext, useState, ReactNode } from "react";

interface ActivePageContextType {
    activePage: string;
    setActivePage: (page: string) => void;
}

const ActivePageContext = createContext<ActivePageContextType | undefined>(
    undefined
);

interface ActivePageProviderProps {
    children: ReactNode;
}

export const ActivePageProvider: React.FC<ActivePageProviderProps> = ({
    children,
}) => {
    const [activePage, setActivePage] = useState<string>("home");

    return (
        <ActivePageContext.Provider value={{ activePage, setActivePage }}>
            {children}
        </ActivePageContext.Provider>
    );
};

export const useActivePage = (): ActivePageContextType => {
    const context = useContext(ActivePageContext);
    if (!context) {
        throw new Error(
            "useActivePage deve ser usado dentro de um ActivePageProvider"
        );
    }
    return context;
};
