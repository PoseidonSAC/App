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

export const ControlTransport = () => {
  const { routes, createRoute, deleteRoute, setRouteSelected, updateRoute } =
    useVehicleRoute();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [idRoute, setIdRoute] = useState<number>(0);
  const { vehicles } = useVehicle();
  const navigate = useNavigate();
  const [newRoute, setNewRoute] = useState<VehicleRouteDto>({
    createdAt: "",
    id_vehicle: 0,
    state: "INICIADO",
  });

  const handleCreateRoute = () => {
    createRoute({
      ...newRoute,
      createdAt: formatToISODate(newRoute.createdAt),
    });
    setNewRoute({
      createdAt: "",
      id_vehicle: 0,
      state: "INICIADO",
    });
  };

  const handleDeleteRoute = async (id: number) => {
    await deleteRoute(id);
  };

  const handleUpdateRoute = async (route: VehicleRouteResDto) => {
    setIsEditing(true);
    setIdRoute(route.id);
    setNewRoute({
      createdAt: formatToInputDate(route.createdAt),
      id_vehicle: route.id_vehicle,
      state: route.state,
    });
  };

  const SendUpdateRoute = async (newRoute: VehicleRouteDto) => {
    await updateRoute(idRoute, {
      ...newRoute,
      createdAt: formatToISODate(newRoute.createdAt),
    });
    setIsEditing(false);
    setNewRoute({
      createdAt: "",
      id_vehicle: 0,
      state: "INICIADO",
    });
  };

  const handleDate = (isoDate: string) => {
    return format(parseISO(isoDate.slice(0, -1)), "dd-MM-yyyy");
  };

  const formatToInputDate = (isoDate: string): string => {
    return format(parseISO(isoDate.slice(0, -1)), "yyyy-MM-dd");
  };
  const formatToISODate = (date: string) => {
    return new Date(date).toISOString();
  };

  const handleSelectRoute = (route: VehicleRouteResDto) => {
    setRouteSelected(route);
    navigate(`/transporte/control/${route.id}`);
  };

  const getVehicleName = (id: number) => {
    const vehicle = vehicles.find((v) => v.id === id);
    return vehicle ? vehicle.name : "Unknown";
  };

  return (
    <div style={{ padding: "20px" }}>
      <Box style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
          <InputLabel id="state-select-label">Estado</InputLabel>
          <Select
            labelId="state-select-label"
            label="Estado"
            value={newRoute.state}
            onChange={(e) =>
              setNewRoute({ ...newRoute, state: e.target.value })
            }
          >
            <MenuItem value="ESPERA">ESPERA</MenuItem>
            <MenuItem value="LIQUIDADO">LIQUIDADO</MenuItem>
            <MenuItem value="INICIADO">INICIADO</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel
            id="vehicle-select-label
        "
          >
            Vehiculo
          </InputLabel>
          <Select
            labelId="vehicle-select-label"
            label="Vehiculo"
            value={newRoute.id_vehicle === 0 ? "" : newRoute.id_vehicle}
            onChange={(e) =>
              setNewRoute({ ...newRoute, id_vehicle: e.target.value as number })
            }
          >
            {vehicles.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            onClick={() => SendUpdateRoute(newRoute)}
          >
            Editar Viaje
          </MuiButton>
        )}
      </Box>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <MuiTable>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id}>
                <TableCell>{handleDate(route.createdAt)}</TableCell>
                <TableCell>{route.state}</TableCell>
                <TableCell>{getVehicleName(route.id_vehicle)}</TableCell>
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
    </div>
  );
};
