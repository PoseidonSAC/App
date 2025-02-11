import { useVehicleRoute } from "../../context/vehicle-route";
import { useNavigate } from "react-router-dom";
import { VehicleRouteDto, VehicleRouteResDto } from "../../dto/vehicle-route";

import { useState } from "react";
import {
  TextField,
  Button as MuiButton,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { useVehicle } from "../../context/transportist";
import { format, parseISO } from "date-fns";

interface ControlTransportFormProps {
  createRoute: (route: VehicleRouteDto) => void;
  updateRoute: (id: number, route: VehicleRouteDto) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  idRoute: number;
  setIdRoute: (id: number) => void;
  newRoute: VehicleRouteDto;
  setNewRoute: (route: VehicleRouteDto) => void;
}

export const ControlTransportForm = ({
  createRoute,
  updateRoute,
  isEditing,
  setIsEditing,
  idRoute,
  newRoute,
  setNewRoute,
}: ControlTransportFormProps) => {
  const { vehicles } = useVehicle();

  const handleCreateRoute = () => {
    createRoute({
      ...newRoute,
      createdAt: formatToISODate(newRoute.createdAt),
    });
    resetNewRoute();
  };

  const sendUpdateRoute = async (newRoute: VehicleRouteDto) => {
    await updateRoute(idRoute, {
      ...newRoute,
      createdAt: formatToISODate(newRoute.createdAt),
    });
    setIsEditing(false);
    resetNewRoute();
  };

  const resetNewRoute = () => {
    setNewRoute({
      createdAt: "",
      id_vehicle: 0,
      state: "NO ENTREGADO",
      is_concluded: "NO",
    });
  };

  const formatToISODate = (date: string): string => {
    return new Date(date).toISOString();
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <FormControl fullWidth>
        <InputLabel id="vehicle-select-label">Vehiculo</InputLabel>
        <Select
          labelId="vehicle-select-label"
          label="Vehiculo"
          value={newRoute.id_vehicle === 0 ? "" : newRoute.id_vehicle}
          onChange={(e) =>
            setNewRoute({ ...newRoute, id_vehicle: e.target.value as number })
          }
        >
          {vehicles
            .filter((vehicle) => vehicle.is_active)
            .map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        label="Fecha"
        value={newRoute.createdAt || ""}
        type="date"
        onChange={(e) =>
          setNewRoute({ ...newRoute, createdAt: e.target.value })
        }
        InputLabelProps={{ shrink: true }}
      />
      <FormControl fullWidth>
        <InputLabel id="state-select-label">Hoja de Gastos</InputLabel>
        <Select
          labelId="state-select-label"
          label="Hoja de Gastos"
          value={newRoute.state}
          onChange={(e) => setNewRoute({ ...newRoute, state: e.target.value })}
        >
          <MenuItem value="ENTREGADO">ENTREGADO</MenuItem>
          <MenuItem value="NO ENTREGADO">NO ENTREGADO</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Liquidado"
        value={newRoute.is_concluded}
        onChange={(e) =>
          setNewRoute({ ...newRoute, is_concluded: e.target.value })
        }
        fullWidth
      />

      {!isEditing ? (
        <MuiButton
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleCreateRoute}
        >
          Nuevo Viaje
        </MuiButton>
      ) : (
        <MuiButton
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => sendUpdateRoute(newRoute)}
        >
          Editar Viaje
        </MuiButton>
      )}
    </Box>
  );
};

interface ControlTransportTableProps {
  handleSelectRoute: (route: VehicleRouteResDto) => void;
  handleDeleteRoute: (id: number) => void;
  handleUpdateRoute: (route: VehicleRouteResDto) => void;
}

export const ControlTransportTable = ({
  handleSelectRoute,
  handleDeleteRoute,
  handleUpdateRoute,
}: ControlTransportTableProps) => {
  const handleDate = (isoDate: string) => {
    return format(parseISO(isoDate.slice(0, -1)), "dd-MM-yyyy");
  };

  const { filteredRoutes } = useVehicleRoute();

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Hoja de Gastos</TableCell>
            <TableCell>Vehiculo</TableCell>
            <TableCell>Punto de Carga</TableCell>
            <TableCell>Destino</TableCell>
            <TableCell>Quien Liquida</TableCell>
            <TableCell>Liquidado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRoutes.map((route) => (
            <TableRow key={route.id}>
              <TableCell>{handleDate(route.createdAt)}</TableCell>
              <TableCell>{route.state}</TableCell>
              <TableCell>{route.vehicle.name}</TableCell>
              <TableCell>
                {route.vehicle_route_detail?.point_charge || "No especificado"}
              </TableCell>

              <TableCell>
                {route.vehicle_route_detail?.destiny || "No especificado"}
              </TableCell>
              <TableCell>
                {route.vehicle_route_detail?.who_destination ||
                  "No especificado"}
              </TableCell>

              <TableCell>{route.is_concluded}</TableCell>

              <TableCell
                style={{
                  display: "flex",
                  gap: "5px",
                  justifyContent: "flex-start",
                }}
              >
                <MuiButton
                  onClick={() => handleSelectRoute(route)}
                  variant="outlined"
                  color="primary"
                >
                  Detalle
                </MuiButton>
                <MuiButton
                  onClick={() => handleDeleteRoute(route.id)}
                  variant="outlined"
                  color="secondary"
                >
                  Borrar
                </MuiButton>
                <MuiButton
                  onClick={() => handleUpdateRoute(route)}
                  variant="outlined"
                  color="primary"
                >
                  Editar
                </MuiButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export const ControlTransport = () => {
  const { createRoute, deleteRoute, setRouteSelected, updateRoute } =
    useVehicleRoute();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [idRoute, setIdRoute] = useState<number>(0);
  const navigate = useNavigate();
  const [newRoute, setNewRoute] = useState<VehicleRouteDto>({
    createdAt: "",
    id_vehicle: 0,
    state: "INICIADO",
    is_concluded: "NO",
  });

  const handleSelectRoute = (route: VehicleRouteResDto) => {
    setRouteSelected(route);
    navigate(`/transporte/control/${route.id}`);
  };

  const formatToInputDate = (isoDate: string): string => {
    return format(parseISO(isoDate.slice(0, -1)), "yyyy-MM-dd");
  };

  return (
    <div style={{ padding: "20px" }}>
      <ControlTransportForm
        createRoute={createRoute}
        updateRoute={updateRoute}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        idRoute={idRoute}
        setIdRoute={setIdRoute}
        newRoute={newRoute}
        setNewRoute={setNewRoute}
      />
      <ControlTransportFilter />
      <ControlTransportTable
        handleSelectRoute={handleSelectRoute}
        handleDeleteRoute={deleteRoute}
        handleUpdateRoute={(route) => {
          setIsEditing(true);
          setIdRoute(route.id);
          setNewRoute({
            createdAt: formatToInputDate(route.createdAt),
            id_vehicle: route.id_vehicle,
            state: route.state,
            is_concluded: route.is_concluded,
          });
        }}
      />
    </div>
  );
};

export const ControlTransportFilter = () => {
  const { searchTerm, setSearchTerm, routes, setFilteredRoutes, handleFilter } =
    useVehicleRoute();

  const handleSearch = () => {
    handleFilter();
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredRoutes(routes);
  };

  return (
    <Box
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        marginTop: "20px",
      }}
    >
      <TextField
        label="Buscar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
      />
      <MuiButton variant="contained" color="primary" onClick={handleSearch}>
        Buscar
      </MuiButton>
      <MuiButton variant="outlined" color="secondary" onClick={handleReset}>
        Resetear
      </MuiButton>
    </Box>
  );
};
