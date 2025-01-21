import { useBoxesReturn } from "../../domain/boxes_return/context";
import { useBoxes } from "../../domain/boxes/context";
import { useBoxesPlace } from "../../domain/boxes-place/context";

import { BoxesDto, BoxesResDto } from "../../domain/boxes/dto";
import {
  BoxesReturnDto,
  BoxesReturnResDto,
} from "../../domain/boxes_return/dto";

import { BoxesPlaceDto, BoxesPlaceResDto } from "../../domain/boxes-place/dto";

import {
  Modal,
  Box as MuiBox,
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
import { format, parseISO } from "date-fns";
import { useControlBoxes } from "../../domain/control_boxes/context";

export const BoxControlPageDetail = () => {
  const { controlBoxesSelected } = useControlBoxes();
  const handleFormatDate = (isoDate: string): string => {
    return format(parseISO(isoDate.slice(0, -1)), "dd/MM/yyyy");
  };
  return (
    <>
      {controlBoxesSelected && (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            bgcolor: "primary.main",
            color: "white",
            m: 2,
          }}
        >
          <Typography variant="h6">{controlBoxesSelected.code}</Typography>
          <Typography variant="h6">
            {handleFormatDate(controlBoxesSelected.date_arrive)}
          </Typography>
        </Card>
      )}
      <BoxesPlace />
      <BoxBoxes />
    </>
  );
};

