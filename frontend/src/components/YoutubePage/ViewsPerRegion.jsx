import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ViewsPerRegionChart = ({ data }) => {
  const countryViews = data.reduce((acc, item) => {
    const country = item.country || "Unknown";
    acc[country] = (acc[country] || 0) + item.views;
    return acc;
  }, {});

  const countries = Object.keys(countryViews);
  const views = Object.values(countryViews);

  const countryColors = {
    US: "#971616",
    CA: "#52009b",
    GB: "#e15759",
    MX: "#76b7b2",
    RU: "#59a14f",
  };

  const backgroundColors = countries.map((c) => countryColors[c] || "#999");

  const chartData = {
    labels: countries,
    datasets: [
      {
        label: "Views",
        data: views,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Relative Views Per Region",
        color: "white",
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "white",
        bodyColor: "white",
        callbacks: {
          label: (context) => {
            const val = context.raw.toLocaleString();
            return `${context.label}: ${val} views`;
          },
        },
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default ViewsPerRegionChart;
