import { useContext } from "react";
import { PescaContext } from "./context";
export const usePesca = () => {
  const context = useContext(PescaContext);
  if (!context) {
    throw new Error("useAuth must be used within an PescaProvider");
  }
  return context;
};
