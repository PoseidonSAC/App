import { useEffect, useState } from "react";
import { useTravel } from "../../../context/travel/useContext";
import {
  Card,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { travelDto } from "./../../../domain/dto/travel.dto";
import { useOtherCost } from "./../../../context/other-cost/useContext";
import { useFishing } from "./../../../context/fishing/useContext";
import {
  OtherCostTravelDto,
  OtherCostTravelResDto,
} from "../../../domain/dto/other_cost_travel.dto";

import { FishingDto, FishingResDto } from "./../../../domain/dto/fishing.dto";

export const TravelDetailPage = () => {
  return (
    <>
      <TravelDetail />
      <TravelResume />
      <OtherCostTravel />
      <FishingTravel />
    </>
  );
};

export const TravelDetail = () => {
  const { travelSelected, update } = useTravel();
  const [isEditing, setIsEditing] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      code: "",
      oil_charge: 0,
      oil_charger_price: 0,
      oil_consume: 0,
      oil_consume_price: 0,
      provisions_cost: 0,
      gas_cylinder_cost: 0,
      assigned: false,
    },
  });

  useEffect(() => {
    if (travelSelected) {
      reset(travelSelected);
      setTotalCost(
        travelSelected.oil_consume_price +
          travelSelected.provisions_cost +
          travelSelected.gas_cylinder_cost
      );
    }
  }, [travelSelected, reset]);

  const onSubmit = (data: travelDto) => {
    if (travelSelected) {
      update(travelSelected.id, data);
      setIsEditing(false);
    }
  };

  if (!travelSelected) {
    return (
      <Typography variant="h6">No hay datos de viaje seleccionados.</Typography>
    );
  }

  return (
    <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Detalle del viaje
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
        <TextField
          label="Gasto total"
          value={totalCost}
          InputProps={{
            readOnly: true,
            style: { color: "black", fontWeight: "bold" },
          }}
          disabled
        />
        <TextField
          {...register("code")}
          label="Código"
          InputProps={{
            readOnly: true,
            style: { color: "black", fontWeight: "bold" },
          }}
          disabled={!isEditing}
        />
        <TextField
          {...register("oil_charge", { valueAsNumber: true })}
          label="Carga de Petróleo"
          type="number"
          InputProps={{
            readOnly: true,
            style: { color: "black", fontWeight: "bold" },
          }}
          disabled={!isEditing}
        />
        <TextField
          {...register("oil_charger_price", { valueAsNumber: true })}
          label="Precio de carga de Petróleo"
          type="number"
          InputProps={{
            readOnly: true,
            style: { color: "black", fontWeight: "bold" },
          }}
          disabled={!isEditing}
        />
        <TextField
          {...register("oil_consume", { valueAsNumber: true })}
          label="Consumo de Petróleo"
          type="number"
          InputProps={{
            readOnly: true,
            style: { color: "black", fontWeight: "bold" },
          }}
          disabled={!isEditing}
        />
        <TextField
          {...register("oil_consume_price", { valueAsNumber: true })}
          label="Precio de consumo de Petróleo"
          type="number"
          InputProps={{
            readOnly: true,
            style: { color: "black", fontWeight: "bold" },
          }}
          disabled={!isEditing}
        />
        <TextField
          {...register("provisions_cost", { valueAsNumber: true })}
          label="Costo de provisiones"
          type="number"
          InputProps={{
            readOnly: true,
            style: { color: "black", fontWeight: "bold" },
          }}
          disabled={!isEditing}
        />
        <TextField
          {...register("gas_cylinder_cost", { valueAsNumber: true })}
          label="Costo de cilindro de gas"
          type="number"
          InputProps={{
            readOnly: true,
            style: { color: "black", fontWeight: "bold" },
          }}
          disabled={!isEditing}
        />
        <TextField
          label="Asignado"
          value={travelSelected.assigned ? "Si" : "No"}
          InputProps={{
            readOnly: true,
            style: { color: "black", fontWeight: "bold" },
          }}
          disabled
        />

        {isEditing ? (
          <Button variant="contained" sx={{ marginTop: 2 }} type="submit">
            Guardar
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Editar
          </Button>
        )}
      </Box>
    </Card>
  );
};

