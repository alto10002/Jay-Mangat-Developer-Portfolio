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
        backgroundColor: "#ffa500",
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Daylight Hours",
        data: lightLevels,
        borderColor: "#ccc",
        backgroundColor: "rgba(255, 255, 0, 0.3)",
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
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        filter: (tooltipItem) => tooltipItem.dataset.label !== "Daylight Hours",
      },
      title: {
        display: true,
        text: "Video Uploads by Time of Day",
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Hour" },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Number of Uploads" },
        position: "left",
        grid: { display: false },
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
