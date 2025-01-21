import { useState, useEffect } from "react";
import { BoxesPlaceContext } from "./context";
import { ContextProviderProps } from "../../../../shared/types/contextProviderProps";
import { BoxesPlaceService } from "../services";
import { BoxesPlaceDto, BoxesPlaceResDto } from "../dto";
import { useControlBoxes } from "./../../control_boxes/context/useContext";

export const BoxesPlaceProvider = ({ children }: ContextProviderProps) => {
  const [boxesPlace, setBoxesPlace] = useState<BoxesPlaceResDto[]>([]);
  const [boxesPlaceSelected, setBoxesPlaceSelected] =
    useState<BoxesPlaceResDto | null>(null);
  const service = new BoxesPlaceService();
  const { controlBoxesSelected } = useControlBoxes();

  useEffect(() => {
    getControlBoxes();
  }, [controlBoxesSelected]);

  const update = async (id: number, controlBoxes: BoxesPlaceDto) => {
    await service.update(id, controlBoxes);
    getControlBoxes();
  };

  const getControlBoxes = async () => {
    if (!controlBoxesSelected) return;
    const data = await service.getByIdControlBoxes(controlBoxesSelected.id);
    setBoxesPlace(data);
  };
  const create = async (data: BoxesPlaceDto) => {
    if (!controlBoxesSelected) return;
    await service.create(data);
    await getControlBoxes();
  };

  const remove = async (id: number) => {
    await service.delete(id);
    getControlBoxes();
  };

  return (
    <BoxesPlaceContext.Provider
      value={{
        boxesPlace,
        boxesPlaceSelected,
        setBoxesPlaceSelected,
        getControlBoxes,
        update,
        create,
        remove,
      }}
    >
      {children}
    </BoxesPlaceContext.Provider>
  );
};
