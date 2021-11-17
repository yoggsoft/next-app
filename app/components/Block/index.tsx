import { ButtonBase } from "@mui/material";

interface IBlock {
  children: React.ReactNode
}

export default function Block ({ children }: IBlock) {
  return (
    <ButtonBase sx={{ height: 80, width: '100%' }}>
      {children}
    </ButtonBase>
  );
}