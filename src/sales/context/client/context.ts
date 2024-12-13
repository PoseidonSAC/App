import { createContext } from "react";

export interface PescaContextProps {}

export const PescaContext = createContext<PescaContextProps | null>(null);
