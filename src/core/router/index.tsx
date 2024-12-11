import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "../components/protected-routes";
import { Login } from "../../auth/pages/login";
import { Home } from "../../home/pages/home";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes children={null} />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/pesca" />
          <Route path="/carga" />
          <Route path="/transporte" />
          <Route path="/ventas" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
