import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

import { useTravel } from "../../../context/travel/useContext";
import { travelResDto } from "../../../domain/dto/travel.dto";
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
  Modal,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useOtherCost } from "./../../../context/other-cost/useContext";
import { useFishing } from "./../../../context/fishing/useContext";
import { useChargerOperation } from "../../../context/charger-operation";
import {
  OtherCostTravelDto,
  OtherCostTravelResDto,
} from "../../../domain/dto/other_cost_travel.dto";

import { FishingDto, FishingResDto } from "./../../../domain/dto/fishing.dto";
import { useNavigate } from "react-router-dom";

export const TravelDetailPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end", p: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setOpen(true);
          }}
        >
          Eliminar
        </Button>
      </Box>
      <DeleteModal open={open} onClose={() => setOpen(false)} />
      <TravelDetail />
      <OtherCostTravel />
      <FishingTravel />
      <ChargerOperationOfTravel />
      <VehicleOil />
      <TravelResume />
    </>
  );
};

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
}

const DeleteModal = ({ open, onClose }: DeleteModalProps) => {
  const { travelSelected, remove, SetTravelSelected } = useTravel();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (travelSelected) {
      remove(travelSelected.id);
      SetTravelSelected(null);
      navigate("/pesca");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6" component="h1" gutterBottom>
          ¿Estás seguro de eliminar el viaje?
        </Typography>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Eliminar
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </Card>
    </Modal>
  );
};

