import { TableRow, TableCell, TableHead } from "@mui/material";

export const TravelTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Codigo</TableCell>
        <TableCell>Creado</TableCell>
        <TableCell>Pago Tripulantes</TableCell>
        <TableCell>Pago Petroleo Lancha</TableCell>
        <TableCell>Pago Estibadores</TableCell>
        <TableCell>Pago Petroleo Carro</TableCell>
      </TableRow>
    </TableHead>
  );
};
