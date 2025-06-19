import { Card, CardContent, Typography } from "@mui/material";

const AverageVideoLengthCard = ({ data = [] }) => {
  const durations = data
    .map((item) => item.duration)
    .filter((d) => typeof d === "number" && !isNaN(d))
    .sort((a, b) => a - b);

  if (durations.length < 2) {
    return (
      <Card sx={{ minWidth: 250, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Most trending videos are between
          </Typography>
          <Typography variant="body2">Not enough data</Typography>
        </CardContent>
      </Card>
    );
  }

  const duration_low = Math.ceil(durations[Math.floor(0.25 * durations.length)] / 60);
  const duration_high = Math.floor(durations[Math.ceil(0.75 * durations.length) - 1] / 60);

  return (
    <Card sx={{ minWidth: 250, boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Most trending videos are between
        </Typography>
        <Typography variant="h4" color="primary" fontWeight="bold">
          {duration_low} - {duration_high}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          minutes
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AverageVideoLengthCard;