export const BoxesPlace = () => {
  const { boxesPlace, create, update, remove } = useBoxesPlace();
  const { controlBoxesSelected } = useControlBoxes();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [idControlBoxe, setIdControlBoxe] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const dummy = {
    name: "",
    concluded: false,
    date_arrive: "",
    reported_by: "",
    hasLiquid: false,
    id_control_boxes: 0,
  };
  const [newControlBoxe, setNewControlBoxe] = useState<BoxesPlaceDto>(dummy);

  const handleCreate = async () => {
    if (!controlBoxesSelected) return;
    await create({
      ...newControlBoxe,
      date_arrive: formatToISODate(newControlBoxe.date_arrive),
      id_control_boxes: controlBoxesSelected.id,
    });
    setNewControlBoxe(dummy);
    setOpen(false);
  };

  const handleDelete = async (id: number) => {
    await remove(id);
  };

  const handleUpdate = async (id: number) => {
    await update(id, {
      ...newControlBoxe,
      date_arrive: formatToISODate(newControlBoxe.date_arrive),
    });
    setNewControlBoxe(dummy);
    setOpen(false);
  };

  const formatToInputDate = (isoDate: string): string => {
    return format(parseISO(isoDate.slice(0, -1)), "yyyy-MM-dd");
  };

  const formatToTableDate = (isoDate: string): string => {
    return format(parseISO(isoDate.slice(0, -1)), "dd/MM/yyyy");
  };

  const formatToISODate = (date: string): string =>
    new Date(date).toISOString();

  const handleEdit = async (box: BoxesPlaceResDto) => {
    setIsEditing(true);
    setIdControlBoxe(box.id);
    setNewControlBoxe({
      name: box.name,
      concluded: box.concluded,
      date_arrive: formatToInputDate(box.date_arrive),
      reported_by: box.reported_by,
      hasLiquid: box.hasLiquid,
      id_control_boxes: box.id_control_boxes,
    });
    setOpen(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    setNewControlBoxe(dummy);
    setIsEditing(false);
    setOpen(false);
  };

  return (
    <Card>
      <Button onClick={handleOpen}>Añadir Control</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Concluded</TableCell>
              <TableCell>Date Arrive</TableCell>
              <TableCell>Reported By</TableCell>
              <TableCell>Has Liquid</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boxesPlace.map((box) => (
              <TableRow key={box.id}>
                <TableCell>{box.name}</TableCell>
                <TableCell>{box.concluded ? "Yes" : "No"}</TableCell>
                <TableCell>{formatToTableDate(box.date_arrive)}</TableCell>
                <TableCell>{box.reported_by}</TableCell>
                <TableCell>{box.hasLiquid ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(box)}>Edit</Button>
                  <Button onClick={() => handleDelete(box.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <MuiBox sx={{ ...style, width: 400 }}>
          <Typography variant="h6" component="h2">
            {isEditing ? "Edit Box" : "Add New Box"}
          </Typography>
          <TextField
            label="Name"
            value={newControlBoxe.name}
            onChange={(e) =>
              setNewControlBoxe({ ...newControlBoxe, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date Arrive"
            type="date"
            value={newControlBoxe.date_arrive}
            onChange={(e) =>
              setNewControlBoxe({
                ...newControlBoxe,
                date_arrive: e.target.value,
              })
            }
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Reported By"
            value={newControlBoxe.reported_by}
            onChange={(e) =>
              setNewControlBoxe({
                ...newControlBoxe,
                reported_by: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <InputLabel>Concluded</InputLabel>
          <Switch
            checked={newControlBoxe.concluded}
            onChange={(e) =>
              setNewControlBoxe({
                ...newControlBoxe,
                concluded: e.target.checked,
              })
            }
          />
          <InputLabel>Has Liquid</InputLabel>
          <Switch
            checked={newControlBoxe.hasLiquid}
            onChange={(e) =>
              setNewControlBoxe({
                ...newControlBoxe,
                hasLiquid: e.target.checked,
              })
            }
          />
          <Button
            onClick={
              isEditing ? () => handleUpdate(idControlBoxe) : handleCreate
            }
          >
            {isEditing ? "Update" : "Create"}
          </Button>
          <Button onClick={handleCancel}>Cancelar</Button>
        </MuiBox>
      </Modal>
    </Card>
  );
};

export const BoxBoxes = () => {
  const { create, update, remove, setBoxesSelected } = useBoxes();
  const { boxesPlace } = useBoxesPlace();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [idBoxePlace, setIdBoxePlace] = useState<number>(0);
  const [openReturn, setOpenReturn] = useState(false);
  const dummy = {
    name: "",
    color: "",
    quantity: 0,
    id_control_place: 0,
  };
  const [newBox, setNewBox] = useState<BoxesDto>(dummy);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleCreate = async (box: BoxesDto, boxePlaceId: number) => {
    await create({ ...box, id_control_place: boxePlaceId });
    setNewBox(dummy);
    setOpen(false);
  };

  const handleEdit = (box: BoxesResDto) => {
    setIsEditing(true);
    setIdBoxePlace(box.id_control_place);
    setNewBox(dummy);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    remove(id);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenReturn = () => setOpenReturn(true);
  const handleCloseReturn = () => setOpenReturn(false);

  return (
    <>
      {boxesPlace.map((place) => (
        <Card key={place.id}>
          <Typography variant="h6">{place.name}</Typography>
          <Button onClick={handleOpen}>Add Box</Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {place.boxes.map((box) => (
                  <TableRow key={box.id}>
                    <TableCell>{box.name}</TableCell>
                    <TableCell>{box.color}</TableCell>
                    <TableCell>{box.quantity}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setBoxesSelected(box);
                          handleOpenReturn();
                        }}
                      >
                        Liquidar
                      </Button>
                      <Button onClick={() => handleEdit(box)}>Edit</Button>
                      <Button onClick={() => handleDelete(box.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal open={open} onClose={handleClose}>
            <MuiBox sx={{ ...style, width: 400 }}>
              <Typography variant="h6" component="h2">
                {isEditing ? "Edit Box" : "Add New Box"}
              </Typography>
              <TextField
                label="Name"
                value={newBox.name}
                onChange={(e) => setNewBox({ ...newBox, name: e.target.value })}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Color"
                value={newBox.color}
                onChange={(e) =>
                  setNewBox({ ...newBox, color: e.target.value })
                }
                fullWidth
                margin="normal"
              />

              <TextField
                label="Quantity"
                value={newBox.quantity}
                onChange={(e) =>
                  setNewBox({ ...newBox, quantity: parseInt(e.target.value) })
                }
                fullWidth
                margin="normal"
              />

              <Button
                onClick={() =>
                  isEditing
                    ? update(idBoxePlace, newBox)
                    : handleCreate(newBox, place.id)
                }
              >
                {isEditing ? "Update" : "Create"}
              </Button>
            </MuiBox>
          </Modal>
        </Card>
      ))}
      <BoxControlBoxesReturn
        open={openReturn}
        handleClose={handleCloseReturn}
        handleOpen={handleOpenReturn}
      />
    </>
  );
};

interface BoxControlBoxesReturnProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

export const BoxControlBoxesReturn = ({
  open,
  handleClose,
  handleOpen,
}: BoxControlBoxesReturnProps) => {
  const { create, remove, update, boxesReturn } = useBoxesReturn();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { boxesSelected } = useBoxes();
  const dummy: BoxesReturnDto = {
    quantity: 0,
    id_boxes: 0,
    date: "",
  };
  const [newBoxReturn, setNewBoxReturn] = useState<BoxesReturnDto>(dummy);

  const handleCreateReturn = async () => {
    if (!boxesSelected) return;
    await create({
      ...newBoxReturn,
      id_boxes: boxesSelected.id,
      date: formatToISODate(newBoxReturn.date),
    });
    setNewBoxReturn(dummy);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const formatToInputDate = (isoDate: string): string => {
    return format(parseISO(isoDate.slice(0, -1)), "yyyy-MM-dd");
  };

  const formatToTableDate = (isoDate: string): string => {
    return format(parseISO(isoDate.slice(0, -1)), "dd/MM/yyyy");
  };

  const formatToISODate = (date: string): string =>
    new Date(date).toISOString();

  const handleEditReturn = (boxReturn: BoxesReturnResDto) => {
    setIsEditing(true);
    setNewBoxReturn({
      quantity: boxReturn.quantity,
      id_boxes: boxReturn.id_boxes,
      date: formatToInputDate(boxReturn.date),
    });
    handleOpen();
  };

  const handelUpdate = async (box: BoxesReturnDto) => {
    if (!boxesSelected) return;
    await update(boxesSelected?.id, box);
    setNewBoxReturn(dummy);
  };
  const handleDeleteReturn = (id: number) => {
    remove(id);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <MuiBox sx={{ ...style, width: 400 }}>
        <Typography variant="h6" component="h2">
          {isEditing ? "Edit Return" : "Add New Return"}
        </Typography>
        <TextField
          label="Quantity"
          value={newBoxReturn.quantity}
          type="number"
          onChange={(e) =>
            setNewBoxReturn({
              ...newBoxReturn,
              quantity: parseInt(e.target.value),
            })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          value={newBoxReturn.date}
          onChange={(e) =>
            setNewBoxReturn({ ...newBoxReturn, date: e.target.value })
          }
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button onClick={isEditing ? () => handelUpdate : handleCreateReturn}>
          {isEditing ? "Update" : "Create"}
        </Button>

        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boxesReturn.map((boxReturn) => (
                <TableRow key={boxReturn.id}>
                  <TableCell>{boxReturn.quantity}</TableCell>
                  <TableCell>{formatToTableDate(boxReturn.date)}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditReturn(boxReturn)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteReturn(boxReturn.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Card></Card>
      </MuiBox>
    </Modal>
  );
};
