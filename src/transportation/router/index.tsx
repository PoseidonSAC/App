import { Routes, Route } from "react-router-dom";
import { MainTransportation } from "./../pages/main/index";
import { TransportistShow } from "./../pages/transportist";
import { VehicleProvider } from "../context/transportist";
import { RoutesProvider } from "../context/routes";
import { VehicleRouteProvider } from "../context/vehicle-route";
import { VehicleRoutesProvider } from "../context/vehicle-routes";
import { RoutesBalanceProvider } from "../context/vehicle_route_balance";
import { RoutesDetailProvider } from "../context/vehicle_route_detail";
import { RoutesMoneyProvider } from "../context/vehicle_route_money";
import { RoutesOilUseProvider } from "../context/vehicle_routes_oil_use";
import { VehicleRouteOtherCostProvider } from "../context/other-cost";

import { RoutesShow } from "./../pages/routes";
import { ControlTransport } from "../pages/control-transport";
import { ControlTransportDetail } from "../pages/control-transport-detail";
import { VehicleUseOilDestiny } from "../pages/control-transport-oil-destiny";

export const TransportationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainTransportation />} />
      <Route
        path="/rutas"
        element={
          <RoutesProvider>
            <RoutesShow />
          </RoutesProvider>
        }
      />
      <Route
        path="/choferes"
        element={
          <VehicleProvider>
            <TransportistShow />
          </VehicleProvider>
        }
      />
      <Route
        path="/control/*"
        element={
          <VehicleProvider>
            <VehicleRouteProvider>
              <RoutesProvider>
                <VehicleRoutesProvider>
                  <RoutesBalanceProvider>
                    <RoutesDetailProvider>
                      <RoutesMoneyProvider>
                        <RoutesOilUseProvider>
                          <VehicleRouteOtherCostProvider>
                            <Routes>
                              <Route path="" element={<ControlTransport />} />
                              <Route
                                path=":id"
                                element={<ControlTransportDetail />}
                              />
                              <Route
                                path="petroleo-destino"
                                element={<VehicleUseOilDestiny />}
                              />
                            </Routes>
                          </VehicleRouteOtherCostProvider>
                        </RoutesOilUseProvider>
                      </RoutesMoneyProvider>
                    </RoutesDetailProvider>
                  </RoutesBalanceProvider>
                </VehicleRoutesProvider>
              </RoutesProvider>
            </VehicleRouteProvider>
          </VehicleProvider>
        }
      />
    </Routes>
  );
};
