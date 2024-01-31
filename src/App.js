import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import SchedulePage from "./pages/SchedulePage";
import SettingsPage from "./pages/SettingsPage";
import InvoicePage from "./pages/InvoicePage";
import CalendarPage from "./pages/CalendarPage";
import NotificationPage from "./pages/NotificationPage";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              isAuthenticated ? (
                <Layout>
                  <DashboardPage />
                </Layout>
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/upload"
            element={
              isAuthenticated ? (
                <Layout>
                  <UploadPage />
                </Layout>
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/schedule"
            element={
              isAuthenticated ? (
                <Layout>
                  <SchedulePage />
                </Layout>
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/settings"
            element={
              isAuthenticated ? (
                <Layout>
                  <SettingsPage />
                </Layout>
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/invoice"
            element={
              isAuthenticated ? (
                <Layout>
                  <InvoicePage />
                </Layout>
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/calendar"
            element={
              isAuthenticated ? (
                <Layout>
                  <CalendarPage />
                </Layout>
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/notification"
            element={
              isAuthenticated ? (
                <Layout>
                  <NotificationPage />
                </Layout>
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
