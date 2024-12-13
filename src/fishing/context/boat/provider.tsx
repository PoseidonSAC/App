import { useState, useEffect } from "react";
import { BoatContext } from "./context";
import { BoatService } from "../../services/boat.service";
import { BoatDto, BoatResDto } from "./../../domain/dto/boat.dto";
import { ContextProviderProps } from "./../../../shared/types/contextProviderProps";

export const BoatProvider = ({ children }: ContextProviderProps) => {
  const service = new BoatService();
  const [boats, setBoats] = useState<BoatResDto[]>([]);
  useEffect(() => {
    const getAll = async () => {
      const data = await service.getAll();
      setBoats(data);
    };
    getAll();
  }, []);

  const create = async (boat: BoatDto) => {
    const data = await service.create(boat);
    setBoats([...boats, data]);
  };

  const update = async (id: number, boat: BoatDto) => {
    const data = await service.update(id, boat);
    const index = boats.findIndex((b) => b.id === id);
    boats[index] = data;
  };

  const remove = async (id: number) => {
    await service.delete(id);
    setBoats(boats.filter((b) => b.id !== id));
  };

  return (
    <BoatContext.Provider
      value={{
        boats,
        create,
        update,
        remove,
      }}
    >
      {children}
    </BoatContext.Provider>
  );
};
