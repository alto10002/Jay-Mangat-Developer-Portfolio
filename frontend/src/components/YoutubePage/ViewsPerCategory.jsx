import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);
const TopViewsByCategoryChart = ({ data }) => {
  // Group by category and sum views
  // Category ID to name mapping
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

  const categoryViews = data.reduce((acc, item) => {
    const categoryName = categoryMap[item.categoryid] || "Unknown";
    acc[categoryName] = (acc[categoryName] || 0) + item.views;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryViews).sort((a, b) => b[1] - a[1]);

  const chartData = {
    labels: sortedCategories.map(([category]) => category),
    datasets: [
      {
        label: "Total Views",
        data: sortedCategories.map(([, views]) => views / 1_000_000),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Total Views by Category (millions)" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Category" },
        ticks: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Views" },
        ticks: {
          callback: (value) => (value === 0 ? "" : `${value}`), // ← hides 0
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TopViewsByCategoryChart;
