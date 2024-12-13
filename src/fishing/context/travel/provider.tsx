import { useState, useEffect } from "react";
import { TravelContext } from "./context";
import { ContextProviderProps } from "./../../../shared/types/contextProviderProps";
import { TravelService } from "../../services/travel.service";
import { travelDto, travelResDto } from "./../../domain/dto/travel.dto";

export const TravelProvider = ({ children }: ContextProviderProps) => {
  const service = new TravelService();
  const [travelSelected, SetTravelSelected] = useState<travelResDto | null>(
    null
  );
  const [travels, setTravels] = useState<travelResDto[]>([]);
  useEffect(() => {
    const getAll = async () => {
      const data = await service.getAll();
      setTravels(data);
    };
    getAll();
  }, []);

  const create = async (travel: travelDto) => {
    const data = await service.create(travel);
    setTravels([...travels, data]);
  };

  const update = async (id: number, travel: travelDto) => {
    const data = await service.update(id, travel);
    const index = travels.findIndex((t) => t.id === id);
    travels[index] = data;
  };

  const remove = async (id: number) => {
    await service.delete(id);
    setTravels(travels.filter((t) => t.id !== id));
  };

  return (
    <TravelContext.Provider
      value={{
        travels,
        create,
        update,
        remove,
        travelSelected,
        SetTravelSelected,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};
