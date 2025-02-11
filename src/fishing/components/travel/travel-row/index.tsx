import { TableCell, TableRow } from "@mui/material";
import { travelResDto } from "./../../../domain/dto/travel.dto";
export interface TravelRowProps {
  travel: travelResDto;
  goToDetail: (travel: travelResDto) => void;
  dateFormater: (date: string) => string;
}

export const TravelRow = ({
  travel,
  goToDetail,
  dateFormater,
}: TravelRowProps) => {
  return (
    <TableRow
      key={travel.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        ":hover": { backgroundColor: "#f5f5f5" },
      }}
      onClick={() => goToDetail(travel)}
      style={{ cursor: "pointer" }}
    >
      <TableCell component={"th"} scope="row">
        {travel.code}
      </TableCell>
      <TableCell component={"th"} scope="row">
        {dateFormater(travel.createdAt)}
      </TableCell>

      <TableCell component={"th"} scope="row">
        {travel.fishing_date_canceled ? "Cancelado" : "No Cancelado"}
      </TableCell>
    </TableRow>
  );
};
