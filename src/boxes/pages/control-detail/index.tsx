import { useBoxesReturn } from "../../domain/boxes_return/context";
import { useBoxes } from "../../domain/boxes/context";
import { useControlBoxes } from "../../domain/control_boxes/context";

import { BoxesDto, BoxesResDto } from "../../domain/boxes/dto";
import {
  BoxesReturnDto,
  BoxesReturnResDto,
} from "../../domain/boxes_return/dto";

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
  InputLabel,
  Switch,
  Card,
  TableHead,
} from "@mui/material";

import { useState } from "react";
import { format } from "date-fns";

export const BoxControlPageDetail = () => {
  const { boxes, create, remove, update, boxesSelected, setBoxesSelected } =
    useBoxes();
  const { controlBoxesSelected } = useControlBoxes();
  const [isEditing, setIsEditing] = useState(false);
  const [newBox, setNewBox] = useState<BoxesDto>({
    color: "",
    name: "",
    quantity: 0,
    reported_by: "",
    id_control_boxes: controlBoxesSelected?.id || 0,
    createdAt: "",
    hasLiquid: false,
  });

  const handleCreate = async () => {
    await create(newBox);
    setNewBox({
      color: "",
      name: "",
      quantity: 0,
      reported_by: "",
      id_control_boxes: controlBoxesSelected?.id || 0,
      createdAt: "",
      hasLiquid: false,
    });
  };

  const handleRemove = async (id: number) => {
    await remove(id);
  };

  const handleUpdate = async () => {
    if (!controlBoxesSelected) return;
    if (!boxesSelected) return;
    await update(boxesSelected.id, {
      ...newBox,
      id_control_boxes: controlBoxesSelected.id,
    });
    setIsEditing(false);
    setNewBox({
      color: "",
      name: "",
      quantity: 0,
      reported_by: "",
      id_control_boxes: controlBoxesSelected?.id || 0,
      createdAt: "",
      hasLiquid: false,
    });
  };

  const handleEdit = (box: BoxesResDto) => {
    setIsEditing(true);
    setNewBox(box);
    setBoxesSelected(box);
  };

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Agregar Cajas
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <InputLabel>Color</InputLabel>
            <TextField
              fullWidth
              value={newBox.color}
              onChange={(e) => setNewBox({ ...newBox, color: e.target.value })}
            />
          </Box>
          <Box>
            <InputLabel>Nombre</InputLabel>
            <TextField
              fullWidth
              value={newBox.name}
              onChange={(e) => setNewBox({ ...newBox, name: e.target.value })}
            />
          </Box>
          <Box>
            <InputLabel>Cantidad</InputLabel>
            <TextField
              fullWidth
              type="number"
              value={newBox.quantity}
              onChange={(e) =>
                setNewBox({ ...newBox, quantity: Number(e.target.value) })
              }
            />
          </Box>
          <Box>
            <InputLabel>Fecha de Registro</InputLabel>
            <TextField
              fullWidth
              type="date"
              value={newBox.createdAt}
              onChange={(e) =>
                setNewBox({ ...newBox, createdAt: e.target.value })
              }
            />
          </Box>
          <Box>
            <InputLabel>Reportado por</InputLabel>
            <TextField
              fullWidth
              value={newBox.reported_by}
              onChange={(e) =>
                setNewBox({ ...newBox, reported_by: e.target.value })
              }
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <InputLabel>¿Liquidarse?</InputLabel>
            <Switch
              checked={newBox.hasLiquid}
              onChange={(e) =>
                setNewBox({ ...newBox, hasLiquid: e.target.checked })
              }
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={isEditing ? handleUpdate : handleCreate}
            >
              {isEditing ? "Editar" : "Crear"}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="h5" gutterBottom>
          Cajas
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Reportado por</TableCell>
                <TableCell>¿Liquidarse?</TableCell>
                <TableCell>Fecha de Registro</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boxes.map((box) => (
                <TableRow key={box.id}>
                  <TableCell>{box.name}</TableCell>
                  <TableCell>{box.color}</TableCell>
                  <TableCell>{box.quantity}</TableCell>
                  <TableCell>{box.reported_by}</TableCell>
                  <TableCell>{box.hasLiquid ? "Sí" : "No"}</TableCell>
                  <TableCell>
                    {format(
                      new Date(box.createdAt.split("Z")[0]),
                      "dd/MM/yyyy"
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(box)}>Editar</Button>
                    <Button onClick={() => handleRemove(box.id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <BoxControlBoxesReturn />
    </Card>
  );
};

export const BoxControlBoxesReturn = () => {
  const {
    boxesReturn,
    boxesReturnSelected,
    create,
    remove,
    setBoxesReturnSelected,
    update,
  } = useBoxesReturn();
  const { boxes } = useBoxes();
  const [isEditing, setIsEditing] = useState(false);
  const [newBoxReturn, setNewBoxReturn] = useState<BoxesReturnDto>({
    id_boxes: 0,
    quantity: 0,
    date: "",
  });

  const handleCreate = async (id_boxes: number) => {
    await create({ ...newBoxReturn, id_boxes });
    setNewBoxReturn({
      id_boxes: 0,
      quantity: 0,
      date: "",
    });
  };

  const handleRemove = async (id: number) => {
    await remove(id);
  };

  const handleUpdate = async () => {
    if (!boxesReturnSelected) return;
    await update(boxesReturnSelected.id, newBoxReturn);
    setIsEditing(false);
    setNewBoxReturn({
      id_boxes: 0,
      quantity: 0,
      date: "",
    });
  };

  const handleEdit = (boxReturn: BoxesReturnResDto) => {
    setIsEditing(true);
    setNewBoxReturn({
      id_boxes: boxReturn.id_boxes,
      quantity: boxReturn.quantity,
      date: handleFomatDateInput(boxReturn.date),
    });
    setBoxesReturnSelected(boxReturn);
  };

  const handleFomatDate = (date: string) => {
    const dateWithoutTime = date.split("Z")[0];
    return format(new Date(dateWithoutTime), "dd/MM/yyyy");
  };

  const handleFomatDateInput = (date: string) => {
    if (!date) return "";
    const dateWithoutTime = date.split("Z")[0];
    return format(new Date(dateWithoutTime), "yyyy-MM-dd");
  };

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      {boxes.map((box) => {
        if (!box.hasLiquid) return null;
        if (!boxesReturn) return null;
        const boxReturns = boxesReturn[box.id] || [];
        return (
          <Box sx={{ mb: 3 }} key={box.id}>
            <Typography variant="h5" gutterBottom>
              Reporte de cajas de {box.reported_by} - {box.color} - {box.name}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <InputLabel>Cantidad</InputLabel>
                <TextField
                  fullWidth
                  type="number"
                  value={newBoxReturn.quantity}
                  onChange={(e) =>
                    setNewBoxReturn({
                      ...newBoxReturn,
                      quantity: Number(e.target.value),
                    })
                  }
                />
              </Box>
              <Box>
                <InputLabel>Fecha</InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  value={newBoxReturn.date}
                  onChange={(e) => {
                    setNewBoxReturn({
                      ...newBoxReturn,
                      date: e.target.value,
                    });
                  }}
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    isEditing ? handleUpdate() : handleCreate(box.id)
                  }
                >
                  {isEditing ? "Actualizar" : "Crear"}
                </Button>
              </Box>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {boxReturns.map((boxReturn) => (
                    <TableRow key={boxReturn.id}>
                      <TableCell>{boxReturn.quantity}</TableCell>
                      <TableCell>{handleFomatDate(boxReturn.date)}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(boxReturn)}>
                          Editar
                        </Button>
                        <Button onClick={() => handleRemove(boxReturn.id)}>
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Card sx={{ mt: 2, p: 2, display: "flex", gap: 2 }}>
              <Typography variant="h5" gutterBottom>
                Cajas Pendientes
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {boxReturns.reduce((acc, boxReturn) => {
                  return acc - boxReturn.quantity;
                }, box.quantity)}
              </Box>
            </Card>
          </Box>
        );
      })}
    </Card>
  );
};
