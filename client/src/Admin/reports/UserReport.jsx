import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../service/ApiUser";
import { Bar, Doughnut, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import "./UserReport.css";
import { FaUsers, FaGlobe, FaMars, FaVenus, FaChartLine } from "react-icons/fa";
import Loading from "../../components/Loading";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const UserReport = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(true); 

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div className="user-report-error">Error: {error}</div>;
  }

  // Data preparation
  const totalUsers = users.length;
  const ageData = users.reduce((acc, user) => {
    const ageGroup = Math.floor(user.age / 10) * 10;
    acc[ageGroup] = (acc[ageGroup] || 0) + 1;
    return acc;
  }, {});

  const genderData = users.reduce(
    (acc, user) => {
      acc[user.gender] = (acc[user.gender] || 0) + 1;
      return acc;
    },
    { Male: 0, Female: 0 }
  );

  const countryData = users.reduce((acc, user) => {
    acc[user.country] = (acc[user.country] || 0) + 1;
    return acc;
  }, {});

  const sortedCountries = Object.entries(countryData).sort((a, b) => b[1] - a[1]);
  const mostCommonCountry = sortedCountries[0] ? sortedCountries[0][0] : "Unknown";
  const secondMostCommonCountry = sortedCountries[1] ? sortedCountries[1][0] : "Unknown";
  const otherUsers = sortedCountries.slice(2).reduce((sum, [, count]) => sum + count, 0);

  // Predictive data for future users
  const futureUserPredictions = [totalUsers, totalUsers + 50, totalUsers + 80, totalUsers + 120];

  // Chart datasets
  const barChartData = {
    labels: Object.keys(ageData),
    datasets: [
      {
        label: "Users by Age Group",
        data: Object.values(ageData),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: Object.keys(genderData),
    datasets: [
      {
        label: "Gender Distribution",
        data: Object.values(genderData),
        backgroundColor: ["#3498db", "#e74c3c"],
        hoverOffset: 4,
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(countryData),
    datasets: [
      {
        label: "Users by Country",
        data: Object.values(countryData),
        backgroundColor: [
          "#f39c12",
          "#9b59b6",
          "#3498db",
          "#e74c3c",
          "#2ecc71",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const lineChartData = {
    labels: ["Now", "Next Month", "Next Quarter", "Next Year"],
    datasets: [
      {
        label: "Predicted Users Growth",
        data: futureUserPredictions,
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.5)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="user-report">
      <h1 className="user-report-title">Users Report</h1>



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


{/* Summary Section */}
      {showSummary ? (
      
      <div className="report-summary">
        <div className="summary-card">
          <FaUsers className="summary-icon" />
          <p>Total Users</p>
          <h3>{totalUsers}</h3>
        </div>
        <div className="summary-card">
          <FaGlobe className="summary-icon" />
          <p>Most Common Country</p>
          <h3>{mostCommonCountry}</h3>
        </div>
        <div className="summary-card">
          <FaGlobe className="summary-icon" />
          <p>Second Common Country</p>
          <h3>{secondMostCommonCountry}</h3>
        </div>
        <div className="summary-card">
          <FaMars className="summary-icon" />
          <p>Male Users</p>
          <h3>{genderData.Male}</h3>
        </div>
        <div className="summary-card">
          <FaVenus className="summary-icon" />
          <p>Female Users</p>
          <h3>{genderData.Female}</h3>
        </div>
        <div className="summary-card">
          <FaUsers className="summary-icon" />
          <p>Other Users</p>
          <h3>{otherUsers}</h3>
        </div>
      </div>
      ) : (
      
      <div className="charts-container">
        <div className="chart">
          <h2>Age Group Distribution</h2>
          <Bar data={barChartData} />
        </div>

        <div className="chart">
          <h2>Gender Distribution</h2>
          <Doughnut data={doughnutChartData} />
        </div>

        <div className="chart">
          <h2>Users by Country</h2>
          <Pie data={pieChartData} />
        </div>

        <div className="chart">
          <h2>Future User Growth Prediction</h2>
          <Line data={lineChartData} />
        </div>
      </div>
      )}
    </div>
  );
};
{/* Chart Section */}
export default UserReport;
















// import React, { useEffect, useState } from "react";
// import { fetchUsers } from "../../service/ApiUser";
// import { Bar, Doughnut, Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement,
// } from "chart.js";
// import "./UserReport.css";
// import { FaUsers, FaGlobe, FaMars, FaVenus, FaChartLine } from "react-icons/fa";
// import Loading from "../../components/Loading";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement
// );

// const UserReport = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const data = await fetchUsers();
//         setUsers(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     getUsers();
//   }, []);

//   if (loading) {
//     return <Loading/>;
//   }

//   if (error) {
//     return <div className="user-report-error">Error: {error}</div>;
//   }

//   // Data preparation
//   const totalUsers = users.length;
//   const ageData = users.reduce((acc, user) => {
//     const ageGroup = Math.floor(user.age / 10) * 10;
//     acc[ageGroup] = (acc[ageGroup] || 0) + 1;
//     return acc;
//   }, {});

//   const genderData = users.reduce(
//     (acc, user) => {
//       acc[user.gender] = (acc[user.gender] || 0) + 1;
//       return acc;
//     },
//     { Male: 0, Female: 0 }
//   );

//   const countryData = users.reduce((acc, user) => {
//     acc[user.country] = (acc[user.country] || 0) + 1;
//     return acc;
//   }, {});

//   const sortedCountries = Object.entries(countryData).sort((a, b) => b[1] - a[1]);
//   const mostCommonCountry = sortedCountries[0] ? sortedCountries[0][0] : "Unknown";
//   const secondMostCommonCountry = sortedCountries[1] ? sortedCountries[1][0] : "Unknown";
//   const otherUsers = sortedCountries.slice(2).reduce((sum, [, count]) => sum + count, 0);

//   // Predictive data for future users
//   const futureUserPredictions = [totalUsers, totalUsers + 50, totalUsers + 80, totalUsers + 120];

//   // Chart datasets
//   const barChartData = {
//     labels: Object.keys(ageData),
//     datasets: [
//       {
//         label: "Users by Age Group",
//         data: Object.values(ageData),
//         backgroundColor: "rgba(75, 192, 192, 0.7)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const doughnutChartData = {
//     labels: Object.keys(genderData),
//     datasets: [
//       {
//         label: "Gender Distribution",
//         data: Object.values(genderData),
//         backgroundColor: ["#3498db", "#e74c3c"],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const pieChartData = {
//     labels: Object.keys(countryData),
//     datasets: [
//       {
//         label: "Users by Country",
//         data: Object.values(countryData),
//         backgroundColor: [
//           "#f39c12",
//           "#9b59b6",
//           "#3498db",
//           "#e74c3c",
//           "#2ecc71",
//         ],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const lineChartData = {
//     labels: ["Now", "Next Month", "Next Quarter", "Next Year"],
//     datasets: [
//       {
//         label: "Predicted Users Growth",
//         data: futureUserPredictions,
//         borderColor: "#3498db",
//         backgroundColor: "rgba(52, 152, 219, 0.5)",
//         borderWidth: 2,
//         tension: 0.3,
//       },
//     ],
//   };

//   return (
//     <div className="user-report">
//       <h1 className="user-report-title">Users Report</h1>

//       {/* Summary Section */}
//       <div className="report-summary">
//         <div className="summary-card">
//           <FaUsers className="summary-icon" />
//           <p>Total Users</p>
//           <h3>{totalUsers}</h3>
//         </div>
//         <div className="summary-card">
//           <FaGlobe className="summary-icon" />
//           <p>Most Common Country</p>
//           <h3>{mostCommonCountry}</h3>
//         </div>
//         <div className="summary-card">
//           <FaGlobe className="summary-icon" />
//           <p>Second Common Country</p>
//           <h3>{secondMostCommonCountry}</h3>
//         </div>
//         <div className="summary-card">
//           <FaMars className="summary-icon" />
//           <p>Male Users</p>
//           <h3>{genderData.Male}</h3>
//         </div>
//         <div className="summary-card">
//           <FaVenus className="summary-icon" />
//           <p>Female Users</p>
//           <h3>{genderData.Female}</h3>
//         </div>
//         <div className="summary-card">
//           <FaUsers className="summary-icon" />
//           <p>Other Users</p>
//           <h3>{otherUsers}</h3>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="charts-container">
//         <div className="chart">
//           <h2>Age Group Distribution</h2>
//           <Bar data={barChartData} />
//         </div>

//         <div className="chart">
//           <h2>Gender Distribution</h2>
//           <Doughnut data={doughnutChartData} />
//         </div>

//         <div className="chart">
//           <h2>Users by Country</h2>
//           <Pie data={pieChartData} />
//         </div>

//         <div className="chart">
//           <h2>Future User Growth Prediction</h2>
//           <Line data={lineChartData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserReport;
