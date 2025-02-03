import { useRouteDetail } from "../../context/vehicle_route_detail";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { VehicleRouteDetailUseOilDestiny } from "../../dto/vehicle_route_detail";
import { format, parseISO } from "date-fns";

export const VehicleUseOilDestiny = () => {
  const { VehicleUsegeOilByDestination } = useRouteDetail();
  const [oilUse, setOilUse] = useState<VehicleRouteDetailUseOilDestiny[]>([]);
  const { register, handleSubmit } = useForm<{ destination: string }>();

  const onSubmit = async (data: { destination: string }) => {
    const response = await VehicleUsegeOilByDestination(data.destination);
    response.sort(
      (a, b) => new Date(b.dateInit).getTime() - new Date(a.dateInit).getTime()
    );
    setOilUse(response);
  };

  const formatToTableDate = (isoDate: string): string => {
    return format(parseISO(isoDate.slice(0, -1)), "dd/MM/yyyy");
  };

  return (
    <div style={{ padding: "20px" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <TextField
          {...register("destination")}
          label="Destino"
          variant="outlined"
          style={{ flex: 1 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Buscar
        </Button>
      </form>

      {oilUse.length === 0 ? (
        <p>No se encontró información.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha Salida</TableCell>
                <TableCell>Vehiculo</TableCell>
                <TableCell>Destino</TableCell>
                <TableCell>Petroleo Usado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {oilUse.map((oil, index) => (
                <TableRow key={index}>
                  <TableCell>{formatToTableDate(oil.dateInit)}</TableCell>
                  <TableCell>{oil.vehicle}</TableCell>
                  <TableCell>{oil.destination}</TableCell>
                  <TableCell>{oil.vehicle_route_oil_usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
