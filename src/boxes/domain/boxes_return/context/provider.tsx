import { useState } from "react";
import { BoxesReturnContext } from "./context";
import { ContextProviderProps } from "../../../../shared/types/contextProviderProps";
import { BoxesReturnService } from "../services";
import { BoxesReturnDto, BoxesReturnResDto } from "../dto";
import { useBoxes } from "../../boxes/context";
import { useEffect } from "react";

export const BoxesReturnProvider = ({ children }: ContextProviderProps) => {
  const [boxesReturn, setBoxesReturn] = useState<BoxesReturnResDto[]>([]);
  const [boxesReturnSelected, setBoxesReturnSelected] =
    useState<BoxesReturnResDto | null>(null);

  const boxesReturnService = new BoxesReturnService();
  const { boxesSelected } = useBoxes();

  const getBoxesReturn = async () => {
    if (!boxesSelected) return;
    const data = await boxesReturnService.getBoxesByBoxes(boxesSelected.id);
    setBoxesReturn(data);
  };

  useEffect(() => {
    getBoxesReturn();
  }, [boxesSelected]);

  const create = async (data: BoxesReturnDto) => {
    if (!boxesReturn) return;
    await boxesReturnService.create(data);
    await getBoxesReturn();
  };

  const remove = async (id: number) => {
    await boxesReturnService.delete(id);
  };
  const update = async (id: number, data: BoxesReturnDto) => {
    await boxesReturnService.update(id, data);
    await getBoxesReturn();
  };

  return (
    <BoxesReturnContext.Provider
      value={{
        boxesReturn,
        boxesReturnSelected,
        setBoxesReturnSelected,
        create,
        remove,
        update,
      }}
    >
      {children}
    </BoxesReturnContext.Provider>
  );
};
