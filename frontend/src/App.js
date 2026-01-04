import { useState } from "react";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Courses from "./components/Courses";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("register");

  return (
    <>
      <Navbar setPage={setPage} />
      <div className="container">
        {page === "register" && <Register />}
        {page === "login" && <Login setPage={setPage} />} {/* ✅ pass setPage */}
        {page === "courses" && <Courses />}
        {page === "Dashboard" && <Dashboard />}
        
      </div>
    </>
  );
}

export default App;
