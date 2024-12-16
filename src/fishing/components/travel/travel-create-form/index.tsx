import { useForm } from "react-hook-form";
import { Box, Card, TextField, Button } from "@mui/material";
import { useTravel } from "./../../../context/travel/useContext";
import { travelDto } from "./../../../domain/dto/travel.dto";

const defaultValues: travelDto = {
  code: "",
  oil_charge: 0,
  oil_charger_price: 0,
  oil_consume: 0,
  oil_consume_price: 0,
  provisions_cost: 0,
  gas_cylinder_cost: 0,
  assigned: false,
};

export const TravelCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<travelDto>({
    defaultValues,
  });
  const { create } = useTravel();
  const onSubmit = async (data: travelDto) => {
    await create(data);
  };
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "100%", padding: 2, boxShadow: 0 }}>
        <TextField
          fullWidth
          label="Código"
          {...register("code")}
          error={!!errors.code}
          helperText={errors.code ? "Código es requerido" : ""}
        />
      </Card>

      <Card sx={{ width: "100%", padding: 2, boxShadow: 0 }}>
        <TextField
          fullWidth
          label="Petroleo Cargado"
          type="number"
          {...(register("oil_charge"), { valueAsNumber: true })}
          error={!!errors.oil_charge}
          helperText={errors.code ? "Petroleo Cargado es requerido" : ""}
        />
        <TextField
          fullWidth
          label="Costo"
          type="number"
          {...(register("oil_charger_price"), { valueAsNumber: true })}
          error={!!errors.oil_charger_price}
          helperText={errors.code ? "Costo es requerido" : ""}
        />
      </Card>

      <Card sx={{ width: "100%", padding: 2, boxShadow: 0 }}>
        <TextField
          fullWidth
          label="Petroleo Consumido"
          type="number"
          {...(register("oil_consume"), { valueAsNumber: true })}
          error={!!errors.oil_consume}
          helperText={errors.code ? "Petroleo Consumido es requerido" : ""}
        />
        <TextField
          fullWidth
          label="Costo"
          type="number"
          {...(register("oil_consume_price"), { valueAsNumber: true })}
          error={!!errors.oil_consume_price}
          helperText={errors.code ? "Costo es requerido" : ""}
        />
      </Card>

      <Card sx={{ width: "100%", padding: 2, boxShadow: 0 }}>
        <TextField
          fullWidth
          label="Provicisiones"
          type="number"
          {...(register("provisions_cost"), { valueAsNumber: true })}
          error={!!errors.provisions_cost}
          helperText={errors.code ? "Proviciones es requerido" : ""}
        />
      </Card>

      <Card sx={{ width: "100%", padding: 2, boxShadow: 0 }}>
        <TextField
          fullWidth
          label="Balon de Gas"
          {...(register("gas_cylinder_cost"), { valueAsNumber: true })}
          error={!!errors.gas_cylinder_cost}
          helperText={errors.code ? "Balon de Gas es requerido" : ""}
        />
      </Card>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Registrar
      </Button>
    </Box>
  );
};
