import { useState, useEffect } from "react";
import { BoatContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { BoatService } from "./../../services/boat.service";
import { BoatDto } from "./../../domain/dto/boat.dto";

export const BoatProvider = ({ children }: ContextProviderProps) => {
  const [boat, setBoat] = useState<BoatDto | null>({
    id: 1,
    name: "",
  });

  const [boats, setBoats] = useState<BoatDto[]>([]);

  useEffect(() => {
    const fetchBoats = async () => {
      const service = new BoatService();
      const data = await service.getAll();
      setBoats(data);
    };
    fetchBoats();
  }, []);

  const service = new BoatService();

  const update = async (id: number, boatData: BoatDto) => {
    if (!boat) return;
    const updatedBoat = await service.update(id, boatData);
    setBoat(updatedBoat);
  };
  const create = async (boatData: BoatDto) => {
    await service.create(boatData);
    const updatedBoats = await service.getAll();
    setBoats(updatedBoats);
  };
  const getById = async (id: number) => {
    const boatData = await service.getById(id);
    setBoat(boatData);
    return boatData;
  };

  const remove = async (id: number) => {
    await service.delete(id);
    setBoats(boats.filter((b) => b.id !== id));
  };

  return (
    <BoatContext.Provider
      value={{
        boat,
        setBoat,
        create,
        update,
        getById,
        boats,
        remove,
      }}
    >
      {children}
    </BoatContext.Provider>
  );
};
