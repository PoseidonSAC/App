import { useState, useEffect } from "react";
import { ControlBoxesContext } from "./context";
import { ContextProviderProps } from "../../../../shared/types/contextProviderProps";
import { ControlBoxesService } from "../services";
import { ControlBoxesDto, ControlBoxesResDto } from "../dto";

export const ControlBoxesProvider = ({ children }: ContextProviderProps) => {
  const [controlBoxes, setControlBoxes] = useState<ControlBoxesResDto[]>([]);
  const [controlBoxesSelected, setControlBoxesSelected] =
    useState<ControlBoxesResDto | null>(null);
  const service = new ControlBoxesService();

  useEffect(() => {
    const service = new ControlBoxesService();
    const getControlBoxes = async () => {
      const data = await service.getAll();
      setControlBoxes(data);
    };
    getControlBoxes();
  }, []);

  const update = async (id: number, controlBoxes: ControlBoxesDto) => {
    await service.update(id, controlBoxes);
    setControlBoxes((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...controlBoxes } : f))
    );
  };

  const create = async (data: ControlBoxesDto) => {
    const dataCreated = await service.create(data);
    setControlBoxes([...controlBoxes, dataCreated]);
  };

  const remove = async (id: number) => {
    await service.delete(id);
    setControlBoxes((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <ControlBoxesContext.Provider
      value={{
        controlBoxes,
        controlBoxesSelected,
        setControlBoxesSelected,
        update,
        create,
        remove,
      }}
    >
      {children}
    </ControlBoxesContext.Provider>
  );
};
