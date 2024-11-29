import React, { createContext, useState, useContext } from "react";

// Tipo per il contesto
interface LoadingContextType {
    loading: boolean;
    setLoading: (state: boolean) => void;
}

// Crea il contesto
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Provider per il contesto
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Hook per utilizzare il contesto
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
