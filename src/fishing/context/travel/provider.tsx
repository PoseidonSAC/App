import { useState, useEffect } from "react";
import { TravelContext } from "./context";
import { ContextProviderProps } from "./../../../shared/types/contextProviderProps";
import { TravelService } from "../../services/travel.service";
import { travelDto, travelResDto } from "./../../domain/dto/travel.dto";
import { useBoat } from "../boat";

export const TravelProvider = ({ children }: ContextProviderProps) => {
  const service = new TravelService();
  const { boat } = useBoat();
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
      if (!boat?.id) return;
      setTravels([]);
      const data = await service.getAllByBoatId(boat?.id);
      const sortedData = sortTravels(data);
      setTravels(sortedData);
    };
    getAll();
  }, [boat]);

  const create = async (travel: travelDto) => {
    if (!boat?.id) return;
    console.log("Creating travel with boat ID:", boat.id);
    const data = await service.create({ ...travel, id_boat: boat?.id });
    setTravels(sortTravels([...travels, data]));
  };

  const update = async (id: number, travel: travelResDto) => {
    await service.update(id, travel);
    setTravels((prevTravels) =>
      prevTravels.map((t) => (t.id === id ? { ...t, ...travel } : t))
    );
  };

  const remove = async (id: number) => {
    await service.delete(id);
    setTravels(travels.filter((t) => t.id !== id));
  };

  const getById = async (id: number) => {
    const travelData = await service.getById(id);
    SetTravelSelected(travelData);
    return travelData;
  };

  return (
    <TravelContext.Provider
      value={{
        travels,
        SetTravels: setTravels,
        create,
        update,
        remove,
        travelSelected,
        SetTravelSelected,
        getById,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};
