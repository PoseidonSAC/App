import { useState, useEffect } from "react";
import { BoxesReturnContext } from "./context";
import { ContextProviderProps } from "../../../../shared/types/contextProviderProps";
import { BoxesReturnService } from "../services";
import { BoxesReturnDto, BoxesReturnResDto, BoxesReturnGrouped } from "../dto";
import { useControlBoxes } from "../../control_boxes/context";

export const BoxesReturnProvider = ({ children }: ContextProviderProps) => {
  const [boxesReturn, setBoxesReturn] = useState<BoxesReturnGrouped | null>(
    null
  );
  const [boxesReturnSelected, setBoxesReturnSelected] =
    useState<BoxesReturnResDto | null>(null);

  const boxesReturnService = new BoxesReturnService();
  const { controlBoxesSelected } = useControlBoxes();

  useEffect(() => {
    const getBoxesReturnTransformed = async () => {
      if (!controlBoxesSelected) return;
      const response = await boxesReturnService.getBoxesByControl(
        controlBoxesSelected?.id
      );
      const grouped = response.reduce((acc: BoxesReturnGrouped, box) => {
        if (!acc[box.id_boxes]) {
          acc[box.id_boxes] = [];
        }
        acc[box.id_boxes].push(box);
        return acc;
      }, {});
      console.log(grouped);
      setBoxesReturn(grouped);
    };
    getBoxesReturnTransformed();
  }, [controlBoxesSelected]);

  const create = async (data: BoxesReturnDto) => {
    if (!boxesReturn) return;
    const response = await boxesReturnService.create(data);
    setBoxesReturn((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [response.id_boxes]: [...(prev[response.id_boxes] || []), response],
      };
    });
  };

  const remove = async (id: number) => {
    await boxesReturnService.delete(id);
    setBoxesReturn((prev) => {
      const updated = { ...prev };
      for (const key in updated) {
        updated[key] = updated[key].filter((box) => box.id !== id);
        if (updated[key].length === 0) {
          delete updated[key];
        }
      }
      return updated;
    });
  };

  const update = async (id: number, data: BoxesReturnDto) => {
    await boxesReturnService.update(id, data);
    setBoxesReturn((prev) => {
      const updated = { ...prev };
      for (const key in updated) {
        updated[key] = updated[key].map((box) =>
          box.id === id ? { ...box, ...data } : box
        );
      }
      return updated;
    });
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
