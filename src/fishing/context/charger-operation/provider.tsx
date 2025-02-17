import { useState, useEffect } from "react";
import { ChargerOperationContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { ChargeOperationService } from "../../services/charger-operation.service";
import {
  ChargerOperationDto,
  ChargerOperationResDto,
} from "../../domain/dto/charger_operation.dto";
import { useTravel } from "../travel";
import { useFishing } from "../fishing";

export const ChargerOperationProvider = ({
  children,
}: ContextProviderProps) => {
  const [chargerOperation, setChargerOperation] =
    useState<ChargerOperationResDto | null>(null);
  const service = new ChargeOperationService();
  const { travelSelected } = useTravel();
  const { fishings } = useFishing();

  useEffect(() => {
    const getChargerOperationOfTravel = async () => {
      if (!travelSelected) return;
      const data = await service.getChargerOperationByTravelId(
        travelSelected.id
      );
      setChargerOperation(data);
    };
    getChargerOperationOfTravel();
  }, [travelSelected]);

  useEffect(() => {
    const calculateChargerOperation = async () => {
      if (!travelSelected && !chargerOperation) return;
      const boxes = fishings.reduce((acc, curr) => acc + curr.boxes, 0);
      const weight =
        fishings.reduce((acc, curr) => acc + curr.weight * curr.boxes, 0) /
        1000;

      const entero = Math.floor(weight);
      const decimal = weight - entero;
      let round_weight;

      if (decimal < 0.4) {
        round_weight = entero;
      } else if (decimal < 0.8) {
        round_weight = entero + 0.5;
      } else {
        round_weight = entero + 1;
      }

      const chargerOperationData: ChargerOperationDto = {
        id_travel: travelSelected?.id || 0,
        footboard: round_weight * 50,
        helper: chargerOperation?.helper || 0,
        grocer: round_weight * 15,
        boxes: boxes,
        weight: round_weight,
        charger: round_weight * 50,
        travel_cost: chargerOperation?.travel_cost || 0,
        date_canceled: chargerOperation?.date_canceled || null,
      };

      if (chargerOperation) {
        setChargerOperation({
          ...chargerOperationData,
          id: chargerOperation?.id || 0,
        });
        if (round_weight != chargerOperation?.weight) {
          await update(chargerOperation?.id || 0, chargerOperationData);
        }
      }
    };
    calculateChargerOperation();
  }, [fishings, travelSelected]);

  const getChargerOperationByTravelId = async (id: number) => {
    const data = await service.getChargerOperationByTravelId(id);
    setChargerOperation(data);
  };

  const update = async (id: number, data: ChargerOperationDto) => {
    await service.update(id, data);
    setChargerOperation((prev) => ({ ...prev, ...{ ...data, id } }));
  };

  return (
    <ChargerOperationContext.Provider
      value={{
        chargerOperation,
        getChargerOperationByTravelId,
        update,
        setChargerOperation,
      }}
    >
      {children}
    </ChargerOperationContext.Provider>
  );
};
