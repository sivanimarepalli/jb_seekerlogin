import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Update from "./Update"; // Import UpdateProfile component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update-profile" element={<Update />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
