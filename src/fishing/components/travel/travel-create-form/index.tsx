import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<travelDto>({
    defaultValues,
  });
  const { create } = useTravel();
  const onSubmit = async (data: travelDto) => {
    await create(data);
  };

  const oilCharge = watch("oil_charge");
  const oilConsume = watch("oil_consume");
  const defaultPricePerUnit = 680;

  useEffect(() => {
    setValue("oil_charger_price", oilCharge * defaultPricePerUnit);
  }, [oilCharge, setValue]);

  useEffect(() => {
    setValue("oil_consume_price", oilConsume * defaultPricePerUnit);
  }, [oilConsume, setValue]);

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        padding: 3,
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
        maxHeight: "80vh",
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          width: "100%",
        }}
      >
        <Card sx={{ flex: 1, padding: 2, boxShadow: 0 }}>
          <TextField
            fullWidth
            label="Petroleo Cargado"
            type="number"
            {...register("oil_charge", { valueAsNumber: true })}
            error={!!errors.oil_charge}
            helperText={
              errors.oil_charge ? "Petroleo Cargado es requerido" : ""
            }
          />
          <Controller
            name="oil_charger_price"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Costo"
                type="number"
                {...field}
                error={!!errors.oil_charger_price}
                helperText={
                  errors.oil_charger_price ? "Costo es requerido" : ""
                }
              />
            )}
          />
        </Card>

        <Card sx={{ flex: 1, padding: 2, boxShadow: 0 }}>
          <TextField
            fullWidth
            label="Petroleo Consumido"
            type="number"
            {...register("oil_consume", { valueAsNumber: true })}
            error={!!errors.oil_consume}
            helperText={
              errors.oil_consume ? "Petroleo Consumido es requerido" : ""
            }
          />
          <Controller
            name="oil_consume_price"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Costo"
                type="number"
                {...field}
                error={!!errors.oil_consume_price}
                helperText={
                  errors.oil_consume_price ? "Costo es requerido" : ""
                }
              />
            )}
          />
        </Card>

        <Card sx={{ flex: 1, padding: 2, boxShadow: 0 }}>
          <TextField
            fullWidth
            label="Proviciones"
            type="number"
            {...register("provisions_cost", { valueAsNumber: true })}
            error={!!errors.provisions_cost}
            helperText={
              errors.provisions_cost ? "Proviciones es requerido" : ""
            }
          />
        </Card>

        <Card sx={{ flex: 1, padding: 2, boxShadow: 0 }}>
          <TextField
            fullWidth
            label="Balon de Gas"
            type="number"
            {...register("gas_cylinder_cost", { valueAsNumber: true })}
            error={!!errors.gas_cylinder_cost}
            helperText={
              errors.gas_cylinder_cost ? "Balon de Gas es requerido" : ""
            }
          />
        </Card>
      </Box>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Registrar
      </Button>
    </Box>
  );
};
