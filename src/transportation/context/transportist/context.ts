import { createContext } from "react";
import { VehicleDto, VehicleRestDto } from "../../dto/vehicle";
export interface VehicleContextProps {
  vehicles: VehicleRestDto[];
  updateVehicle: (id: number, vehicle: VehicleDto) => Promise<void>;
  deleteVehicle: (id: number) => Promise<void>;
  createVehicle: (vehicle: VehicleDto) => Promise<void>;
  getVehicle: (id: number) => Promise<VehicleRestDto>;
  vehicleSelected: VehicleRestDto | null;
  setVehicleSelected: (vehicle: VehicleRestDto | null) => void;
}

export const VehicleContext = createContext<VehicleContextProps | null>(null);
