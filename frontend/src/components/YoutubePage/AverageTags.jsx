import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Glow, GlowCapture } from "@codaworks/react-glow";

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
                {avgTags}
              </Typography>
            </Glow>
          </Box>
        </GlowCapture>
      </CardContent>
    </Card>
  );
};

export default AverageTagsCard;
