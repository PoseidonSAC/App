import { useVehicle } from "../../context/transportist";
import { VehicleDto, VehicleRestDto } from "../../dto/vehicle";
import {
  Box,
  Button,
  Container,
  TableBody,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

export const TransportistShow = () => {
  const {
    vehicles,
    vehicleSelected,
    setVehicleSelected,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  } = useVehicle();

  const [formData, setFormData] = useState<VehicleDto>({
    name: "",
    user: "",
    plate: "",
    type: "",
    phone: "",
    is_active: true,
  });

  const handleEdit = (vehicle: VehicleRestDto) => {
    setVehicleSelected(vehicle);
    setFormData({
      name: vehicle.name,
      user: vehicle.user,
      plate: vehicle.plate,
      type: vehicle.type,
      phone: vehicle.phone,
      is_active: vehicle.is_active,
    });
  };

  const handleDelete = async (vehicle: VehicleRestDto) => {
    await deleteVehicle(vehicle.id);
  };

  const handleSubmit = async () => {
    if (vehicleSelected) {
      await updateVehicle(vehicleSelected.id, formData);
    } else {
      await createVehicle(formData);
    }
    setVehicleSelected(null);
    setFormData({
      name: "",
      user: "",
      plate: "",
      type: "",
      phone: "",
      is_active: true,
    });
  };

  return (
    <Box>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          mt={2}
        >
          <TextField
            label="Chofer"
            value={formData.user}
            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
            fullWidth
          />
          <TextField
            label="Codigo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Placa"
            value={formData.plate}
            onChange={(e) =>
              setFormData({ ...formData, plate: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Tipo"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            fullWidth
            select
          >
            <MenuItem value="TRACTO">TRACTO</MenuItem>
            <MenuItem value="CAMION">CAMION</MenuItem>
          </TextField>
          <TextField
            label="Teléfono"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            fullWidth
          />
          {vehicleSelected && (
            <TextField
              label="Estado"
              value={formData.is_active ? "Activo" : "Inactivo"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  is_active: e.target.value === "Activo",
                })
              }
              fullWidth
              select
            >
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Inactivo">Inactivo</MenuItem>
            </TextField>
          )}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {vehicleSelected ? "Editar" : "Crear"}
          </Button>
        </Box>
      </Container>
      <Table
        sx={{
          mt: 1,
          ml: 2,
          mr: 2,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Codigo</TableCell>
            <TableCell>Chofer</TableCell>
            <TableCell>Placa</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle, id) => (
            <TableRow key={id}>
              <TableCell>{vehicle.name}</TableCell>
              <TableCell>{vehicle.user}</TableCell>
              <TableCell>{vehicle.plate}</TableCell>
              <TableCell>{vehicle.type}</TableCell>
              <TableCell>{vehicle.phone}</TableCell>
              <TableCell>{vehicle.is_active ? "Activo" : "Inactivo"}</TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEdit(vehicle)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(vehicle)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
