import { VehicleContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { VehicleDto, VehicleRestDto } from "../../dto/vehicle";
import { VehicleService } from "../../services/vehicle.service";
import { useState, useEffect } from "react";

export const VehicleProvider = ({ children }: ContextProviderProps) => {
  const [vehicles, setVehicles] = useState<VehicleRestDto[]>([]);
  const [vehicleSelected, setVehicleSelected] = useState<VehicleRestDto | null>(
    null
  );
  const service = new VehicleService();

  useEffect(() => {
    const getVehicles = async () => {
      const data = await service.getVehicles();
      setVehicles(data);
    };
    getVehicles();
  }, []);

  const createVehicle = async (vehicle: VehicleDto) => {
    const data = await service.create(vehicle);
    setVehicles([...vehicles, data]);
  };

  const updateVehicle = async (id: number, vehicle: VehicleDto) => {
    await service.update(id, vehicle);
    setVehicles((prevVehicles) =>
      prevVehicles.map((v) => (v.id === id ? { ...v, ...vehicle } : v))
    );
  };

  const deleteVehicle = async (id: number) => {
    await service.delete(id);
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  const getVehicle = async (id: number): Promise<VehicleRestDto> => {
    const data = await service.getById(id);
    return data;
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        updateVehicle,
        deleteVehicle,
        createVehicle,
        getVehicle,
        vehicleSelected,
        setVehicleSelected,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
