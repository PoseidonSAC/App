export interface ButtonProps {
  title: string;
  onClick: () => void;
  icon: JSX.Element;
}

import { Button as MaterialButton, Typography } from "@mui/material";

export const Button = ({ title, onClick, icon }: ButtonProps) => {
  const size = "200px";
  return (
    <MaterialButton
      variant="contained"
      color="primary"
      onClick={onClick}
      startIcon={icon}
      sx={{ width: size, height: size }}
    >
      <Typography>{title}</Typography>
    </MaterialButton>
  );
};
