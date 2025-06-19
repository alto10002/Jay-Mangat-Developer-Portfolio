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
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";
import Slider from "@mui/material/Slider";
import { Glow, GlowCapture } from "@codaworks/react-glow";
import ViewsOverTimeChart from "../components/YoutubePage/ViewsOverTime";
import TopViewsByCategoryChart from "../components/YoutubePage/ViewsPerCategory";
import UploadTimesChart from "../components/YoutubePage/UploadTimes";
import ViewsPerRegionChart from "../components/YoutubePage/ViewsPerRegion";
import AverageTagsCard from "../components/YoutubePage/AverageTags";
import AverageViewcountCard from "../components/YoutubePage/AverageViewcount";
import AverageVideoLengthCard from "../components/YoutubePage/AverageVideoLength";

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

const categoryIds = {
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

const countries = ["Canada", "United States", "Mexico", "United Kingdom", "Russia"];

function YoutubePage() {
  const theme = useTheme();
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMinTagCount, setSelectedMinTagCount] = useState(0);
  const [selectedMaxTagCount, setSelectedMaxTagCount] = useState(10);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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

    try {
      const response = await fetch(`${apiUrl}/youtube_filter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });
      const data = await response.json();
      setFilteredData(data.data);
    } catch (e) {
      console.error("Error fetching filtered data: ", e);
    }
  };

  // debugging to check filter output
  useEffect(() => {
    console.log("Updated filteredData:", filteredData);
  }, [filteredData]);

  return (
    <Box display="flex">
      <Box
        sx={{
          bgcolor: theme.palette.youtubePage.sidebarBackground,
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
          <Accordion
            defaultExpanded
            sx={{
              bgcolor: theme.palette.youtubePage.sidebarAccordian,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={theme.typography.youtubePage_sidebar}>Date Range</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={theme.typography.youtubePage_sidebar}>Start Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={startDate}
                  minDate={dayjs("2025-06-16")}
                  maxDate={endDate ? dayjs(endDate).subtract(1, "day") : undefined}
                  onChange={(newStartDate) => setStartDate(newStartDate)}
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, 10],
                          },
                        },
                      ],
                      sx: {
                        zIndex: 1300,
                        "& .MuiPaper-root": {
                          backgroundColor: "grey",
                          color: "white",
                        },
                      },
                    },
                  }}
                />
                <br />
                <Typography sx={theme.typography.youtubePage_sidebar}>End Date</Typography>
                <DatePicker
                  value={endDate}
                  minDate={startDate ? dayjs(startDate).add(1, "day") : undefined}
                  maxDate={dayjs()}
                  onChange={(newEndDate) => setEndDate(newEndDate)}
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, 10],
                          },
                        },
                      ],
                      sx: {
                        zIndex: 1300,
                        "& .MuiPaper-root": {
                          backgroundColor: "grey",
                          color: "white",
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </AccordionDetails>
          </Accordion>
          <Accordion
            defaultExpanded
            sx={{
              bgcolor: theme.palette.youtubePage.sidebarAccordian,
            }}
          >
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
                          variant={selectedCategories.includes(category) ? "filled" : "outlined"}
                          sx={{
                            bgcolor: selectedCategories.includes(category)
                              ? theme.palette.youtubePage.youtubeRed
                              : undefined,
                            color: selectedCategories.includes(category) ? "black" : "white",
                            fontWeight: "bold",
                          }}
                          className="glow:shadow-lg glow:border glow:border-red-500 text-black rounded-full"
                        />
                      </Glow>
                    ))}
                  </div>
                </Box>
              </GlowCapture>
            </AccordionDetails>
          </Accordion>
          {/* <Accordion
            defaultExpanded
            sx={{
              bgcolor: theme.palette.youtubePage.background,
            }}
          >
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
          </Accordion> */}
          <Accordion
            defaultExpanded
            sx={{
              bgcolor: theme.palette.youtubePage.sidebarAccordian,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={theme.typography.youtubePage_sidebar}>Country</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GlowCapture>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {countries.map((country) => (
                    <Glow key={country} color="red">
                      <Chip
                        label={country}
                        clickable
                        onClick={() => updateState([setSelectedCountries, country])}
                        variant={selectedCountries.includes(country) ? "filled" : "outlined"}
                        sx={{
                          bgcolor: selectedCountries.includes(country)
                            ? theme.palette.youtubePage.youtubeRed
                            : undefined,
                          color: selectedCountries.includes(country) ? "black" : "white",
                          fontWeight: "bold",
                        }}
                        className="glow:shadow-lg glow:border glow:border-red-500 text-black rounded-full"
                      />
                    </Glow>
                  ))}
                </Box>
              </GlowCapture>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
      <Box
        sx={{
          width: 4 / 5,
        }}
      >
        <Box sx={{ display: "flex", height: "40vh" }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AverageViewcountCard data={filteredData} />
            <AverageVideoLengthCard data={filteredData} />
          </Box>
          <Box
            sx={{
              flex: 3,
              paddingLeft: 2,
            }}
          >
            <TopViewsByCategoryChart data={filteredData} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", height: "60vh" }}>
          <Box
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", height: 1 / 2 }}>
              <UploadTimesChart data={filteredData} />
            </Box>
            <Box sx={{ display: "flex", height: 1 / 2 }}>
              <ViewsOverTimeChart data={filteredData} />
            </Box>
          </Box>{" "}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", height: 1 / 4 }}>
              <AverageTagsCard data={filteredData} />
            </Box>
            <Box sx={{ display: "flex", height: 3 / 4 }}>
              <ViewsPerRegionChart data={filteredData} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default YoutubePage;
