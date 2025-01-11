import { useControlBoxes } from "./../../domain/control_boxes/context/useContext";
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Button,
  TableContainer,
  Paper,
  TextField,
  Typography,
  TableHead,
  Switch,
} from "@mui/material";
import {
  ControlBoxesDto,
  ControlBoxesResDto,
} from "../../domain/control_boxes/dto";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export const BoxControlPage = () => {
  const { controlBoxes, setControlBoxesSelected, create, remove, update } =
    useControlBoxes();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [idControlBoxe, setIdControlBoxe] = useState<number>(0);
  const [newControlBoxe, setNewControlBoxe] = useState<ControlBoxesDto>({
    code: "",
    concluded: false,
    date_arrive: "",
    place: "",
  });
  const navigate = useNavigate();

  const handleCreate = () => {
    create(newControlBoxe);
    setNewControlBoxe({
      code: "",
      concluded: false,
      date_arrive: "",
      place: "",
    });
  };

  const handleDelete = async (id: number) => {
    await remove(id);
  };

  const handleUpdate = async (controlBoxe: ControlBoxesResDto) => {
    setIsEditing(true);
    setIdControlBoxe(controlBoxe.id);
    setNewControlBoxe({
      code: controlBoxe.code,
      concluded: controlBoxe.concluded,
      date_arrive: handleFomatDateInput(controlBoxe.date_arrive),
      place: controlBoxe.place,
    });
  };

  const handleSendUpdate = () => {
    update(idControlBoxe, newControlBoxe);
    setIsEditing(false);
    setIdControlBoxe(0);
    setNewControlBoxe({
      code: "",
      concluded: false,
      date_arrive: "",
      place: "",
    });
  };

  const handleSelectControlBoxe = (controlBoxe: ControlBoxesResDto) => {
    setControlBoxesSelected(controlBoxe);
    navigate(`/cajas/control/${controlBoxe.id}`);
  };

  const handleFomatDate = (date: string) => {
    const dateWithoutTime = date.split("Z")[0];
    return format(dateWithoutTime, "dd/MM/yyyy");
  };

  const handleFomatDateInput = (date: string) => {
    if (!date) return "";
    const dateWithoutTime = date.split("Z")[0];
    return format(dateWithoutTime, "yyyy-MM-dd");
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" mb={2}>
        <Typography variant="h4">Control de Cajas</Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          label="Código"
          value={newControlBoxe.code}
          onChange={(e) =>
            setNewControlBoxe({ ...newControlBoxe, code: e.target.value })
          }
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Lugar"
          value={newControlBoxe.place}
          onChange={(e) =>
            setNewControlBoxe({ ...newControlBoxe, place: e.target.value })
          }
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Fecha de llegada"
          value={newControlBoxe.date_arrive}
          type="date"
          onChange={(e) =>
            setNewControlBoxe({
              ...newControlBoxe,
              date_arrive: e.target.value,
            })
          }
          InputLabelProps={{ shrink: true }}
        />

        {isEditing && (
          <Box>
            <Typography>Concluido</Typography>
            <Switch
              checked={newControlBoxe.concluded}
              onChange={(e) =>
                setNewControlBoxe({
                  ...newControlBoxe,
                  concluded: e.target.checked,
                })
              }
            />
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={isEditing ? handleSendUpdate : handleCreate}
        >
          {isEditing ? "Actualizar" : "Crear"}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Lugar</TableCell>
              <TableCell>Fecha de llegada</TableCell>
              <TableCell>Dias Transcurridos</TableCell>
              <TableCell> Liquidado</TableCell>

              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {controlBoxes.map((controlBoxe) => (
              <TableRow key={controlBoxe.id}>
                <TableCell>{controlBoxe.code}</TableCell>
                <TableCell>{controlBoxe.place}</TableCell>
                <TableCell>
                  {handleFomatDate(controlBoxe.date_arrive)}
                </TableCell>
                <TableCell>
                  {controlBoxe.concluded
                    ? "Caja Concluida"
                    : `${Math.floor(
                        (new Date().getTime() -
                          new Date(controlBoxe.date_arrive).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )} días`}
                </TableCell>
                <TableCell>{controlBoxe.concluded ? "Si" : "No"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSelectControlBoxe(controlBoxe)}
                  >
                    Ver
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(controlBoxe)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(controlBoxe.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
