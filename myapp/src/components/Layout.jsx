// Layout.jsx
import React, { useState } from 'react';
import './layout.css'; // External CSS
import Dashboard from './Dashboard';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <div className={`layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>PackingSys</h3>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="toggle-btn">
            ☰
          </button>
        </div>
        <nav className="menu">
          <a
            href="#"
            className={activeMenu === "Dashboard" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveMenu("Dashboard");
            }}
          >
            Dashboard
          </a>
          <a
            href="#"
            className={activeMenu === "Orders" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveMenu("Orders");
            }}
          >
            Orders
          </a>
          <a
            href="#"
            className={activeMenu === "Inventory" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveMenu("Inventory");
            }}
          >
            Inventory
          </a>
          <a


          
            href="#"
            className={activeMenu === "Reports" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveMenu("Reports");
            }}
          >
            Reports
          </a>
        </nav>
      </aside>

      <div className="main">
        <header className="top-nav">
          <h4>System Navigation</h4>
        </header>

        <main className="content">
          {activeMenu === "Dashboard" && <Dashboard />}
          {activeMenu === "Orders" && <Orders/>}
          {activeMenu === "Inventory" && <div><h2>Inventory Page</h2></div>}
          {activeMenu === "Reports" && <div><h2>Reports Page</h2></div>}
        </main>
      </div>
    </div>
  );
};

export default Layout;
