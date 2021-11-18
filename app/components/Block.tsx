import { Box } from '@mui/system';

interface BlockProps {
  children: React.ReactNode
}

export default function Block ({ children }: BlockProps) {
  return (
    <Box
      component='div'
      sx={{
        height: 60,
        width: '100%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </Box>
  );
}
