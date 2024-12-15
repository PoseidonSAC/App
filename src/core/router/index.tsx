import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "../components/protected-routes";
import { Login } from "../../auth/pages/login";
import { Home } from "../../home/pages/home";
import { PescaRoutes } from "../../fishing/router";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/pesca/*" element={<PescaRoutes />} />
          <Route path="/carga/*" />
          <Route path="/transporte/*" />
          <Route path="/ventas/*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
