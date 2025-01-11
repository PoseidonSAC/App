import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
  Modal,
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";

import { useRouteDetail } from "../../context/vehicle_route_detail";
import { useRouteBalance } from "../../context/vehicle_route_balance";
import { useRoutesOtherCost } from "../../context/other-cost";
import { useVehicleRouteMoney } from "../../context/vehicle_route_money";
import { useVehicleRoute } from "../../context/vehicle-route";
import { useVehicleRoutes } from "../../context/vehicle-routes";
import { useRoutes } from "../../context/routes";
import { useVehicleRoutesOil } from "../../context/vehicle_routes_oil_use";
import { useVehicle } from "../../context/transportist";

import { format } from "date-fns";

import {
  VehicleRoutesOilUseDto,
  VehicleRoutesOilUseResDto,
} from "../../dto/vehicle_routes_oil_use";
import {
  VehicleRoutesDto,
  VehicleRoutesResDto,
} from "../../dto/vehicle-routes";

import {
  VehicleRouteBalanceDto,
  VehicleRouteBalanceResDto,
} from "../../dto/vehicle_route_balance";
import { VehicleRouteDetailResDto } from "../../dto/vehicle_route_detail";
import {
  VehicleRouteMoneyDto,
  VehicleRouteMoneyResDto,
} from "../../dto/vehicle_route_money";
import {
  VehicleRouteOtherCostDto,
  VehicleRouteOtherCostResDto,
} from "../../dto/other-cost";

import { RouteResDto } from "../../dto/routes";
import { VehicleDto } from "../../dto/vehicle";

export const ControlTransportDetail = () => {
  const { routeSelected } = useVehicleRoute();
  const { vehicles } = useVehicle();
  const [vehicle, setVehicle] = useState<VehicleDto | null>(null);

  useEffect(() => {
    if (!routeSelected || !vehicles) return;
    const vehicle = vehicles.find(
      (vehicle) => vehicle.id === routeSelected.id_vehicle
    );
    setVehicle(vehicle || null);
  }, [routeSelected, vehicles]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          padding: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: 2, fontWeight: "bold", color: "primary.main" }}
        >
          Detalles de Transporte de {vehicle?.name}
        </Typography>
      </Box>
      <ControlTransportDetailLiquidation />
      <ControlTransportDetailOil />
    </Box>
  );
};

const ControlTransportDetailOil = () => {
  return (
    <Box>
      <ControlOilControlled />
      <ControlOilJustifited />
      <ResultOil />
    </Box>
  );
};

