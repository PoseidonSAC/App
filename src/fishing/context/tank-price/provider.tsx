import { useEffect, useState } from "react";
import { TankPriceContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";

const STORAGE_KEY = "tank_price_unit";
const DEFAULT_PRICE = 680;

export const TankPriceProvider = ({ children }: ContextProviderProps) => {
  const [price, setPriceState] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const num = raw != null ? parseFloat(raw) : NaN;
      return isNaN(num) ? DEFAULT_PRICE : num;
    } catch {
      return DEFAULT_PRICE;
    }
  });

  const setPrice = (value: number) => {
    setPriceState(value);
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {}
  };

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const num = parseFloat(e.newValue);
        if (!isNaN(num)) setPriceState(num);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <TankPriceContext.Provider value={{ price, setPrice }}>
      {children}
    </TankPriceContext.Provider>
  );
};

