import { Routes, Route } from "react-router-dom";
import { TravelPage } from "../pages/travel/show";
import { TravelProvider } from "../context/travel";
import { OtherCostTravelProvider } from "../context/other-cost";
import { FishingProvider } from "../context/fishing";
import { TravelDetailPage } from "../pages/travel/detail";
import { ChargerOperationProvider } from "../context/charger-operation";

export const PescaRoutes = () => {
  return (
    <TravelProvider>
      <OtherCostTravelProvider>
        <FishingProvider>
          <ChargerOperationProvider>
            <Routes>
              <Route path="/" element={<TravelPage />} />
              <Route path="/viaje/:id" element={<TravelDetailPage />} />
            </Routes>
          </ChargerOperationProvider>
        </FishingProvider>
      </OtherCostTravelProvider>
    </TravelProvider>
  );
};
