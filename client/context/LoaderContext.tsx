"use client";

import { createContext, useState, useContext } from "react";

interface LoaderContextType {
    loading: boolean; // state for loader
    setLoading: (value: boolean) => void; // func set the state for loader
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error("LoaderProvider error");
    }
    return context;
};

//Provider for context Loader
export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};
