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
  const sortTravels = (data: travelResDto[]) => {
    data.sort((a: travelResDto, b: travelResDto) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return data;
  };

  useEffect(() => {
    const getAll = async () => {
      const data = await service.getAll();
      const sortedData = sortTravels(data);
      setTravels(sortedData);
    };
    getAll();
  }, []);

  const create = async (travel: travelDto) => {
    const data = await service.create(travel);

    setTravels(sortTravels([...travels, data]));
  };

  const update = async (id: number, travel: travelDto) => {
    await service.update(id, travel);
    setTravels((prevTravels) =>
      prevTravels.map((t) => (t.id === id ? { ...t, ...travel } : t))
    );
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
