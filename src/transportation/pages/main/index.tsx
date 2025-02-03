import { Button } from "../../components/Button";
import { Box } from "@mui/system";

export interface Item {
  title: string;
  url: string;
  icon: JSX.Element;
}

import MonitorIcon from "@mui/icons-material/Monitor";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import { useNavigate } from "react-router-dom";

const items: Item[] = [
  { title: "Choferes", icon: <AccountBoxIcon />, url: "/transporte/choferes" },
  { title: "Rutas", icon: <AddRoadIcon />, url: "/transporte/rutas" },
  { title: "Control", icon: <MonitorIcon />, url: "/transporte/control" },
  {
    title: "Uso de Petroleo",
    icon: <MonitorIcon />,
    url: "/transporte/control/petroleo-destino",
  },
];

export const MainTransportation = () => {
  const navigate = useNavigate();
  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap" gap={3} mt="5%">
      {items.map((item, index) => (
        <Button
          key={index}
          title={item.title}
          icon={item.icon}
          onClick={() => {
            navigate(item.url);
          }}
        />
      ))}
    </Box>
  );
};
