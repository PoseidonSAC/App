import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import { Item } from "../../../navbarItems/types/Item";

export interface NavbarProps {
  items: Item[];
}

export const Navbar = ({ items }: NavbarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          JUANY S.A.C
        </Typography>
        {items.map((item, index) => (
          <Button key={index} color="inherit">
            {item.title}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};
