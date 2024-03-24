import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Tasks from "./Pages/Tasks";
import './App.css';

const App = () => {
  return (
    <div className="App" >

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
        {/* Redirect any other path to the login page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
