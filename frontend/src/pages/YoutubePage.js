import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "../components/sheets/sidebar.css";
import { Box, Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FaYoutube } from "react-icons/fa";
// import { DateRangePicker } from "@mui/x-date-pickers/DateRangePicker";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";

const categories = [
  "Film & Animation",
  "Autos & Vehicles",
  "Music",
  "Pets & Animals",
  "Sports",
  "Short Movies",
  "Travel & Events",
  "Gaming",
  "Videoblogging",
  "People & Blogs",
  "Comedy", // appears twice. Might Cause issues down the line
  "Entertainment",
  "News & Politics",
  "Howto & Style",
  "Education",
  "Science & Technology",
  "Movies",
  "Anime/Animation",
  "Action/Adventure",
  "Classics",
  "Documentary",
  "Drama",
  "Family",
  "Foreign",
  "Horror",
  "Sci-Fi/Fantasy",
  "Thriller",
  "Shorts",
  "Shows",
  "Trailers",
];

function YoutubePage() {
  const theme = useTheme();
  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <Box display="flex">
      <Box
        sx={{
          bgcolor: theme.palette.youtubePage.background,
          width: 1 / 5,
          minWidth: "400px",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            height: "50px",
            bgcolor: theme.palette.youtubePage.youtubeRed,
          }}
        >
          <FaYoutube />
          Trend Analyzer
        </Box>
        <Box>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Date Range</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Start Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={startDate}
                  maxDate={endDate}
                  onChange={(newStartDate) => setStartDate(newStartDate)}
                />
                <br />
                <Typography>End Date</Typography>
                <DatePicker value={endDate} minDate={startDate} onChange={(newEndDate) => setEndDate(newEndDate)} />
              </LocalizationProvider>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    clickable
                    onClick={() => handleToggle(category)}
                    color={selectedCategories.includes(category) ? "primary" : "default"}
                    variant={selectedCategories.includes(category) ? "filled" : "outlined"}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Number of tags</Typography>
            </AccordionSummary>
          </Accordion>
        </Box>
      </Box>
      <Box
        sx={{
          width: 4 / 5,
        }}
      >
        <Typography>
          selected start date: {startDate.format("MMMM D, YYYY")}
          <br />
          selected end date: {endDate.format("MMMM D, YYYY")}
        </Typography>
      </Box>
    </Box>
  );
}

export default YoutubePage;
