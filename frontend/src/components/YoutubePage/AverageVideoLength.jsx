import { Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
        <Typography variant="h4" color="primary" fontWeight="bold">
          {duration_low} - {duration_high}
        </Typography>
        <Typography variant="subtitle2" color="white">
          minutes
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AverageVideoLengthCard;
