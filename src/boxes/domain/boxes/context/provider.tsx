import { useState, useEffect } from "react";
import { BoxesContext } from "./context";
import { ContextProviderProps } from "../../../../shared/types/contextProviderProps";
import { BoxesService } from "../services";
import { BoxesDto, BoxesResDto } from "../dto";
import { useControlBoxes } from "../../control_boxes/context";

export const BoxesProvider = ({ children }: ContextProviderProps) => {
  const [boxes, setBoxes] = useState<BoxesResDto[]>([]);
  const [boxesSelected, setBoxesSelected] = useState<BoxesResDto | null>(null);
  const service = new BoxesService();
  const { controlBoxesSelected } = useControlBoxes();

  useEffect(() => {
    const getBoxes = async () => {
      if (controlBoxesSelected === null) return;
      const data = await service.getBoxesByControlBoxes(
        controlBoxesSelected.id
      );
      setBoxes(data);
    };
    getBoxes();
  }, [controlBoxesSelected]);

  const update = async (id: number, boxes: BoxesDto) => {
    await service.update(id, boxes);
    setBoxes((prev) => prev.map((f) => (f.id === id ? { ...f, ...boxes } : f)));
  };

  const create = async (box: BoxesDto) => {
    const data = await service.create(box);
    setBoxes([...boxes, data]);
  };

  const remove = async (id: number) => {
    await service.delete(id);
    setBoxes((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <BoxesContext.Provider
      value={{
        boxes,
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
