import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Box } from "@mui/system";

import { Item } from "../../../navbarItems/types/Item/index";

export interface DrawerProps {
  items: Item[];
}

export const Drawer = ({ items }: DrawerProps) => {
  return (
    <Box>
      <nav>
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};
