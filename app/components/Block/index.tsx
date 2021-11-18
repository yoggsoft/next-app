import { ButtonBase } from "@mui/material";

interface IBlock {
  children: React.ReactNode
}

export default function Block ({ children }: IBlock) {
  return (
    <ButtonBase sx={{ height: 60, width: '100%' }}>
      {children}
    </ButtonBase>
  );
}