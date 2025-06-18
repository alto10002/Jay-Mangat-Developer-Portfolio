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

// Register components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const ViewsOverTimeChart = ({ data }) => {
  const groupedViews = data.reduce((acc, item) => {
    const date = dayjs(item.trending_date).format("YYYY-MM-DD");
    acc[date] = (acc[date] || 0) + item.views / 1000000;
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedViews).sort();

  const chartData = {
    labels: sortedDates.map((d) => dayjs(d).format("MMM D")),
    datasets: [
      {
        label: "Total Views",
        data: sortedDates.map((d) => groupedViews[d]),
        fill: false,
        borderColor: "#8884d8",
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "#8884d8",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Total Views Over Date Range (millions)" },
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
          callback: (value) => (value === 0 ? "" : `${value}`), // ← hides 0
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ViewsOverTimeChart;