const ControlOilControlled = () => {
  const { routes } = useRoutes();
  const { vehicles } = useVehicle();
  const { routeSelected } = useVehicleRoute();
  const {
    vehicleRoutes,
    createRoute,
    updateRoute,
    deleteRoute,
    vehicleRoutesSelected,
    setVehicleRoutesSelected,
  } = useVehicleRoutes();
  const [vehicleRoutesFiltered, setVehicleRoutesFiltered] = useState<
    RouteResDto[]
  >([]);
  const [oilControlled, setOilControlled] = useState<VehicleRoutesDto>({
    id_route: 0,
    oil_use: 0,
    id_vehicle_route: routeSelected?.id || 0,
    createdAt: "",
  });
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getVehicleOfRoute = () => {
      if (!routeSelected || !vehicles) return null;
      return vehicles.find(
        (vehicle) => vehicle.id === routeSelected.id_vehicle
      );
    };

    const filterRoutesByType = (vehicleType: string | null) => {
      if (!vehicleType || !routes) return [];
      return routes.filter((route) => route.type === vehicleType);
    };

    const updateFilteredRoutes = () => {
      const vehicle = getVehicleOfRoute();
      const routesByType = filterRoutesByType(vehicle?.type || null);
      setVehicleRoutesFiltered(routesByType);
    };

    updateFilteredRoutes();
  }, [routeSelected, vehicleRoutes, routes, vehicles]);

  const handleDate = (date: string) => {
    const dateFormated = date.split("Z")[0];
    return format(dateFormated, "dd/MM");
  };

  const handleDateEdit = (date: string) => {
    const dateFormated = date.split("Z")[0];
    if (dateFormated === "") {
      return "";
    }
    return format(dateFormated, "yyyy-MM-dd");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setOilControlled({
      id_route: vehicleRoutesFiltered[0]?.id || 0,
      oil_use: 0,
      id_vehicle_route: routeSelected?.id || 0,
      createdAt: "",
    });
  };

  const handleSubmit = async () => {
    if (!vehicleRoutesSelected) return;
    if (editMode) {
      await updateRoute(vehicleRoutesSelected.id, oilControlled);
    } else {
      await createRoute(oilControlled);
    }
    setOilControlled({
      id_route: vehicleRoutesFiltered[0]?.id || 0,
      oil_use: 0,
      id_vehicle_route: routeSelected?.id || 0,
      createdAt: "",
    });
    handleClose();
  };

  const handleEdit = (route: VehicleRoutesResDto) => {
    setOilControlled(route);
    setVehicleRoutesSelected(route);
    setEditMode(true);
    handleOpen();
  };

  const handleDelete = async (id: number) => {
    await deleteRoute(id);
  };

  const handleRouteShow = (id: number) => {
    const route = routes.find((route) => route.id === id);
    return route ? `${route.init} - ${route.end}` : "";
  };

  const handleRouteDeterminated = (id: number) => {
    const route = routes.find((route) => route.id === id);
    return route ? route.oil_use : 0;
  };

  return (
    <Box>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6">Control de Ruta</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Añadir
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ruta</TableCell>
              <TableCell>Uso de Petróleo</TableCell>
              <TableCell>Petroleo Establecido</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleRoutes.map((route) => (
              <TableRow key={route.id}>
                <TableCell>{handleRouteShow(route.id_route)}</TableCell>
                <TableCell>{route.oil_use}</TableCell>
                <TableCell>{handleRouteDeterminated(route.id_route)}</TableCell>
                <TableCell>{handleDate(route.createdAt)}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleEdit(route)}>
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(route.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
          <Typography variant="h6">
            {editMode ? "Editar Uso de Petróleo" : "Añadir Uso de Petróleo"}
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl fullWidth>
              <InputLabel id="route-select-label">Ruta</InputLabel>
              <Select
                labelId="route-select-label"
                label="Ruta"
                value={oilControlled.id_route || ""}
                onChange={(e) =>
                  setOilControlled({
                    ...oilControlled,
                    id_route: e.target.value as number,
                  })
                }
                required
              >
                {vehicleRoutesFiltered.map((route) => (
                  <MenuItem key={route.id} value={route.id}>
                    {route.init} - {route.end}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Uso de Petróleo"
              type="number"
              value={oilControlled.oil_use}
              onChange={(e) =>
                setOilControlled({
                  ...oilControlled,
                  oil_use: parseFloat(e.target.value),
                })
              }
              required
            />
            <TextField
              label="Fecha"
              type="date"
              value={handleDateEdit(oilControlled.createdAt)}
              onChange={(e) =>
                setOilControlled({
                  ...oilControlled,
                  createdAt: e.target.value,
                })
              }
              InputLabelProps={{ shrink: true }}
              required
            />
            <Button variant="contained" type="submit">
              {editMode ? "Actualizar" : "Guardar"}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </Card>
      </Modal>
    </Box>
  );
};

const ControlOilJustifited = () => {
  const { routeSelected } = useVehicleRoute();
  const {
    routesOilUse,
    createRouteOilUse,
    updateRouteOilUse,
    deleteRouteOilUse,
    setRouteOilUseSelected,
    routeOilUseSelected,
  } = useVehicleRoutesOil();
  const [oilUse, setOilUse] = useState<VehicleRoutesOilUseDto>({
    description: "",
    id_vehicle_route: 0,
    oil_use: 0,
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!routeSelected) return;
    if (routeOilUseSelected) {
      await updateRouteOilUse(routeOilUseSelected.id, {
        ...oilUse,
        id_vehicle_route: routeSelected.id,
      });
    } else {
      await createRouteOilUse({
        ...oilUse,
        id_vehicle_route: routeSelected.id,
      });
    }
    setOilUse({ description: "", id_vehicle_route: 0, oil_use: 0 });
    handleClose();
  };

  const handleEdit = (oilUse: VehicleRoutesOilUseResDto) => {
    setRouteOilUseSelected(oilUse);
    setOilUse(oilUse);
    handleOpen();
  };

  const handleDelete = async (id: number) => {
    await deleteRouteOilUse(id);
  };

  return (
    <Box>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6">Petroleo Adicional</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Añadir
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routesOilUse.map((oilUse) => (
              <TableRow key={oilUse.id}>
                <TableCell>{oilUse.description}</TableCell>
                <TableCell>{oilUse.oil_use}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(oilUse)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(oilUse.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
          <Typography variant="h6">
            {routeOilUseSelected
              ? "Editar Uso de Petróleo"
              : "Añadir Uso de Petróleo"}
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Descripción"
              value={oilUse.description}
              onChange={(e) =>
                setOilUse({ ...oilUse, description: e.target.value })
              }
              required
            />
            <TextField
              label="Uso de Petróleo"
              type="number"
              value={oilUse.oil_use}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                  setOilUse({ ...oilUse, oil_use: value });
                }
              }}
              required
            />
            <Button variant="contained" type="submit">
              {routeOilUseSelected ? "Actualizar" : "Guardar"}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </Card>
      </Modal>
    </Box>
  );
};

const ResultOil = () => {
  const { routeSelected } = useVehicleRoute();
  const { vehicleRoutes } = useVehicleRoutes();
  const { routesOilUse } = useVehicleRoutesOil();
  const { routes } = useRoutes();
  const [result, setResult] = useState(0);
  const [resultControlled, setResultControlled] = useState(0);
  const [resultJustified, setResultJustified] = useState(0);
  const [resultUsed, setResultUsed] = useState(0);

  useEffect(() => {
    if (routeSelected) {
      if (vehicleRoutes) {
        const oilUsed = routesOilUse.reduce((acc, route) => {
          if (route.id_vehicle_route === routeSelected.id) {
            return acc + route.oil_use;
          }
          return acc;
        }, 0);
        setResultUsed(oilUsed); // usado de mas
        const oilUsedControlled = vehicleRoutes.reduce((acc, route) => {
          if (route.id_vehicle_route === routeSelected.id) {
            return acc + route.oil_use;
          }
          return acc;
        }, 0);
        setResultControlled(oilUsedControlled); // controlado

        const oilUsedJustified = vehicleRoutes
          .map((r) => {
            const route = routes.find((route) => route.id === r.id_route);
            return route ? route.oil_use : 0;
          })
          .reduce((acc, route) => acc + route, 0);

        setResultJustified(oilUsedJustified); // justificado

        setResult(oilUsedControlled - oilUsedJustified - oilUsed); //
      }
    }
  }, [routeSelected, vehicleRoutes, routes, routesOilUse]);

  return (
    <Box
      sx={{
        padding: 2,
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "primary.main",
      }}
    >
      <Card
        sx={{
          width: "25%",
          padding: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">LIQUIDACION DE PETROLEO</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Typography variant="body1">PETROLEO REAL USADO:</Typography>
          <Typography variant="body1">{resultControlled}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 1,
          }}
        >
          <Typography variant="body1">PETROLEO COMPUTADO:</Typography>
          <Typography variant="body1">{resultJustified}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 1,
          }}
        >
          <Typography variant="body1">PETROLEO EXTRA:</Typography>
          <Typography variant="body1">{resultUsed}</Typography>
        </Box>
        <Box
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            marginY: 2,
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 1,
          }}
        >
          <Typography variant="body1">LIQUIDACION:</Typography>
          <Typography variant="body1">{result}</Typography>
        </Box>
      </Card>
    </Box>
  );
};

