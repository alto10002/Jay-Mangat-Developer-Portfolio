import "../components/sheets/sidebar.css";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FaYoutube } from "react-icons/fa";
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
import Slider from "@mui/material/Slider";
import { Glow, GlowCapture } from "@codaworks/react-glow";

const categories = [
  "Action/Adventure",
  "Anime/Animation",
  "Autos & Vehicles",
  "Classics",
  "Comedy", // appears twice. Might Cause issues down the line
  "Documentary",
  "Drama",
  "Education",
  "Entertainment",
  "Family",
  "Film & Animation",
  "Foreign",
  "Gaming",
  "Horror",
  "Howto & Style",
  "Movies",
  "Music",
  "News & Politics",
  "People & Blogs",
  "Pets & Animals",
  "Science & Technology",
  "Sci-Fi/Fantasy",
  "Short Movies",
  "Shorts",
  "Shows",
  "Sports",
  "Thriller",
  "Trailers",
  "Travel & Events",
  "Videoblogging",
];

const countries = ["Canada", "United States", "Mexico", "United Kingdom", "Russia"];

function YoutubePage() {
  const theme = useTheme();
  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [selectedMinTagCount, setSelectedMinTagCount] = useState(0);
  const [selectedMaxTagCount, setSelectedMaxTagCount] = useState(10);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    {
      value: 5,
    },
    {
      value: 6,
    },
    {
      value: 7,
    },
    {
      value: 8,
    },
    {
      value: 9,
    },
    {
      value: 10,
      label: "10",
    },
  ];

  const updateState = ([setState, item]) => {
    setState((oldState) => (oldState.includes(item) ? oldState.filter((x) => x !== item) : [...oldState, item]));
  };

  const submitFilters = async () => {
    const filters = {
      categories: selectedCategories,
      countries: selectedCountries,
      minTags: selectedMinTagCount,
      maxTags: selectedMaxTagCount,
      startDate: startDate?.format("YYYY-MM-DD"),
      endDate: endDate?.format("YYYY-MM-DD"),
    };

    // console.log(filters);
    // console.log(JSON.stringify(filters));

    try {
      const response = await fetch(`${apiUrl}/youtube_filter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });
      const filtered_data = await response.json();
      console.log(filtered_data);
    } catch (e) {
      console.error("Error fetching filtered data: ", e);
      // alert("Error fetching filtered data: ", e);
    }
  };

  return (
    <Box display="flex">
      <Box
        sx={{
          bgcolor: theme.palette.youtubePage.background,
          width: 1 / 5,
          minWidth: "400px",
          height: "100vh",
          color: theme.palette.youtubePage.sidebarText,
          overflowY: "auto",
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
        <Button onClick={() => submitFilters()}>Submit Filters</Button>
        <Box>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={theme.typography.youtubePage_sidebar}>Date Range</Typography>
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
              <Typography sx={theme.typography.youtubePage_sidebar}>Video Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GlowCapture>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => setSelectedCategories(categories)}>Select All</Button>
                    <Button onClick={() => setSelectedCategories([])}>Deselect All</Button>
                    <br />
                    {categories.map((category) => (
                      <Glow key={category} color="red">
                        <Chip
                          label={category}
                          clickable
                          onClick={() => updateState([setSelectedCategories, category])}
                          color={selectedCategories.includes(category) ? "primary" : "default"}
                          variant={selectedCategories.includes(category) ? "filled" : "outlined"}
                          className="glow:shadow-lg glow:border glow:border-red-500 glow:bg-red-500 text-black rounded-full"
                        />
                      </Glow>
                    ))}
                  </div>
                </Box>
              </GlowCapture>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={theme.typography.youtubePage_sidebar}>Number of tags</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Slider
                value={[selectedMinTagCount, selectedMaxTagCount]}
                onChange={(_, sliderValues) => {
                  setSelectedMinTagCount(sliderValues[0]);
                  setSelectedMaxTagCount(sliderValues[1]);
                }}
                valueLabelDisplay="auto"
                min={0}
                max={10}
                marks={marks}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={theme.typography.youtubePage_sidebar}>Country</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {countries.map((country) => (
                  <Chip
                    key={country}
                    label={country}
                    clickable
                    onClick={() => updateState([setSelectedCountries, country])}
                    color={selectedCountries.includes(country) ? "primary" : "default"}
                    variant={selectedCountries.includes(country) ? "filled" : "outlined"}
                  />
                ))}
              </Box>
            </AccordionDetails>
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
          <br />
          selected end date:{selectedCountries}
          <br />
          selected end date {selectedCategories}
          <br />
          selected end date:{selectedMaxTagCount}
          <br />
          selected end date:{selectedMinTagCount}
          <br />
        </Typography>
        <Box sx={{ width: "100px" }}>
          <GlowCapture>
            <Glow color="cyan">
              <div className="glow:bg-cyan-500 glow:shadow-cyan-500/50 glow:text-white bg-gray-900 p-6 rounded-md transition-all duration-300">
                Hover to glow ✨
              </div>
            </Glow>
          </GlowCapture>
        </Box>
      </Box>
    </Box>
  );
}

export default YoutubePage;