export const TravelDetail = () => {
  const { travelSelected, update, SetTravelSelected } = useTravel();
  const [isEditing, setIsEditing] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<travelResDto>({
    defaultValues: {
      code: "",
      oil_charge: 0,
      oil_charger_price: 0,
      oil_consume: 0,
      oil_consume_price: 0,
      provisions_cost: 0,
      gas_cylinder_cost: 0,
      createdAt: "",
      oil_date_canceled: null,
      oil_remaining: 0,
      fishing_date_canceled: null,
      is_concluded: false,
      oil_vehicle: 0,
      oil_vehicle_price: 0,
      oil_vehicle_date_canceled: null,
    },
  });

  const formatToInputDate = (isoDate: string | null): string => {
    if (isoDate == null) {
      return "";
    }
    return format(parseISO(isoDate.slice(0, -1)), "yyyy-MM-dd");
  };
  const formatToISODate = (date: string | null): string | null => {
    if (date == "" || date == null || isNaN(Date.parse(date))) {
      return null;
    }
    return new Date(date).toISOString();
  };

  const formatToISODateCreatAt = (date: string): string => {
    return new Date(date).toISOString();
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

  useEffect(() => {
    if (travelSelected) {
      const formattedData = {
        ...travelSelected,
        createdAt: travelSelected.createdAt
          ? formatToInputDate(travelSelected.createdAt)
          : "",
        oil_date_canceled: travelSelected.oil_date_canceled
          ? formatToInputDate(travelSelected.oil_date_canceled)
          : "",
        fishing_date_canceled: travelSelected.fishing_date_canceled
          ? formatToInputDate(travelSelected.fishing_date_canceled)
          : "",
      };
      reset(formattedData);
      setTotalCost(
        travelSelected.oil_consume_price +
          travelSelected.provisions_cost +
          travelSelected.gas_cylinder_cost
      );
    }
  }, [travelSelected, reset]);

  const onSubmit = (data: travelResDto) => {
    if (travelSelected) {
      data.is_concluded =
        data.oil_date_canceled != null && data.fishing_date_canceled != null;
      const t = {
        ...data,
        id: travelSelected.id,
        createdAt: formatToISODateCreatAt(data.createdAt),
        oil_date_canceled: formatToISODate(data.oil_date_canceled),
        fishing_date_canceled: formatToISODate(data.fishing_date_canceled),
      };
      update(travelSelected.id, t);
      SetTravelSelected({ ...travelSelected, ...t });
      setIsEditing(false);
    }
  };

  if (!travelSelected) {
    return (
      <Typography variant="h6">No hay datos de viaje seleccionados.</Typography>
    );
  }

  return (
    <Box>
      {travelSelected.is_concluded && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
            bgcolor: "primary.light",
          }}
        >
          <Typography
            variant="h4"
            color="white"
            sx={{
              fontWeight: "bold",
            }}
          >
            Concluido
          </Typography>
        </Box>
      )}
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Detalle del viaje
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            label="Gasto de Viaje"
            value={totalCost}
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            disabled
          />
          <TextField
            {...register("code", {
              required: true,
              onChange: (e) => setValue("code", e.target.value.toUpperCase()),
            })}
            label="Código"
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            disabled={!isEditing}
          />
          <TextField
            {...register("createdAt", { valueAsDate: true })}
            label="Fecha"
            type="date"
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            disabled={!isEditing}
          />
          <TextField
            {...register("oil_charge", { valueAsNumber: true })}
            label="Galones de Petróleo Salida"
            type="number"
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            disabled={!isEditing}
          />

          <Controller
            name="oil_charger_price"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Costo de Petróleo Salida"
                type="number"
                {...field}
                error={!!errors.oil_charger_price}
                helperText={
                  errors.oil_charger_price ? "Costo es requerido" : ""
                }
                InputProps={{
                  style: { color: "black", fontWeight: "bold" },
                }}
                disabled={!isEditing}
              />
            )}
          />
          <TextField
            {...register("oil_date_canceled", { valueAsDate: true })}
            label="Fecha de Cancelacion de Petroleo Salida"
            type="date"
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            disabled={!isEditing}
          />

          <TextField
            {...register("oil_consume", { valueAsNumber: true })}
            label="Galones de Consumo de Petróleo"
            type="number"
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            disabled={!isEditing}
          />

          <Controller
            name="oil_consume_price"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Costo de Consumo de Petróleo"
                type="number"
                {...field}
                error={!!errors.oil_consume_price}
                helperText={
                  errors.oil_consume_price ? "Costo es requerido" : ""
                }
                InputProps={{
                  style: { color: "black", fontWeight: "bold" },
                }}
                disabled={!isEditing}
              />
            )}
          />

          <TextField
            fullWidth
            label="Petroleo Queda"
            {...register("oil_remaining", { valueAsNumber: true })}
            type="number"
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            disabled={!isEditing}
          />

          <TextField
            {...register("provisions_cost", { valueAsNumber: true })}
            label="Viveres"
            type="number"
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            disabled={!isEditing}
          />
          <TextField
            {...register("gas_cylinder_cost", { valueAsNumber: true })}
            label="Balon de Gas"
            type="number"
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            disabled={!isEditing}
          />

          <TextField
            {...register("fishing_date_canceled", { valueAsDate: true })}
            label="Fecha de Cancelacion de la Pesca"
            type="date"
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            disabled={!isEditing}
          />
          {isEditing ? (
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
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
    </Box>
  );
};

