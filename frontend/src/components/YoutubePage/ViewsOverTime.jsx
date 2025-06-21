import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const countryColors = {
  US: "#971616",
  CA: "#52009b",
  GB: "#e15759",
  MX: "#76b7b2",
  RU: "#59a14f",
};

const ViewsOverTimeChart = ({ data }) => {
  const countryViews = {};
  const allDates = new Set();

  data.forEach((item) => {
    const date = dayjs(item.trending_date).format("YYYY-MM-DD");
    const country = item.country || "Unknown";

    if (!countryViews[country]) countryViews[country] = {};
    countryViews[country][date] = (countryViews[country][date] || 0) + item.views / 1_000_000;

    allDates.add(date);
  });

  const sortedDates = [...allDates].sort();

  const chartData = {
    labels: sortedDates.map((d) => dayjs(d).format("MMM D")),
    datasets: Object.entries(countryViews).map(([country, viewsMap]) => ({
      label: country,
      data: sortedDates.map((d) => viewsMap[d] || 0),
      borderColor: countryColors[country] || "#999",
      backgroundColor: countryColors[country] || "#999",
      fill: false,
      tension: 0.3,
      pointRadius: 2,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Views by Country (millions)" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Date" },
        ticks: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Views" },
        ticks: {
          callback: (value) => (value === 0 ? "" : `${value}`),
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ViewsOverTimeChart;
