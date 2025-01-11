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
  });

  const handleEdit = (vehicle: VehicleRestDto) => {
    setVehicleSelected(vehicle);
    setFormData({
      name: vehicle.name,
      user: vehicle.user,
      plate: vehicle.plate,
      type: vehicle.type,
      phone: vehicle.phone,
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {vehicleSelected ? "Update" : "Create"}
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
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(vehicle)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