const OtherCostTravel = () => {
  const { otherCostTravels, create, update, remove } = useOtherCost();
  const [selectedCost, setSelectedCost] =
    useState<OtherCostTravelResDto | null>(null);
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      id_travel: 0,
      description: "",
      is_added: false,
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
    setValue("is_added", cost.is_added);
  };

  const handleDelete = async (id: number) => {
    await remove(id);
    console.log("Eliminado");
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
            {...register("description", {
              onChange: (e) =>
                setValue("description", e.target.value.toUpperCase()),
            })}
            label="Descripción"
            required
          />
          <TextField
            {...register("price", { valueAsNumber: true })}
            label="Costo"
            type="number"
            required
          />
          {watch("is_added") ? (
            <Button
              variant="contained"
              color="error"
              onClick={() => setValue("is_added", false)}
            >
              Quitar de la Division
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => setValue("is_added", true)}
            >
              Agregar a la Division
            </Button>
          )}

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
            <TableCell>División</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {otherCostTravels.map((otherCost) => (
            <TableRow key={otherCost.id}>
              <TableCell>{otherCost.description}</TableCell>
              <TableCell>{otherCost.price}</TableCell>
              <TableCell>
                {otherCost.is_added ? "A la Division" : "No a la Division"}
              </TableCell>

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
          <TextField
            {...register("fish", {
              onChange: (e) => setValue("fish", e.target.value.toUpperCase()),
            })}
            label="Pescado"
            required
          />
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
  const { chargerOperation } = useChargerOperation();
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
    (acc, otherCost) => (!otherCost.is_added ? acc + otherCost.price : acc),
    0
  );

  const total_other_cost_added = otherCostTravels.reduce(
    (acc, otherCost) => (otherCost.is_added ? acc + otherCost.price : acc),
    0
  );

  const vehicle_cost = travelSelected.oil_vehicle_price;
  const cost_charge =
    (chargerOperation?.travel_cost || 0) +
    (chargerOperation?.helper || 0) +
    (chargerOperation?.footboard || 0) +
    (chargerOperation?.charger || 0) +
    (chargerOperation?.grocer || 0);

  const totalLiquid = totalFishing - totalCost - total_other_cost_added;
  const repartition = totalLiquid / 2;

  const ToCurrency = (value: number) =>
    value.toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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
            <TableCell>Efectivo de Pesca</TableCell>
            <TableCell>{ToCurrency(totalFishing)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gasto de viaje</TableCell>
            <TableCell>{ToCurrency(totalCost)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Otros Gastos Agregados a la Division</TableCell>
            <TableCell>{ToCurrency(total_other_cost_added)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Otros Gastos</TableCell>
            <TableCell>{ToCurrency(total_other_cost)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Petroleo de Vehiculo</TableCell>
            <TableCell>{ToCurrency(vehicle_cost)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Pago Tripulantes</TableCell>
            <TableCell>{ToCurrency(cost_charge)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Total Liquido</TableCell>
            <TableCell>{ToCurrency(totalLiquid)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Repartición</TableCell>
            <TableCell>{ToCurrency(repartition)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Numero Cajas</TableCell>
            <TableCell>{total_boxes}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Total Toneladas</TableCell>
            <TableCell>{total_tons}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

const ChargerOperationOfTravel = () => {
  const { travelSelected, SetTravels, travels } = useTravel();
  const { chargerOperation, update, setChargerOperation } =
    useChargerOperation();
  const [isEditing, setIsEditing] = useState(false);
  const [helper, setHelper] = useState(0);
  const [canceledDate, setCanceledDate] = useState("");
  const [travelCost, setTravelCost] = useState(0);

  useEffect(() => {
    if (chargerOperation) {
      setHelper(chargerOperation.helper);
      setTravelCost(chargerOperation.travel_cost);
      setCanceledDate(formatToInputDate(chargerOperation.date_canceled) || "");
    }
  }, [chargerOperation]);

  const handleSave = async () => {
    if (chargerOperation) {
      const c = {
        ...chargerOperation,
        helper,
        travel_cost: travelCost,
        date_canceled: formatToISODate(canceledDate),
        id_travel: travelSelected?.id || 0,
      };
      await update(chargerOperation.id, c);

      setChargerOperation(c);
      const travelsUpdated: travelResDto[] = travels.map((t) =>
        t.id === travelSelected?.id ? { ...t, chargerOperation: c } : t
      );

      SetTravels(travelsUpdated);

      setIsEditing(false);
    }
  };

  const formatToISODate = (date: string) => {
    if (date == "") return null;
    return new Date(date).toISOString();
  };

  const formatToInputDate = (isoDate: string | null): string =>
    isoDate == null ? "" : format(parseISO(isoDate.slice(0, -1)), "yyyy-MM-dd");

  if (!travelSelected || !chargerOperation) {
    return <Typography>No hay viaje seleccionado</Typography>;
  }

  return (
    <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Pagos de Tripulantes
      </Typography>
      {chargerOperation.date_canceled && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
            bgcolor: "primary.light",
          }}
        >
          <Typography
            variant="h4"
            color="white"
            sx={{
              fontWeight: "bold",
            }}
          >
            Cancelado
          </Typography>
        </Box>
      )}
      {
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            Toneladas: {chargerOperation.weight}
          </Typography>
          <Typography sx={{ fontWeight: "bold", mt: 2 }}>Pagos</Typography>
          <Typography sx={{ ml: 2 }}>
            Estibador: {chargerOperation.footboard}
          </Typography>
          <Typography sx={{ ml: 2 }}>
            Bodeguero: {chargerOperation.charger}
          </Typography>
          <Typography sx={{ ml: 2 }}>
            Cajero: {chargerOperation.grocer}
          </Typography>
          <TextField
            label="Ayudante"
            value={helper}
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            disabled={!isEditing}
            type="number"
            onChange={(e) => setHelper(Number(e.target.value))}
          />
          <TextField
            label="Pasaje"
            value={travelCost}
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            disabled={!isEditing}
            type="number"
            onChange={(e) => setTravelCost(Number(e.target.value))}
          />
          <TextField
            label="Fecha de Cancelación"
            value={canceledDate}
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            disabled={!isEditing}
            type="date"
            onChange={(e) => setCanceledDate(e.target.value)}
          />

          <Typography>
            Total :
            {chargerOperation.footboard +
              chargerOperation.charger +
              chargerOperation.grocer +
              helper +
              travelCost}
          </Typography>
        </Box>
      }
      {isEditing ? (
        <Button variant="contained" onClick={handleSave}>
          Guardar
        </Button>
      ) : (
        <Button variant="contained" onClick={() => setIsEditing(true)}>
          Editar
        </Button>
      )}
    </Card>
  );
};

const VehicleOil = () => {
  const { travelSelected, update, SetTravelSelected } = useTravel();
  const [isEditing, setIsEditing] = useState(false);
  const [oilVehicle, setOilVehicle] = useState(0);
  const [canceledDate, setCanceledDate] = useState("");
  const [price, setPrice] = useState(0);
  const formatToInputDate = (isoDate: string | null): string => {
    if (isoDate == null) return "";
    return format(parseISO(isoDate.slice(0, -1)), "yyyy-MM-dd");
  };

  const formatToISODate = (date: string): string | null => {
    if (date == "") return null;
    return new Date(date).toISOString();
  };

  useEffect(() => {
    if (travelSelected) {
      setOilVehicle(travelSelected.oil_vehicle);
      setPrice(travelSelected.oil_vehicle_price);
      setCanceledDate(
        formatToInputDate(travelSelected.oil_vehicle_date_canceled)
      );
    }
  }, [travelSelected]);

  const handleSave = async () => {
    if (travelSelected) {
      const t = {
        ...travelSelected,
        oil_vehicle: oilVehicle,
        oil_vehicle_price: price,
        oil_vehicle_date_canceled: formatToISODate(canceledDate),
      };
      await update(travelSelected.id, t);
      SetTravelSelected(t);
      setIsEditing(false);
    }
  };

  if (!travelSelected) {
    return <Typography>No hay viaje seleccionado</Typography>;
  }

  return (
    <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Petróleo de Vehículo
      </Typography>
      {travelSelected.oil_vehicle_date_canceled && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
            bgcolor: "primary.light",
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            color="white"
            sx={{
              fontWeight: "bold",
            }}
          >
            Cancelado
          </Typography>
        </Box>
      )}
      {
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            label="Petróleo de Vehículo"
            value={oilVehicle}
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            disabled={!isEditing}
            type="number"
            onChange={(e) => setOilVehicle(Number(e.target.value))}
          />
          <TextField
            label="Gasto de Petróleo de Vehículo"
            value={price}
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            disabled={!isEditing}
            type="number"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <TextField
            label="Fecha de Cancelación"
            value={canceledDate}
            InputProps={{
              style: { color: "black", fontWeight: "bold" },
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            disabled={!isEditing}
            type="date"
            onChange={(e) => setCanceledDate(e.target.value)}
          />
        </Box>
      }
      {isEditing ? (
        <Button variant="contained" onClick={handleSave}>
          Guardar
        </Button>
      ) : (
        <Button variant="contained" onClick={() => setIsEditing(true)}>
          Editar
        </Button>
      )}
    </Card>
  );
};
