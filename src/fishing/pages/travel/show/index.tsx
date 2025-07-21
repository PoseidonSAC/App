import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { TravelTable } from "../../../components/travel/travel-table";
import { useTravel } from "../../../context/travel";
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { TravelCreateForm } from "./../../../components/travel/travel-create-form/index";
import { useBoat } from "./../../../context/boat/useContext";
import { BoatDto } from "../../../domain/dto/boat.dto";
import EditIcon from "@mui/icons-material/Edit"; // Corrige el import
import DeleteIcon from "@mui/icons-material/Delete"; // Corrige el import
import { travelResDto } from "../../../domain/dto/travel.dto";

export const TravelCreateModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Box>
        <Button onClick={handleOpen}>Nuevo Viaje Lancha</Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            padding: 2,
            maxWidth: 1000,
            borderRadius: 2,
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Nuevo Viaje Lancha
          </Typography>
          <TravelCreateForm close={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

const EditBoatModal = ({
  open,
  onClose,
  boat,
  onEdit,
}: {
  open: boolean;
  onClose: () => void;
  boat: BoatDto | null;
  onEdit: (id: number, name: string) => void;
}) => {
  const [name, setName] = useState(boat?.name || "");

  useEffect(() => {
    setName(boat?.name || "");
  }, [boat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && boat && boat.id !== undefined) {
      onEdit(boat.id, name.trim());
      onClose();
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          minWidth: 350,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6">Editar Lancha</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre de la lancha"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            autoFocus
            required
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}
          >
            <Button onClick={onClose} color="secondary">
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Guardar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

const CreateBoatModal = ({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}) => {
  const [name, setName] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim());
      setName("");
      onClose();
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          minWidth: 350,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6">Crear Nueva Lancha</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre de la lancha"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            autoFocus
            required
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}
          >
            <Button onClick={onClose} color="secondary">
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Crear
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

const LanchaSelect = () => {
  const { boats, boat, setBoat, create, update, remove } = useBoat();
  const { travels } = useTravel();
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editBoat, setEditBoat] = useState<BoatDto | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    boat: BoatDto | null;
  }>({ open: false, boat: null });

  const handleCreateBoat = (name: string) => {
    create({ name });
    setOpenCreate(false);
  };

  const handleEditBoat = (id: number, name: string) => {
    if (editBoat) {
      update(id, { ...editBoat, name });
    }
    setOpenEdit(false);
  };

  const handleDeleteBoat = (boat: BoatDto) => {
    setDeleteDialog({ open: true, boat });
  };

  const confirmDeleteBoat = () => {
    if (deleteDialog.boat && deleteDialog.boat.id) {
      remove(deleteDialog.boat.id);
    }
    setDeleteDialog({ open: false, boat: null });
  };

  // Verifica si la lancha tiene viajes asociados
  const hasTravels = (boatId: number | undefined) => {
    if (!boatId) return false;
    return travels.some((t: travelResDto) => t.id_boat === boatId);
  };

  return (
    <Box sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
          Selecciona una Lancha
        </Typography>
        <TextField
          select
          label="Lancha"
          value={boat?.id || ""}
          onChange={(e) => {
            const selectedBoat = boats.find(
              (b) => b.id === parseInt(e.target.value)
            );
            setBoat(selectedBoat || null);
          }}
          fullWidth
          size="medium"
          sx={{ minWidth: 250, fontSize: "1.2rem" }}
        >
          <MenuItem value="" disabled>
            Seleccione una lancha
          </MenuItem>
          {boats.map((b) => (
            <MenuItem key={b.id} value={b.id}>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <span style={{ flex: 1 }}>{b.name}</span>
                <Tooltip title="Editar">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditBoat(b);
                      setOpenEdit(true);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={
                    hasTravels(b.id)
                      ? "No se puede eliminar, tiene viajes"
                      : "Eliminar"
                  }
                >
                  <span>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!hasTravels(b.id)) handleDeleteBoat(b);
                      }}
                      disabled={hasTravels(b.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        sx={{ height: 96, minWidth: 150 }}
        onClick={() => setOpenCreate(true)}
      >
        + Nueva Lancha
      </Button>
      <CreateBoatModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={handleCreateBoat}
      />
      <EditBoatModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        boat={editBoat}
        onEdit={handleEditBoat}
      />
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, boat: null })}
      >
        <DialogTitle>Eliminar Lancha</DialogTitle>
        <DialogContent>
          ¿Estás seguro que deseas eliminar la lancha "{deleteDialog.boat?.name}
          "?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, boat: null })}
            color="secondary"
          >
            Cancelar
          </Button>
          <Button onClick={confirmDeleteBoat} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export const TravelPage = () => {
  const { travels } = useTravel();

  return (
    <Box>
      <LanchaSelect />
      <Box sx={{ padding: 2 }}>
        <TravelCreateModal />
        <TravelTable travels={travels} />
      </Box>
    </Box>
  );
};
