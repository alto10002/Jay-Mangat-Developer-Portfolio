import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);
const TopViewsByCategoryChart = ({ data }) => {
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

  const categoryViews = {};
  const categoryCounts = {};

  data.forEach((item) => {
    const categoryName = categoryMap[item.categoryid] || "Unknown";
    categoryViews[categoryName] = (categoryViews[categoryName] || 0) + item.views;
    categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
  });

  const sortedCategories = Object.entries(categoryViews)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category); // preserve order

  const chartData = {
    labels: sortedCategories,
    datasets: [
      {
        label: "Total Views (M)",
        data: sortedCategories.map((category) => categoryViews[category] / 1_000_000),
        backgroundColor: "#FEDF16",
        yAxisID: "y",
        barThickness: 20,
        categoryPercentage: 0.6,
        barPercentage: 0.8,
      },
      {
        label: "Video Count",
        data: sortedCategories.map((category) => categoryCounts[category]),
        backgroundColor: "#008F05",
        yAxisID: "y1",
        barThickness: 8,
        categoryPercentage: 0.6,
        barPercentage: 0.8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Total Views and Video Count by Category",
        color: "white",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        bodyColor: "white",
        titleColor: "white",
        backgroundColor: "#333",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Category",
          color: "white",
        },
        ticks: {
          display: false,
          color: "white",
        },
        grid: { display: false },
        stacked: false,
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Views (M)",
          color: "white",
        },
        ticks: {
          color: "white",
          callback: (value) => (value === 0 ? "" : `${value}`),
        },
        position: "left",
        grid: {
          color: "rgba(255, 255, 255, 0.5)", // Change this to desired grid line color
        },
      },
      y1: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Videos",
          color: "white",
        },
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "white",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TopViewsByCategoryChart;
