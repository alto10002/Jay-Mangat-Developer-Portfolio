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
  const predefinedColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
  const colors = countries.map((_, i) => predefinedColors[i % predefinedColors.length]);

  const chartData = {
    labels: countries,
    datasets: [
      {
        label: "Views",
        data: views,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: { display: true, text: "Relative Views Per Region" },

      tooltip: {
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
