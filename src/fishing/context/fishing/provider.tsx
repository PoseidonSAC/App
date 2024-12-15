import { useState, useEffect } from "react";
import { FishingContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { FishingDto, FishingResDto } from "./../../domain/dto/fishing.dto";
import { FishingService } from "../../services/fishing.service";
import { useTravel } from "../travel";

export const FishingProvider = ({ children }: ContextProviderProps) => {
  const { travelSelected } = useTravel();
  const service = new FishingService();
  const [fishings, setFishings] = useState<FishingResDto[]>([]);
  useEffect(() => {
    const getAll = async () => {
      if (!travelSelected) return;
      const data = await service.getFishingByTravelId(travelSelected.id);
      setFishings(data);
    };
    getAll();
  }, [travelSelected]);

  const create = async (fishing: FishingDto) => {
    fishing.id_travel = travelSelected?.id as number;
    const data = await service.create(fishing);
    setFishings([...fishings, data]);
  };

  const update = async (id: number, fishing: FishingDto) => {
    await service.update(id, fishing);
    setFishings((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...fishing } : f))
    );
  };

  const remove = async (id: number) => {
    await service.delete(id);
    setFishings((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <FishingContext.Provider
      value={{
        fishings,
        create,
        update,
        remove,
      }}
    >
      {children}
    </FishingContext.Provider>
  );
};
