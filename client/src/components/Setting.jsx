import React, { useState } from "react";
import "./css/setting.css";
import Help from "./Help";
import NavBar from "./NavBar";
import PrivacyPolicy from "./PrivacyPolicy";
import AccountSettings from "./AccountSettings";
import Bottom from "./Buttom";

function Setting() {
  const [selectedOption, setSelectedOption] = useState("Account Settings");

  const renderContent = () => {
    switch (selectedOption) {
      case "Privacy Policy":
        return <PrivacyPolicy/>;
      case "Account Settings":
        return (<AccountSettings/>);
      case "Contact Us":
        return (   <Help/>     );
      default:
        return null;
    }
  };

  return (<><NavBar/><br/><br/>
    <div className="settings-dashboard">
      <div className="sidebar">
        <ul>
        <li
            className={selectedOption === "Account Settings" ? "active" : ""}
            onClick={() => setSelectedOption("Account Settings")}
          >
            Account Settings
          </li>
          <li
            className={selectedOption === "Privacy Policy" ? "active" : ""}
            onClick={() => setSelectedOption("Privacy Policy")}
          >
            Privacy Policy
          </li>

          <li
            className={selectedOption === "Contact Us" ? "active" : ""}
            onClick={() => setSelectedOption("Contact Us")}
          >
            Contact Us
          </li>
        </ul>
      </div>
      <div className="content">{renderContent()}</div>
    </div> <br/><br/><br/><br/>  <br/><br/><br/><br/><br/><br/><br/><br/><Bottom/></>
  );
}

export default Setting;
