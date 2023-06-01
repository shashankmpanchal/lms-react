// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
// import Home from "./pages/home";
import Layout, { AuthProvider, RequireAuth } from "./pages/layout/layout";
import Register from "./pages/register/register";
import Login from "./pages/login";
import Dashboard from "./pages/layout/dashboard";
import Leave from "./pages/layout/leave";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/leaves"
            element={
              <RequireAuth>
                <Leave />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
