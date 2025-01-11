import { Routes, Route } from "react-router-dom";

import { BoxesProvider } from "../domain/boxes/context";
import { BoxesReturnProvider } from "../domain/boxes_return/context";
import { ControlBoxesProvider } from "../domain/control_boxes/context";
import { BoxControlPageDetail } from "./../pages/control-detail/index";
import { BoxControlPage } from "./../pages/control/index";

export const BoxesRoutes = () => {
  return (
    <ControlBoxesProvider>
      <BoxesProvider>
        <BoxesReturnProvider>
          <Routes>
            <Route path="/" element={<BoxControlPage />} />
            <Route
              path="/control/:id"
              element={<BoxControlPageDetail />}
            ></Route>
          </Routes>
        </BoxesReturnProvider>
      </BoxesProvider>
    </ControlBoxesProvider>
  );
};
