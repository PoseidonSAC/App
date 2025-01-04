export interface Item {
  title: string;
  url: string;
  icon: JSX.Element;
}

import PhishingIcon from "@mui/icons-material/Phishing";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";

export const navbarItems: Item[] = [
  {
    title: "pesca",
    url: "/pesca",
    icon: <PhishingIcon />,
  },
  {
    title: "Control Cajas",
    url: "/cajas",
    icon: <InventoryIcon />,
  },
  {
    title: "transporte",
    url: "/transporte",
    icon: <LocalShippingIcon />,
  },

  {
    title: "Ventas",
    url: "/ventas",
    icon: <AttachMoneyIcon />,
  },
];
