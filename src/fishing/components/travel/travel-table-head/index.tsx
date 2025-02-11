import { TableRow, TableCell, TableHead } from "@mui/material";

export const TravelTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Codigo</TableCell>
        <TableCell>Creado</TableCell>
        <TableCell>Pago Tripulantes</TableCell>
      </TableRow>
    </TableHead>
  );
};
