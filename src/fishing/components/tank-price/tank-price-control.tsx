import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useTankPrice } from "../../context/tank-price/useContext";

export const TankPriceControl = () => {
  const { price, setPrice } = useTankPrice();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>(price);

  useEffect(() => {
    setValue(price);
  }, [price]);

  const toCurrency = (n: number) =>
    n.toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleSave = () => {
    const n = Number(value);
    if (!isNaN(n) && n > 0) {
      setPrice(n);
      setOpen(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>
          Precio actual tanque: {toCurrency(price)}
        </Typography>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Cambiar precio del tanque
        </Button>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            p: 3,
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">Cambiar precio del tanque</Typography>
          <TextField
            label="Precio por unidad"
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            inputProps={{ step: 0.01, min: 0 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">S/</InputAdornment>
              ),
            }}
            helperText={`Vista previa: ${toCurrency(Number(value) || 0)}`}
            autoFocus
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button color="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