const OtherCostTravel = () => {
  const { otherCostTravels, create, update, remove } = useOtherCost();
  const [selectedCost, setSelectedCost] =
    useState<OtherCostTravelResDto | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      id_travel: 0,
      description: "",
      price: 0,
    },
  });

  const onSubmit = async (data: OtherCostTravelDto) => {
    if (selectedCost) {
      await update(selectedCost.id, data);
      setSelectedCost(null);
    } else {
      await create(data);
    }
    reset();
  };

  const handleEdit = (cost: OtherCostTravelResDto) => {
    setSelectedCost(cost);
    setValue("description", cost.description);
    setValue("price", cost.price);
  };

  const handleDelete = async (id: number) => {
    await remove(id);
  };

  return (
    <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Otros costos del viaje
      </Typography>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {selectedCost ? "Editar Costo" : "Nuevo Costo"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <TextField
            {...register("description")}
            label="Descripción"
            required
          />
          <TextField
            {...register("price", { valueAsNumber: true })}
            label="Costo"
            type="number"
            required
          />
          <Button variant="contained" type="submit">
            {selectedCost ? "Actualizar" : "Guardar"}
          </Button>
          {selectedCost && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                reset();
                setSelectedCost(null);
              }}
            >
              Cancelar
            </Button>
          )}
        </Box>
      </Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell>Costo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {otherCostTravels.map((otherCost) => (
            <TableRow key={otherCost.id}>
              <TableCell>{otherCost.description}</TableCell>
              <TableCell>{otherCost.price}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleEdit(otherCost)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(otherCost.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

const FishingTravel = () => {
  const { fishings, create, update, remove } = useFishing();
  const [selectedFishing, setSelectedFishing] = useState<FishingResDto | null>(
    null
  );
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      fish: "",
      weight: 0,
      boxes: 0,
      price: 0,
      id_travel: 0,
    },
  });

  const onSubmit = async (data: FishingDto) => {
    if (selectedFishing) {
      await update(selectedFishing.id, data);
      setSelectedFishing(null);
    } else {
      await create(data);
    }
    reset();
  };

  const handleEdit = (fishing: FishingResDto) => {
    setSelectedFishing(fishing);
    setValue("fish", fishing.fish);
    setValue("weight", fishing.weight);
    setValue("boxes", fishing.boxes);
    setValue("price", fishing.price);
  };

  const handleDelete = async (id: number) => {
    await remove(id);
  };

  return (
    <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Pesca
      </Typography>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {selectedFishing ? "Editar Pesca" : "Nueva Pesca"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <TextField {...register("fish")} label="Pescado" required />
          <TextField
            {...register("weight", { valueAsNumber: true })}
            label="Peso x Caja"
            type="number"
            required
          />
          <TextField
            {...register("boxes", { valueAsNumber: true })}
            label="Cajas"
            type="number"
            required
          />
          <TextField
            {...register("price", { valueAsNumber: true })}
            label="Precio x Kg"
            type="number"
            inputProps={{ step: 0.01 }}
            required
          />
          <Button variant="contained" type="submit">
            {selectedFishing ? "Actualizar" : "Guardar"}
          </Button>
          {selectedFishing && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                reset();
                setSelectedFishing(null);
              }}
            >
              Cancelar
            </Button>
          )}
        </Box>
      </Card>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pescado</TableCell>
            <TableCell>Peso x Caja</TableCell>
            <TableCell>Cajas</TableCell>
            <TableCell>Precio x Kg</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fishings.map((fishing) => (
            <TableRow key={fishing.id}>
              <TableCell>{fishing.fish}</TableCell>
              <TableCell>{fishing.weight}</TableCell>
              <TableCell>{fishing.boxes}</TableCell>
              <TableCell>{fishing.price}</TableCell>
              <TableCell>
                {fishing.weight * fishing.boxes * fishing.price}
              </TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => handleEdit(fishing)}>
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(fishing.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

const TravelResume = () => {
  const { travelSelected } = useTravel();
  const { fishings } = useFishing();
  const { otherCostTravels } = useOtherCost();

  if (!travelSelected) {
    return (
      <Typography variant="h6">No hay datos de viaje seleccionados.</Typography>
    );
  }

  const totalFishing = fishings.reduce(
    (acc, fishing) => acc + fishing.weight * fishing.boxes * fishing.price,
    0
  );

  const totalCost =
    (travelSelected?.gas_cylinder_cost || 0) +
    (travelSelected?.oil_consume_price || 0) +
    (travelSelected?.provisions_cost || 0);

  const total_boxes = fishings.reduce((acc, fishing) => acc + fishing.boxes, 0);
  const total_tons =
    fishings.reduce((acc, fishing) => acc + fishing.weight * fishing.boxes, 0) /
    1000;

  const total_other_cost = otherCostTravels.reduce(
    (acc, otherCost) => acc + otherCost.price,
    0
  );

  return (
    <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Resumen del viaje
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Concepto</TableCell>
            <TableCell>Monto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Pesca</TableCell>
            <TableCell>{totalFishing}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Costos de viaje</TableCell>
            <TableCell>{totalCost}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Otros costos</TableCell>
            <TableCell>{total_other_cost}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Numero Cajas</TableCell>
            <TableCell>{total_boxes}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Total Toneladas</TableCell>
            <TableCell>{total_tons}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{totalFishing - totalCost}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Dividido</TableCell>
            <TableCell>{(totalFishing - totalCost) / 2}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};