const ControlTransportDetailLiquidation = () => {
  return (
    <Box>
      <LiquidationMoneyConcern />
      <LiquidationDetail />
      <LiquidationBalance />
      <LiquidationOtherCost />
      <LiquidationResult />
    </Box>
  );
};

const LiquidationResult = () => {
  const { routeSelected } = useVehicleRoute();
  const { routeDetail } = useRouteDetail();
  const { vehicleRouteBalance } = useRouteBalance();
  const { costs } = useRoutesOtherCost();
  const { routesMoney } = useVehicleRouteMoney();
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [totalTaxes, setTotalTaxes] = useState(0);
  const [result, setResult] = useState(0);
  useEffect(() => {
    if (!routeSelected) return;
    if (!routeDetail) return;
    const balanceSum = vehicleRouteBalance.reduce(
      (acc, balance) => acc + balance.balance,
      0
    );
    setTotalBalance(balanceSum);
    const costSum = costs.reduce((acc, cost) => acc + cost.price, 0);
    setTotalCost(costSum);
    const moneySum = routesMoney.reduce((acc, money) => acc + money.money, 0);
    setTotalMoney(moneySum);
    const TotalTaxes = routeDetail.taxes_in + routeDetail.taxes_out;
    setTotalTaxes(TotalTaxes);

    setResult(moneySum - costSum - TotalTaxes - balanceSum);
  }, [routeDetail, vehicleRouteBalance, costs, routesMoney, routeSelected]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "primary.main",
      }}
    >
      <Box
        sx={{
          padding: 2,
          marginTop: 2,
          display: "flex",
          justifyContent: "center",
          minWidth: "80%",
          maxWidth: "100%",
        }}
      >
        <Card sx={{ padding: 3, boxShadow: 3, borderRadius: 2, width: "50%" }}>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, textAlign: "center" }}
          >
            LIQUIDACION
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1">Gastos Balanza:</Typography>
              <Typography variant="body1">{totalBalance}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1">Otros Gastos:</Typography>
              <Typography variant="body1">{totalCost}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1">Gastos Peajes:</Typography>
              <Typography variant="body1">{totalTaxes}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1">Dinero Dado:</Typography>
              <Typography variant="body1">{totalMoney}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              marginY: 2,
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
              fontWeight: "bold",
            }}
          >
            <Typography variant="body1">Saldo:</Typography>
            <Typography
              variant="body1"
              sx={{ color: result >= 0 ? "green" : "red" }}
            >
              {result >= 0 ? `A devolver: ${result}` : `A pagar: ${result}`}
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

