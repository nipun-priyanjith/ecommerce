import React, { useState } from "react";
import "./css/AccountSettings.css";

function AccountSettings() {
  const [deleteInput, setDeleteInput] = useState("");
  const [activeSection, setActiveSection] = useState("edit"); // Track which section is active

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="account-settings-container">
      <div className="account-actions">
        <button 
          className={`action-button ${activeSection === "edit" ? "active" : ""}`}
          onClick={() => toggleSection("edit")}
        >
          Edit My Account
        </button>
        <button 
          className={`action-button ${activeSection === "delete" ? "active" : ""}`}
          onClick={() => toggleSection("delete")}
        >
          Delete Account
        </button>
      </div>

      {/* Edit Account Section */}
      {activeSection === "edit" && (
        <div className="edit-account-section">
          <h2>Edit My Account</h2>
          <form className="edit-form">
            <label>Email</label>
            <input type="email" defaultValue="a@gmail.com" />
            <label>Bio</label>
            <textarea defaultValue="hbfkSVbkdvbksv" rows="3" />
            <label>Age</label>
            <input type="number" defaultValue="34" />
            <label>Gender</label>
            <select defaultValue="Other">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label>Country</label>
            <input type="text" defaultValue="Sri Lanka" />
            <label>Occupation</label>
            <input type="text" defaultValue="kmdmcdc" />
            <label>Hobbies</label>
            <input type="text" defaultValue="hiking" />
            <label>Favorite Categories</label>
            <input type="text" defaultValue="Furniture" />
            <label>City</label>
            <input type="text" defaultValue="Austin" />
            <label>ZIP</label>
            <input type="text" defaultValue="688001" />
            <button type="submit" className="save-button">Save Changes</button>
          </form>
        </div>
      )}

      {/* Delete Account Section */}
      {activeSection === "delete" && (
        <div className="delete-account-section">
          <h2>Delete Account</h2>
          <p className="delete-warning">
            If you delete, your account will be removed after 24 hours. After that, it cannot be retrieved. 
            All your orders and database information will be permanently deleted.
          </p>
          <p className="delete-instruction">
            To confirm, enter "I need to delete my account" below and click "YES."
          </p>
          <input
            type="text"
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
            className="delete-input"
            placeholder="Enter confirmation text"
          />
          <button
            className="confirm-delete-button"
            disabled={deleteInput !== "I need to delete my account"}
          >
            YES
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountSettings;
