import { PescaContext } from "./context";

export interface PescaProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const PescaProvider = ({ children }: PescaProviderProps) => {
  //lista de lanchas
  //lista de viajes del as lacnhas
  // selecciona un viaje y de este viaje se ve las pesca y los gastos de esta pesca
  return <PescaContext.Provider value={{}}>{children}</PescaContext.Provider>;
};
