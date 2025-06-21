import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Glow, GlowCapture } from "@codaworks/react-glow";

const categoryMap = {
  1: "Film & Animation",
  2: "Autos & Vehicles",
  10: "Music",
  15: "Pets & Animals",
  17: "Sports",
  18: "Short Movies",
  19: "Travel & Events",
  20: "Gaming",
  21: "Videoblogging",
  22: "People & Blogs",
  23: "Comedy",
  24: "Entertainment",
  25: "News & Politics",
  26: "Howto & Style",
  27: "Education",
  28: "Science & Technology",
  30: "Movies",
  31: "Anime/Animation",
  32: "Action/Adventure",
  33: "Classics",
  34: "Comedy",
  35: "Documentary",
  36: "Drama",
  37: "Family",
  38: "Foreign",
  39: "Horror",
  40: "Sci-Fi/Fantasy",
  41: "Thriller",
  42: "Shorts",
  43: "Shows",
  44: "Trailers",
};

const AverageViewcountCard = ({ data = [] }) => {
  const theme = useTheme();
  const categoryStats = {};

  // Aggregate views by category
  data.forEach((item) => {
    const cat = item.categoryid;
    if (!categoryStats[cat]) {
      categoryStats[cat] = { views: 0, count: 0 };
    }
    categoryStats[cat].views += item.views;
    categoryStats[cat].count += 1;
  });

  // Find category with highest average views
  let topCategoryId = null;
  let maxAvg = -1;

  for (const [catId, { views, count }] of Object.entries(categoryStats)) {
    const avg = views / count;
    if (avg > maxAvg) {
      maxAvg = avg;
      topCategoryId = catId;
    }
  }

  const topCategoryName = categoryMap[topCategoryId] || "Unknown";

  return (
    <Card sx={{ minWidth: 250, boxShadow: 3, borderRadius: 3, bgcolor: theme.palette.youtubePage.mainAreaCard }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top Avg Views by Category
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
                {topCategoryName}
              </Typography>
            </Glow>
          </Box>
        </GlowCapture>

        <Typography variant="subtitle2" color="white">
          {Math.round(maxAvg).toLocaleString()} views/video
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AverageViewcountCard;
