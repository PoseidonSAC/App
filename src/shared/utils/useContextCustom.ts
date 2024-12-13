import { Context, useContext } from "react";

export const useContextCustom = <T>(
  Context: Context<T | null>,
  errorMessage = "Context must be used within its provider"
) => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(errorMessage);
  }
  return context;
};
