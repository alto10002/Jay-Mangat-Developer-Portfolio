import "../components/sheets/sidebar.css";
import { Box, Typography, Button, Tooltip } from "@mui/material";
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
import Drawer from "@mui/material/Drawer";
import { IoMdDownload } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { BsArrowsCollapseVertical } from "react-icons/bs";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoIosListBox } from "react-icons/io";

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
  useEffect(() => {
    document.title = "JM | Youtube Trend Analyzer";
    submitFilters();
  }, []);

  const theme = useTheme();
  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [selectedMinTagCount, setSelectedMinTagCount] = useState(0);
  const [selectedMaxTagCount, setSelectedMaxTagCount] = useState(10);
  const [selectedCountries, setSelectedCountries] = useState(["United States", "Canada"]);
  const [filteredData, setFilteredData] = useState([]);
  const [expandedAccordions, setExpandedAccordions] = useState({
    dateRange: false,
    videoCategory: false,
    country: false,
  });
  const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const updateState = ([setState, item]) => {
    setState((oldState) => (oldState.includes(item) ? oldState.filter((x) => x !== item) : [...oldState, item]));
  };

  const downloadJSON = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered_data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  useEffect(() => {
    console.log("Updated filteredData:", filteredData);
  }, [filteredData]);

  const allExpanded = Object.values(expandedAccordions).every(Boolean);
  const toggleAll = () => {
    const newValue = !allExpanded;
    setExpandedAccordions({
      dateRange: newValue,
      videoCategory: newValue,
      country: newValue,
    });
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box
      display="flex"
      height="100vh"
      sx={{
        overflowX: "hidden", // prevent horizontal scroll
        width: "100vw", // ensure it spans full screen width
      }}
    >
      {/* Sidebar */}
      <Box
        onClick={() => !sidebarOpen && setSidebarOpen(true)}
        style={{ cursor: sidebarOpen ? "default" : "pointer" }}
        sx={{
          bgcolor: theme.palette.youtubePage.sidebarBackground,
          width: sidebarOpen ? "400px" : "60px",
          flexShrink: 0,
          transition: "width 0.5s",
          overflowX: "hidden",
          height: "100vh",
          color: theme.palette.youtubePage.sidebarText,
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            height: "50px",
            bgcolor: theme.palette.youtubePage.youtubeRed,
            display: "flex",
            alignItems: "center",
            paddingLeft: 2,
            gap: 1,
          }}
        >
          <FaYoutube size={28} color="white" />
          {sidebarOpen && (
            <Typography variant="h1" sx={{ fontWeight: "bold", color: "white", fontSize: "1.5rem" }}>
              Youtube Trend Analyzer
            </Typography>
          )}
        </Box>

        <Box display="flex" justifyContent="center" gap={4} py={1}>
          {sidebarOpen && (
            <>
              <Tooltip title={allExpanded ? "Collapse all filters" : "Expand all filters"}>
                {allExpanded ? (
                  <MdKeyboardDoubleArrowUp size={32} style={{ cursor: "pointer" }} onClick={toggleAll} />
                ) : (
                  <MdKeyboardDoubleArrowDown size={32} style={{ cursor: "pointer" }} onClick={toggleAll} />
                )}
              </Tooltip>
              <Tooltip title="Download filtered data">
                <IoMdDownload size={32} style={{ cursor: "pointer" }} onClick={() => downloadJSON(filteredData)} />
              </Tooltip>
              <Tooltip title="Submit filtered data">
                <FaRegCircleCheck size={32} style={{ cursor: "pointer" }} onClick={submitFilters} />
              </Tooltip>
            </>
          )}
          <Tooltip title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}>
            {sidebarOpen ? (
              <BsArrowsCollapseVertical size={32} style={{ cursor: "pointer" }} onClick={toggleSidebar} />
            ) : (
              <BsArrowsExpandVertical size={32} style={{ cursor: "pointer" }} onClick={toggleSidebar} />
            )}
          </Tooltip>
        </Box>

        <Box>
          {/* Date Range */}
          <Accordion
            expanded={expandedAccordions.dateRange}
            onChange={() => setExpandedAccordions((prev) => ({ ...prev, dateRange: !prev.dateRange }))}
            sx={{ bgcolor: theme.palette.youtubePage.sidebarAccordian }}
          >
            <AccordionSummary expandIcon={sidebarOpen ? <ExpandMoreIcon /> : null}>
              <Typography sx={{ display: "flex", ...theme.typography.youtubePage_sidebar }}>
                {" "}
                <FaCalendarAlt style={{ marginTop: "4px", marginRight: "8px" }} /> {sidebarOpen && "Date Range"}{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={theme.typography.youtubePage_sidebar}>Start Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={startDate}
                  minDate={dayjs("2025-06-16")}
                  maxDate={endDate ? dayjs(endDate).subtract(1, "day") : undefined}
                  onChange={(newStartDate) => setStartDate(newStartDate)}
                  sx={[
                    {
                      "&:hover": {
                        backgroundColor: "#800000",
                      },
                    },
                  ]}
                  slotProps={{
                    layout: {
                      sx: {
                        color: "#800000",
                        borderRadius: "2px",
                        borderWidth: "1px",
                        borderColor: "#800000",
                        backgroundColor: "#222831",
                        fontSize: "10px",
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
                  sx={[
                    {
                      "&:hover": {
                        backgroundColor: "#800000",
                      },
                    },
                  ]}
                  slotProps={{
                    layout: {
                      sx: {
                        color: "#800000",
                        borderRadius: "2px",
                        borderWidth: "1px",
                        borderColor: "#800000",
                        backgroundColor: "#222831",
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </AccordionDetails>
          </Accordion>
          {/* Video Category */}
          <Accordion
            expanded={expandedAccordions.videoCategory}
            onChange={() => setExpandedAccordions((prev) => ({ ...prev, videoCategory: !prev.videoCategory }))}
            sx={{ bgcolor: theme.palette.youtubePage.sidebarAccordian }}
          >
            <AccordionSummary expandIcon={sidebarOpen ? <ExpandMoreIcon /> : null}>
              <Typography sx={{ display: "flex", ...theme.typography.youtubePage_sidebar }}>
                {" "}
                <FaGlobeAmericas style={{ marginTop: "4px", marginRight: "8px" }} /> {sidebarOpen && "Video Category"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GlowCapture>
                <Box display="flex" justifyContent="center" gap={3} mb={2} mt={-2}>
                  <Button sx={{ bgcolor: "#800000" }} onClick={() => setSelectedCategories(categories)}>
                    Select All
                  </Button>
                  <Button sx={{ bgcolor: "#800000" }} onClick={() => setSelectedCategories([])}>
                    Deselect All
                  </Button>
                </Box>
                <Box display="flex" flexWrap="wrap" gap={1}>
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
                          color: selectedCategories.includes(category) ? "white" : "white",
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
          {/* Country */}
          <Accordion
            expanded={expandedAccordions.country}
            onChange={() => setExpandedAccordions((prev) => ({ ...prev, country: !prev.country }))}
            sx={{ bgcolor: theme.palette.youtubePage.sidebarAccordian }}
          >
            <AccordionSummary expandIcon={sidebarOpen ? <ExpandMoreIcon /> : null}>
              <Typography sx={{ display: "flex", ...theme.typography.youtubePage_sidebar }}>
                {" "}
                <IoIosListBox style={{ marginTop: "4px", marginRight: "8px" }} /> {sidebarOpen && "Country"}
              </Typography>
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
                          color: selectedCountries.includes(country) ? "white" : "white",
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

      {/* Main Content */}
      <Box
        sx={{
          bgcolor: theme.palette.youtubePage.mainAreaBackground,
          flexGrow: 1,
          transition: "margin 0.3s ease",
          minWidth: 0,
          pl: 2,
        }}
      >
        <Box sx={{ display: "flex", height: "40vh" }}>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
            <AverageVideoLengthCard data={filteredData} />
            <AverageTagsCard data={filteredData} />
          </Box>
          <Box sx={{ flex: 3, paddingLeft: 2 }}>
            <TopViewsByCategoryChart data={filteredData} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", height: "60vh" }}>
          <Box sx={{ flex: 2, display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", height: 1 / 2 }}>
              <UploadTimesChart data={filteredData} />
            </Box>
            <Box sx={{ display: "flex", height: 1 / 2 }}>
              <ViewsOverTimeChart data={filteredData} />
            </Box>
          </Box>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", height: 1 / 4 }}>
              <AverageViewcountCard data={filteredData} />
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
