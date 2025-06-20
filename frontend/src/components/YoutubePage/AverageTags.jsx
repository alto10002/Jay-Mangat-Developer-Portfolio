import { Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AverageTagsCard = ({ data = [] }) => {
  const theme = useTheme();
  const totalTags = data.reduce((sum, item) => sum + (item.tags?.length || 0), 0);
  const avgTags = data.length ? (totalTags / data.length).toFixed(2) : 0;

  return (
    <Card sx={{ minWidth: 200, boxShadow: 3, borderRadius: 3, bgcolor: theme.palette.youtubePage.mainAreaCard }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={theme.typography.youtubePage_sidebar}>
          Average Number of Video Tags
        </Typography>
        <Typography variant="h4" color="primary" fontWeight="bold">
          {avgTags}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AverageTagsCard;
