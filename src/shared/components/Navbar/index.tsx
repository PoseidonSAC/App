import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import { Item } from "../../navbarItems/types/Item";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/context";

export interface NavbarProps {
  items: Item[] | null;
}

export const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          JUANY S.A.C
        </Typography>
        {/*items &&
          items.map((item, index) => (
            <Button
              key={index}
              color="inherit"
              onClick={() => navigate(item.url)}
            >
              {item.title}
            </Button>
          ))*/}
        <Button color="inherit" onClick={() => navigate("/inicio")}>
          Inicio
        </Button>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
