import { Box, Typography, Button } from "@mui/material";
import { TravelTable } from "../../../components/travel/travel-table";
import { useTravel } from "../../../context/travel";
import { Modal } from "@mui/material";
import { useState } from "react";
import { TravelCreateForm } from "./../../../components/travel/travel-create-form/index";

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
          <TravelCreateForm />
        </Box>
      </Modal>
    </>
  );
};

export const TravelPage = () => {
  const { travels } = useTravel();

  return (
    <Box sx={{ padding: 2 }}>
      <TravelCreateModal />
      <TravelTable travels={travels} />
    </Box>
  );
};
