import { Box } from "@mui/material";
import { Navbar } from "../../../shared/components/Navbar";
import { BoatProvider } from "../../context/boat";

export const Pesca = () => {
  return (
    <>
      <Navbar items={null} />
      <BoatProvider>
        <Box></Box>
      </BoatProvider>
    </>
  );
};
