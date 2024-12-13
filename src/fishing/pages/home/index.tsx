import { BoatProvider } from "../../context/boat";
import { TravelProvider } from "../../context/travel";
import { OtherCostTravelProvider } from "../../context/other-cost";
import { FishingProvider } from "../../context/fishing";
import { TravelPage } from "../travel";

export const Pesca = () => {
  return (
    <BoatProvider>
      <TravelProvider>
        <OtherCostTravelProvider>
          <FishingProvider>
            <TravelPage />
          </FishingProvider>
        </OtherCostTravelProvider>
      </TravelProvider>
    </BoatProvider>
  );
};
