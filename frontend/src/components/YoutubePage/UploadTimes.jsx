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
        label: "Number of Uploads",
        data: hourCounts,
        backgroundColor: "#ffa500",
        yAxisID: "y",
      },
      {
        type: "line",
        label: "",
        data: lightLevels,
        borderColor: "#ccc",
        backgroundColor: "rgba(255, 255, 0, 0.8)", // Yellow with 80% opacity
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        yAxisID: "y1",
        tooltip: { enabled: false },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          filter: (legendItem) => legendItem.text !== "",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        filter: (tooltipItem) => tooltipItem.dataset.label !== "",
      },
      title: { display: true, text: "Uploads by Time of Day" },
    },
    layout: {
      backgroundColor: "rgba(128, 128, 128, 0.8)", // Chart background: grey
    },
    scales: {
      x: {
        title: { display: true, text: "Hour" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Uploads" },
        position: "left",
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
    maintainAspectRatio: false,
  };

  return <Bar data={chartData} options={options} />;
};

export default UploadTimesChart;
