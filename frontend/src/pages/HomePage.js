import LiquidBackground from '../components/LiquidBackground';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function HomePage() {
  const theme = useTheme();
  return (
    <>
      <LiquidBackground /> {/* Background fixed behind everything */}
      <Box sx={{
        position: 'relative',
        zIndex: 1, // Ensure content is above background
        minHeight: '100vh', // Ensure content fills viewport
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant="h1" color='theme.palette.text.primary'>
          This is the Home Page
        </Typography>
      </Box>
    </>
  );
}

export default HomePage;