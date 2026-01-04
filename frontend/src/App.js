import { useState } from "react";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Courses from "./components/Courses";
import "./App.css";

function App() {
  const [page, setPage] = useState("register");

  return (
    <>
      <Navbar setPage={setPage} />
      <div className="container">
        {page === "register" && <Register />}
        {page === "login" && <Login />}
        {page === "courses" && <Courses />}
      </div>
    </>
  );
}

export default App;
