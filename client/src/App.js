import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import themes from "./themes";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import DashboardNavbar from "./components/Navbar";
import Home from "./components/home/Home";
import User from "./components/userPage/User";
import Callback from "./components/Callback";
import FlagPage from "./components/flagPage/FlagPage";

function App() {
  return (
    <div>
      <ThemeProvider theme={themes}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/server" element={<Dashboard />} />
          <Route path="/server/:userID" element={<User />} />
          <Route path="/server/flags" element={<FlagPage />} />
          <Route path="/contact" element={<Home />} />
          {/* <Route path="/logout" element={<Home />} /> */}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
