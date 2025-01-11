import { useNavigate } from "react-router-dom";
import { navbarItems } from "../../../shared/navbarItems/types/Item";
import { Button } from "../../components/button";
import { Box } from "@mui/system";
import { Logout } from "@mui/icons-material";
import { useAuth } from "./../../../auth/context/useContext";
import { Typography } from "@mui/material";

export const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 5,
          pb: 5,
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <Typography variant="h1">JUANY S.A.C</Typography>
      </Box>
      <Box
        sx={{
          p: 4,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 3,
          mt: "5%",
        }}
      >
        {navbarItems.map((item, index) => (
          <Button
            key={index}
            onClick={() => navigate(item.url)}
            icon={item.icon}
            title={item.title}
          />
        ))}
        <Button title="Cerrar Sesión" onClick={logout} icon={<Logout />} />
      </Box>
    </Box>
  );
};
