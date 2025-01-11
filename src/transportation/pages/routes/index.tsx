import { useRoutes } from "../../context/routes";
import { RouteDto, RouteResDto } from "../../dto/routes";
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

export const RoutesShow = () => {
  const {
    routes,
    routeSelected,
    setRouteSelected,
    createRoute,
    updateRoute,
    deleteRoute,
  } = useRoutes();

  const [formData, setFormData] = useState<RouteDto>({
    end: "",
    init: "",
    oil_use: 0,
    type: "",
  });

  const handleEdit = (vehicle: RouteResDto) => {
    setRouteSelected(vehicle);
    setFormData({
      end: vehicle.end,
      init: vehicle.init,
      oil_use: vehicle.oil_use,
      type: vehicle.type,
    });
  };

  const handleDelete = async (vehicle: RouteResDto) => {
    await deleteRoute(vehicle.id);
  };

  const handleSubmit = async () => {
    if (routeSelected) {
      await updateRoute(routeSelected.id, formData);
    } else {
      await createRoute(formData);
    }
    setRouteSelected(null);
    setFormData({
      end: "",
      init: "",
      oil_use: 0,
      type: "",
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
            label="INICIO"
            value={formData.init}
            onChange={(e) =>
              setFormData({ ...formData, init: e.target.value.toUpperCase() })
            }
            fullWidth
          />
          <TextField
            label="DESTINO"
            value={formData.end}
            onChange={(e) =>
              setFormData({ ...formData, end: e.target.value.toUpperCase() })
            }
            fullWidth
          />
          <TextField
            label="TIPO"
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value.toUpperCase() })
            }
            fullWidth
            select
          >
            <MenuItem value="TRACTO">TRACTO</MenuItem>
            <MenuItem value="CAMION">CAMION</MenuItem>
          </TextField>
          <TextField
            label="CONSUMO"
            value={formData.oil_use}
            type="number"
            onChange={(e) =>
              setFormData({ ...formData, oil_use: parseFloat(e.target.value) })
            }
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {routeSelected ? "UPDATE" : "CREATE"}
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
            <TableCell>Inicio</TableCell>
            <TableCell>Destino</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Consumo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {routes.map((route, id) => (
            <TableRow key={id}>
              <TableCell>{route.init}</TableCell>
              <TableCell>{route.end}</TableCell>
              <TableCell>{route.type}</TableCell>
              <TableCell>{route.oil_use}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(route)}>Edit</Button>
                <Button onClick={() => handleDelete(route)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
