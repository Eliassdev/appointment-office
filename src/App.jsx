import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//Local Imports
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Register from "./pages/Register";
import OrganizationsDashboard from "./components/Organizations/OrganizationsDashboard.component";
import OrganizationForm from "./components/Organizations/OrganizacionForm.component";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="organizations" element={<OrganizationsDashboard />}>
            <Route path="register" element={<OrganizationForm />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
