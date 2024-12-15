import { Routes, Route } from "react-router-dom";
import { TravelPage } from "../pages/travel/show";
import { TravelProvider } from "../context/travel";
import { OtherCostTravelProvider } from "../context/other-cost";
import { FishingProvider } from "../context/fishing";
import { TravelDetailPage } from "../pages/travel/detail";

export const PescaRoutes = () => {
  return (
    <TravelProvider>
      <OtherCostTravelProvider>
        <FishingProvider>
          <Routes>
            <Route path="/" element={<TravelPage />} />
            <Route path="/viaje/:id" element={<TravelDetailPage />} />
            <Route path="/costo-viaje/:id" element={<h1>Costo Viaje</h1>} />
            <Route path="/pesca/:id" element={<h1>Detalle Pesca</h1>} />
          </Routes>
        </FishingProvider>
      </OtherCostTravelProvider>
    </TravelProvider>
  );
};