const LiquidationDetail = () => {
  const { routeDetail, updateRoute } = useRouteDetail();
  const [detail, setDetail] = useState<VehicleRouteDetailResDto | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (routeDetail) {
      setDetail(routeDetail);
    }
  }, [routeDetail]);

  const handleDate = (date: string | null) => {
    if (!date) return "";
    return format(new Date(date), "yyyy-MM-dd");
  };

  const handleSubmit = async () => {
    if (detail) {
      await updateRoute(detail.id, detail);
      setIsEdit(false);
    }
  };

  return (
    <Box>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6">Detalles de la Ruta</Typography>
        {detail && (
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Fecha de Inicio"
              type="date"
              disabled={!isEdit}
              value={detail.dateInit ? handleDate(detail.dateInit) : ""}
              onChange={(e) =>
                setDetail({ ...detail, dateInit: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Fecha de Fin"
              type="date"
              disabled={!isEdit}
              value={detail.dateEnd ? handleDate(detail.dateEnd) : ""}
              onChange={(e) =>
                setDetail({ ...detail, dateEnd: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Impuestos de Entrada"
              type="number"
              disabled={!isEdit}
              value={detail.taxes_in}
              onChange={(e) =>
                setDetail({
                  ...detail,
                  taxes_in: parseFloat(e.target.value),
                })
              }
              required
            />
            <TextField
              label="Impuestos de Salida"
              type="number"
              disabled={!isEdit}
              value={detail.taxes_out}
              onChange={(e) =>
                setDetail({
                  ...detail,
                  taxes_out: parseFloat(e.target.value),
                })
              }
              required
            />

            {isEdit ? (
              <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                <Button variant="contained" type="submit">
                  Guardar
                </Button>
              </Box>
            ) : (
              <Button variant="contained" onClick={() => setIsEdit(true)}>
                Editar
              </Button>
            )}
          </Box>
        )}
      </Card>
    </Box>
  );
};

const LiquidationOtherCost = () => {
  const { routeSelected } = useVehicleRoute();
  const {
    costs: otherCosts,
    createCost,
    deleteCost,
    updateCost,
    costSelected,
    setCostSelected,
  } = useRoutesOtherCost();

  const [cost, setCost] = useState<VehicleRouteOtherCostDto>({
    description: "",
    id_vehicle_route: routeSelected?.id || 0,
    price: 0,
  });
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCost({
      description: "",
      id_vehicle_route: routeSelected?.id || 0,
      price: 0,
    });
  };

  const handleSubmit = async () => {
    if (!routeSelected) return;
    if (!costSelected) return;
    if (editMode) {
      await updateCost(costSelected.id, cost);
    } else {
      await createCost(cost);
    }
    setCost({
      description: "",
      id_vehicle_route: routeSelected.id,
      price: 0,
    });
    handleClose();
  };

  const handleEdit = (cost: VehicleRouteOtherCostResDto) => {
    setCost(cost);
    setCostSelected(cost);
    setEditMode(true);
    handleOpen();
  };

  const handleDelete = async (id: number) => {
    await deleteCost(id);
  };

  return (
    <Box>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6">Otros Gastos</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Añadir
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {otherCosts.map((cost) => (
              <TableRow key={cost.id}>
                <TableCell>{cost.description}</TableCell>
                <TableCell>{cost.price}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleEdit(cost)}>
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(cost.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
          <Typography variant="h6">
            {editMode ? "Editar Otro Gasto" : "Añadir Otro Gasto"}
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Descripción"
              value={cost.description}
              onChange={(e) =>
                setCost({ ...cost, description: e.target.value })
              }
              required
            />
            <TextField
              label="Precio"
              type="number"
              value={cost.price}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                  setCost({ ...cost, price: value });
                }
              }}
              required
            />
            <Button variant="contained" type="submit">
              {editMode ? "Actualizar" : "Guardar"}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Card>
      </Modal>
    </Box>
  );
};

const LiquidationMoneyConcern = () => {
  const { routeSelected } = useVehicleRoute();
  const {
    createRouteMoney,
    deleteRouteMoney,
    updateRouteMoney,
    routesMoney,
    routeMoneySelected,
    setRouteMoneySelected,
  } = useVehicleRouteMoney();

  const [money, setMoney] = useState<VehicleRouteMoneyDto>({
    money: 0,
    givenby: "",
    description: "",
    type: "",
    id_vehicle_route: routeSelected?.id || 0,
  });

  const [open, setOpen] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setMoney({
      money: 0,
      givenby: "",
      id_vehicle_route: routeSelected?.id || 0,
      description: "",
      type: "",
    });

    setRouteMoneySelected(null);
  };

  const handleSubmit = async () => {
    if (!routeSelected) return;
    if (!routeMoneySelected) {
      await createRouteMoney(money);
    } else {
      await updateRouteMoney(routeMoneySelected.id, money);
    }
    setMoney({
      money: 0,
      givenby: "",
      description: "",
      type: "",
      id_vehicle_route: routeSelected.id,
    });
    handleClose();
  };

  const handleEdit = (money: VehicleRouteMoneyResDto) => {
    setMoney(money);
    setRouteMoneySelected(money);
    setEditMode(true);
    handleOpen();
  };

  const handleDelete = async (id: number) => {
    await deleteRouteMoney(id);
  };

  return (
    <Box>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6">Dinero Dado</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Añadir
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Entregado Por</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routesMoney.map((money) => (
              <TableRow key={money.id}>
                <TableCell>{money.description}</TableCell>
                <TableCell>{money.money}</TableCell>
                <TableCell>{money.givenby}</TableCell>
                <TableCell>{money.type}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleEdit(money)}>
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(money.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
          <Typography variant="h6">
            {editMode ? "Editar Dinero Dado" : "Añadir Dinero Dado"}
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Descripción"
              value={money.description}
              onChange={(e) =>
                setMoney({ ...money, description: e.target.value })
              }
              required
            />
            <TextField
              label="Monto"
              type="number"
              value={money.money}
              onChange={(e) =>
                setMoney({ ...money, money: parseFloat(e.target.value) })
              }
              required
            />
            <TextField
              label="Entregado Por"
              value={money.givenby}
              onChange={(e) => setMoney({ ...money, givenby: e.target.value })}
              required
            />
            <TextField
              label="Tipo"
              value={money.type}
              onChange={(e) => setMoney({ ...money, type: e.target.value })}
              required
            />
            <Button variant="contained" type="submit">
              {editMode ? "Actualizar" : "Guardar"}
            </Button>

            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </Card>
      </Modal>
    </Box>
  );
};

const LiquidationBalance = () => {
  const { routeSelected } = useVehicleRoute();
  const {
    vehicleRouteBalance,
    createVehicleRouteBalance: createBalance,
    deleteVehicleRouteBalance: deleteBalance,
    vehicleRouteBalanceSelected,
    updateVehicleRouteBalance,
    setVehicleRouteBalanceSelected,
  } = useRouteBalance();
  const [balance, setBalance] = useState<VehicleRouteBalanceDto>({
    balance: 0,
    place: "",
    id_vehicle_route: routeSelected?.id || 0,
  });
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setBalance({
      balance: 0,
      place: "",
      id_vehicle_route: routeSelected?.id || 0,
    });
  };

  const handleSubmit = async () => {
    if (!routeSelected) return;
    if (!vehicleRouteBalanceSelected) return;
    if (!editMode) {
      await createBalance(balance);
    } else {
      await updateVehicleRouteBalance(vehicleRouteBalanceSelected.id, balance);
    }
    setBalance({
      balance: 0,
      place: "",
      id_vehicle_route: routeSelected.id,
    });
    handleClose();
  };

  const handleEdit = (balance: VehicleRouteBalanceResDto) => {
    setBalance(balance);
    setVehicleRouteBalanceSelected(balance);
    updateVehicleRouteBalance(balance.id, balance);
    setEditMode(true);
    handleOpen();
  };

  const handleDelete = async (id: number) => {
    await deleteBalance(id);
  };

  return (
    <Box>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6">Balanza</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Añadir
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lugar</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleRouteBalance.map((balance) => (
              <TableRow key={balance.id}>
                <TableCell>{balance.place}</TableCell>
                <TableCell>{balance.balance}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(balance)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(balance.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
          <Typography variant="h6">
            {editMode ? "Editar Balance" : "Añadir Balance"}
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Lugar"
              value={balance.place}
              onChange={(e) =>
                setBalance({ ...balance, place: e.target.value })
              }
              required
            />
            <TextField
              label="Balance"
              type="number"
              value={balance.balance}
              onChange={(e) =>
                setBalance({ ...balance, balance: parseFloat(e.target.value) })
              }
              required
            />
            <Button variant="contained" type="submit">
              {editMode ? "Actualizar" : "Guardar"}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </Card>
      </Modal>
    </Box>
  );
};