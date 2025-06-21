import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Glow, GlowCapture } from "@codaworks/react-glow";

const AverageVideoLengthCard = ({ data = [] }) => {
  const theme = useTheme();
  const durations = data
    .map((item) => item.duration)
    .filter((d) => typeof d === "number" && !isNaN(d))
    .sort((a, b) => a - b);

  const duration_low = Math.floor(durations[Math.floor(0.25 * durations.length)] / 60);
  const duration_high = Math.ceil(durations[Math.ceil(0.75 * durations.length) - 1] / 60);

  return (
    <Card sx={{ minWidth: 250, boxShadow: 3, borderRadius: 3, bgcolor: theme.palette.youtubePage.mainAreaCard }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={theme.typography.youtubePage_sidebar}>
          Most trending videos are between
        </Typography>
        <GlowCapture>
          <Box textAlign="center">
            <Glow color="red">
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  color: "white",
                  transition: "color 0.3s ease",
                }}
                className="glow:text-glow"
              >
                {duration_low} - {duration_high} minutes
              </Typography>
            </Glow>
          </Box>
        </GlowCapture>
      </CardContent>
    </Card>
  );
};

export default AverageVideoLengthCard;
