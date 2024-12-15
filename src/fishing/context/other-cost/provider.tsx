import { useState, useEffect } from "react";
import { OtherCostTravelContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { OtherCostTravelService } from "../../services/other_cost_travel.service";
import {
  OtherCostTravelDto,
  OtherCostTravelResDto,
} from "../../domain/dto/other_cost_travel.dto";
import { useTravel } from "../travel";

export const OtherCostTravelProvider = ({ children }: ContextProviderProps) => {
  const [otherCostTravels, setOtherCostTravels] = useState<
    OtherCostTravelResDto[]
  >([]);
  const service = new OtherCostTravelService();
  const { travelSelected } = useTravel();

  useEffect(() => {
    const getAll = async () => {
      if (!travelSelected) return;
      const data = await service.getOtherCostTravelByTravelId(
        travelSelected.id
      );
      setOtherCostTravels(data);
    };
    getAll();
  }, [travelSelected]);

  const create = async (otherCost: OtherCostTravelDto) => {
    otherCost.id_travel = travelSelected?.id as number;
    const data = await service.create(otherCost);
    setOtherCostTravels([...otherCostTravels, data]);
  };

  const update = async (id: number, otherCost: OtherCostTravelDto) => {
    await service.update(id, otherCost);
    setOtherCostTravels((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...otherCost } : o))
    );
  };

  const remove = async (id: number) => {
    await service.delete(id);
    setOtherCostTravels(otherCostTravels.filter((o) => o.id !== id));
  };

  return (
    <OtherCostTravelContext.Provider
      value={{
        otherCostTravels,
        create,
        update,
        remove,
      }}
    >
      {children}
    </OtherCostTravelContext.Provider>
  );
};
