import zod from "zod";
import { Card, TextField, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { BoatDto } from "./../../domain/dto/boat.dto";

const schema = zod.object({
  name: zod.string(),
  capacity: zod.number().positive(),
});

export type BoatData = zod.infer<typeof schema>;

export interface BoatFormProps {
  boat: BoatDto | null;
  type: "create" | "update";
}

export const BoatForm = ({ boat, type }: BoatFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoatData>(boat ? { defaultValues: boat } : undefined);

  const onSubmit = async (data: BoatData) => {
    if (!schema.safeParse(data).success) {
      return;
    }
    if (type === "create") {
      // await create(data);

      return;
    }
    if (type === "update") {
      // await update(data);
      return;
    }
  };

  return (
    <Box
      component="form"
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
      <Typography variant="h5" component="h1" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Card sx={{ width: "100%", padding: 2, boxShadow: 0 }}>
        <TextField
          fullWidth
          label="Código"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name ? "Código es requerido" : ""}
        />
      </Card>
      <Card sx={{ width: "100%", padding: 2, boxShadow: 0 }}>
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          {...register("capacity")}
          error={!!errors.capacity}
          helperText={errors.capacity ? "Contraseña es requerida" : ""}
        />
      </Card>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Ingresar
      </Button>
    </Box>
  );
};
