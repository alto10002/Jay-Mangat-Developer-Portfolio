import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const UploadTimesChart = ({ data }) => {
  const hourCounts = Array(24).fill(0);
  data.forEach((item) => {
    const hour = new Date(`1970-01-01T${item.upload_time}`).getHours();
    if (!isNaN(hour)) hourCounts[hour]++;
  });

  const lightLevels = Array(24)
    .fill(0)
    .map((_, i) => Math.round(100 * Math.cos((Math.PI * (i - 12)) / 24) ** 2));

  const chartData = {
    labels: [...Array(24)].map((_, i) => `${i}:00`),
    datasets: [
      {
        type: "bar",
        label: "Uploads",
        data: hourCounts,
        backgroundColor: "#FFA500",
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Daylight Hours",
        data: lightLevels,
        backgroundColor: "rgba(255, 255, 0, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        yAxisID: "y1",
        tooltip: {
          enabled: false,
        },
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
          color: "white", // legend text
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        filter: (tooltipItem) => tooltipItem.dataset.label !== "Daylight Hours",
        bodyColor: "white", // tooltip text
        titleColor: "white",
        backgroundColor: "#333", // optional: tooltip background
      },
      title: {
        display: true,
        text: "Video Uploads by Time of Day",
        color: "white", // chart title
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Hour", color: "white" },
        ticks: { color: "white" },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Number of Uploads", color: "white" },
        ticks: { color: "white" },
        position: "left",
        grid: {
          color: "rgba(255, 255, 255, 0.5)", // Change this to desired grid line color
        },
      },
      y1: {
        beginAtZero: true,
        display: false,
        min: 0,
        max: 100,
        position: "right",
        grid: { drawOnChartArea: false },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default UploadTimesChart;
