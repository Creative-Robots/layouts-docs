import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface rep {
    name: string;
    id: string;
}
  
export const repContext = createContext<{setRep: Dispatch<SetStateAction<rep[]>>}>({setRep: () => {}});

export function useRepContext() {
    const context = useContext(repContext);
    if (!context) {
        throw new Error("useRepContext must be used inside RepContext.Provider0");
    }
    return context;
}