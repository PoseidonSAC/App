import { LoginForm } from "../../components/login-form";
import { Box, Grid, Typography } from "@mui/material";

export const Login = () => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoginForm />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <img
            src="src/assets/logo.jpg"
            alt="Company Logo"
            style={{ maxWidth: "25%", height: "auto", borderRadius: "25%" }}
          />
          <Typography variant="h4" component="h1" gutterBottom>
            JUANY S.A.C
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
