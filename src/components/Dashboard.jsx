import React, { useState } from "react";
import { FaBars, FaCalendarAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import MyEventList from "./dashboard/MyEventList";
import AllEventList from "./dashboard/AllEventList";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      {/* Hamburger Menu for Mobile */}
      <FaBars className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="logo">Events Manage</h2>
        <ul className="menu">
          <li className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
            <FaCalendarAlt className="icon" /> <span>All Events</span>
          </li>
          <li className={activeTab === "my" ? "active" : ""} onClick={() => setActiveTab("my")}>
            <FaUser className="icon" /> <span>My Events</span>
          </li>
          <li className="logout" onClick={handleLogout}>
            <FaSignOutAlt className="icon" /> <span>Logout</span>
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
