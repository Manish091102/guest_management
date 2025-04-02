import React, { useState } from "react";
import { FaCalendarAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import MyEventList from "./dashboard/MyEventList";
import AllEventList from "./dashboard/AllEventList";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Event Management</h2>
        <ul className="menu">
          <li className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
            <FaCalendarAlt className="icon" /> All Events
          </li>
          <li className={activeTab === "my" ? "active" : ""} onClick={() => setActiveTab("my")}>
            <FaUser className="icon" /> My Events
          </li>
          <li className="logout" onClick={handleLogout}>
            <FaSignOutAlt className="icon" /> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "all" ? <AllEventList /> : <MyEventList />}
      </main>
    </div>
  );
};

export default AdminDashboard;
