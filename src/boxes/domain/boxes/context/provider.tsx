import { useState } from "react";
import { BoxesContext } from "./context";
import { ContextProviderProps } from "../../../../shared/types/contextProviderProps";
import { BoxesService } from "../services";
import { BoxesDto, BoxesResDto } from "../dto";

export const BoxesProvider = ({ children }: ContextProviderProps) => {
  const [boxesSelected, setBoxesSelected] = useState<BoxesResDto | null>(null);
  const service = new BoxesService();

  const update = async (id: number, boxes: BoxesDto) => {
    await service.update(id, boxes);
  };

  const create = async (box: BoxesDto) => {
    await service.create(box);
  };

  const remove = async (id: number) => {
    await service.delete(id);
  };

  return (
    <BoxesContext.Provider
      value={{
        boxesSelected,
        setBoxesSelected,
        update,
        create,
        remove,
      }}
    >
      {children}
    </BoxesContext.Provider>
  );
};
