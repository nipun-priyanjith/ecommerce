import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons
import ProductCreate from "../../components/AdminComp/ProductCreate";
import ProductRead from "../../components/AdminComp/ProductRead";
import ProductUpdate from "../../components/AdminComp/ProductUpdate";
import ANavBar from "../../components/ANavBar";
import Users from './Users';
import Aregister from '../Auth/Aregister';
import "../../components/css/ap.css";
import AHome from "./AHome";
import UserReport from "../reports/UserReport";

function Product() {
  const [activeComponent, setActiveComponent] = useState("create");
  const [isReportsOpen, setIsReportsOpen] = useState(false); // Toggle for Reports dropdown

  return (
    <>
      <ANavBar />
      <div className="admin-product-page">
        {/* <div className="sidebar"> */}
        <div style={{width: '250px',backgroundColor: '#effbf9',padding: '20px',display: 'flex',flexDirection: 'column',gap: '15px',boxshadow: '2px 0 5px rgba(0, 0, 0, 0.1)'}}>
          <div
            className={`sidebar-item ${activeComponent === "create" ? "active" : ""}`}
            onClick={() => setActiveComponent("create")}
          >
            Create Product
          </div>
          <div
            className={`sidebar-item ${activeComponent === "update" ? "active" : ""}`}
            onClick={() => setActiveComponent("update")}
          >
            Update Product
          </div>
{/* Collapsible Reports Section */}
<div
  className="sidebar-item reports-toggle"
  onClick={() => setIsReportsOpen(!isReportsOpen)}
>
  <span className="reports-text">Reports</span>
  {isReportsOpen ? <FaChevronUp className="icon" /> : <FaChevronDown className="icon" />}
</div>
{isReportsOpen && (
  <div className="reports-dropdown">
    <div
      className="dropdown-item"
      onClick={() => setActiveComponent("sales-report")}
    >
      Sales Report
    </div>
    <div
      className="dropdown-item"
      onClick={() => setActiveComponent("user-report")}
    >
      User Report
    </div>
    <div
      className="dropdown-item"
      onClick={() => setActiveComponent("product-report")}
    >
      Product Report
    </div>
    <div
      className="dropdown-item"
      onClick={() => setActiveComponent("reject-report")}
    >
      Reject Report
    </div>
  </div>
)}

          <div
            className={`sidebar-item ${activeComponent === "read" ? "active" : ""}`}
            onClick={() => setActiveComponent("read")}
          >
            View Products
          </div>

          <div
            className={`sidebar-item ${activeComponent === "Users" ? "active" : ""}`}
            onClick={() => setActiveComponent("Users")}
          >
            View Users
          </div>
          <div
            className={`sidebar-item ${activeComponent === "Aregister" ? "active" : ""}`}
            onClick={() => setActiveComponent("Aregister")}
          >
            New Admin Register
          </div>
        </div>

        <div className="content-area">
          {activeComponent === "create" && <ProductCreate />}
          {activeComponent === "read" && <ProductRead />}
          {activeComponent === "update" && <ProductUpdate />}
          {activeComponent === "Users" && <Users />}
          {activeComponent === "Aregister" && <Aregister />}
          {activeComponent === "sales-report" && <AHome/>}
          {activeComponent === "user-report" && <UserReport/>}
          {activeComponent === "product-report" && <h2>Product Report</h2>}
          {activeComponent === "reject-report" && <h2>Reject Report</h2>}
        </div>
      </div>
    </>
  );
}

export default Product;




// import React, { useState } from "react";
// import ProductCreate from "../../components/AdminComp/ProductCreate";
// import ProductRead from "../../components/AdminComp/ProductRead";
// import ProductUpdate from "../../components/AdminComp/ProductUpdate";
// import ANavBar from "../../components/ANavBar";
// import Users from './Users';
// import Aregister from '../Auth/Aregister';
// import "../../components/css/ap.css";

// function Product() {
//   // State to track which component to show
//   const [activeComponent, setActiveComponent] = useState("create");

//   return (
//     <>
//       <ANavBar />
//       <div className="admin-product-page">
//         <div className="sidebar">
//           <div
//             className={`sidebar-item ${
//               activeComponent === "create" ? "active" : ""
//             }`}
//             onClick={() => setActiveComponent("create")}
//           >
//             Create Product
//           </div>
//           <div
//             className={`sidebar-item ${
//               activeComponent === "update" ? "active" : ""
//             }`}
//             onClick={() => setActiveComponent("update")}
//           >
//             Update Product
//           </div>

//           <div
//             className={`sidebar-item ${
//               activeComponent === "reports" ? "active" : ""
//             }`}
//             onClick={() => setActiveComponent("reports")}
//           >
//             Reports 
//           </div>


//           <div
//             className={`sidebar-item ${
//               activeComponent === "read" ? "active" : ""
//             }`}
//             onClick={() => setActiveComponent("read")}
//           >
//             View Products
//           </div>

//           <div
//             className={`sidebar-item ${
//               activeComponent === "Users" ? "active" : ""
//             }`}
//             onClick={() => setActiveComponent("Users")}
//           >
//             View Users
//           </div>
//           <div
//             className={`sidebar-item ${
//               activeComponent === "Aregister" ? "active" : ""
//             }`}
//             onClick={() => setActiveComponent("Aregister")}
//           >
//             new admin register
//           </div>
//         </div>

//         <div className="content-area">
//           {activeComponent === "create" && <ProductCreate />}
//           {activeComponent === "read" && <ProductRead />}
//           {activeComponent === "update" && <ProductUpdate />}
//           {activeComponent === "Users" && <Users/>}
//           {activeComponent === "Aregister" && <Aregister/>}
//           {activeComponent === "reports" && <Reports/>}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Product;
