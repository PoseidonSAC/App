import { Table, TableContainer, TableBody } from "@mui/material";

import { TravelRow } from "../travel-row";
import { TravelTableHead } from "../travel-table-head";

import { travelResDto } from "../../../domain/dto/travel.dto";
import { useNavigate } from "react-router-dom";
import { useTravel } from "./../../../context/travel/useContext";
import { format } from "date-fns";

export interface TravelTableProps {
  travels: travelResDto[];
}

export const TravelTable = ({ travels }: TravelTableProps) => {
  const navigate = useNavigate();
  const { SetTravelSelected } = useTravel();
  const goToDetail = (travel: travelResDto) => {
    SetTravelSelected(travel);
    navigate(`/pesca/viaje/${travel.id}`);
  };
  const dateFormater = (date: string) => {
    return format(date.slice(0, -1), "dd/MM/yyyy");
  };
  return (
    <TableContainer>
      <Table>
        <TravelTableHead />
        <TableBody>
          {travels.map((travel) => (
            <TravelRow
              key={travel.id}
              travel={travel}
              goToDetail={goToDetail}
              dateFormater={dateFormater}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
