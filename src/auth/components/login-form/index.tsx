import zod from "zod";
import { Card, TextField, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/useContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const schema = zod.object({
  code: zod.string(),
  password: zod.string(),
});

export type LoginData = zod.infer<typeof schema>;

export const LoginForm = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    if (schema.safeParse(data).success) {
      await login(data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/inicio");
    }
  }, [isAuthenticated, navigate]);

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
          {...register("code")}
          error={!!errors.code}
          helperText={errors.code ? "Código es requerido" : ""}
        />
      </Card>
      <Card sx={{ width: "100%", padding: 2, boxShadow: 0 }}>
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password ? "Contraseña es requerida" : ""}
        />
      </Card>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Ingresar
      </Button>
    </Box>
  );
};
