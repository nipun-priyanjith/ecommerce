import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchMonthlySales } from "../../service/ApiAdmin";
import { FaUsers, FaChartLine } from "react-icons/fa"; // Import icons
import "../../components/css/ah.css";

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function AHome() {
  const [showSummary, setShowSummary] = useState(true);
  const [salesData, setSalesData] = useState(null);
  const [categoryData, setCategoryData] = useState({
    labels: ["Electronics", "Clothing", "Groceries", "Books", "Others"],
    datasets: [
      {
        label: "Category Sales",
        data: [40, 25, 20, 10, 5], // Placeholder
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
      },
    ],
  });

  useEffect(() => {
    const loadSalesData = async () => {
      const response = await fetchMonthlySales();
      if (response && response.success) {
        const formattedData = Object.values(response.data);
        setSalesData({
          labels: Object.keys(response.data),
          datasets: [
            {
              label: "Monthly Sales (USD)",
              data: formattedData,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      }
    };

    loadSalesData();
  }, []);

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Sales Overview" },
    },
    scales: {
      x: { title: { display: true, text: "Months" } },
      y: { beginAtZero: true },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "Sales by Category" },
    },
  };

  return (
    <div className="ahome-container">
      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${showSummary ? "active" : ""}`}
          onClick={() => setShowSummary(true)}
        >
          <FaUsers />
        </button>
        <button
          className={`toggle-button ${!showSummary ? "active" : ""}`}
          onClick={() => setShowSummary(false)}
        >
          <FaChartLine />
        </button>
      </div>

      {/* Conditional Rendering for Summary and Category Charts */}
      {showSummary ? (
        <div className="sales-chart-container">
          <h2 className="chart-title">Sales Report</h2>
          {salesData ? (
            <Bar data={salesData} options={barOptions} className="sales-chart" />
          ) : (
            <p>Loading sales data...</p>
          )}
        </div>
      ) : (
        <div className="category-chart-container">
          <h2 className="chart-title">Category Sales</h2>
          <Pie data={categoryData} options={pieOptions} className="category-chart" />
        </div>
      )}
    </div>
  );
}

export default AHome;



// import React, { useEffect, useState } from "react";
// import { Bar, Line, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   Colors,
// } from "chart.js";
// import { fetchMonthlySales } from "../../service/ApiAdmin";
// import '../../components/css/ah.css';

// // Register required components for Chart.js
// ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, Title, Tooltip, Legend);

// function AHome() {
  
//   const [salesData, setSalesData] = useState(null);
//   const [categoryData, setCategoryData] = useState({
//     labels: ["Electronics", "Clothing", "Groceries", "Books", "Others"],
//     datasets: [
//       {
//         label: "Category Sales",
//         data: [40, 25, 20, 10, 5], // Placeholder
//         backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
//       },
//     ],
//   });

//   useEffect(() => {
//     const loadSalesData = async () => {
//       const response = await fetchMonthlySales();
//       if (response && response.success) {
//         const formattedData = Object.values(response.data);
//         setSalesData({
//           labels: Object.keys(response.data),
//           datasets: [
//             {
//               label: "Monthly Sales (USD)",
//               data: formattedData,
//               backgroundColor: "rgba(75, 192, 192, 0.5)",
//               borderColor: "rgba(75, 192, 192, 1)",
//               borderWidth: 1,
//             },
//           ],
//         });
//       }
//     };

//     loadSalesData();
//   }, []);

//   const barOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Monthly Sales Overview" },
//     },
//     scales: {
//       x: { title: { display: true, text: "Months" } },
//       y: { beginAtZero: true },
//     },
//   };

//   const pieOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "right" },
//       title: { display: true, text: "Sales by Category" },
//     },
//   };

//   return (
//     <>
      
      
      
//       {salesData && (
//         <>
          
//           <h2 style={{ textAlign:'center', color: '#8dc5f9', fontSize: '30px', fontWeight: 'bold' }}>Sales Report</h2>
//             <Bar data={salesData} options={barOptions} className="sales-chart" />
//             <center>
//             <div className="category-chart">
//             <h2 style={{ textAlign:'center', color: '#8dc5f9', fontSize: '30px', fontWeight: 'bold' }}>Category Sales</h2>
//             <Pie data={categoryData} options={pieOptions} className="category-chart"/>
//             </div></center>
          
          

//         </>
//       )}
//     </>
//   );
// }

// export default AHome;
