import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BranchDelete } from "./components/BranchPanel/BranchDelete";
import { BranchDetail } from "./components/BranchPanel/BranchDetail";
import BranchForm from "./components/BranchPanel/BranchForm";

import { BranchPanel } from "./components/BranchPanel/BranchPanel";
import { BranchUpdate } from "./components/BranchPanel/BranchUpdate";
import StylistTable from "./components/StylistsForm/StylistTable";
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
        <Route path="/dashboard/overview" element={<StylistTable />} />
        <Route path="/dashboard/branches" element={<BranchPanel />} />
        <Route path="/dashboard/branch/create" element={<BranchForm />} />
        <Route path="/dashboard/branch/update/:id" element={<BranchUpdate />} />
        <Route path="/dashboard/branch/:id" element={<BranchDetail />} />
        <Route path="/dashboard/branch/delete/:id" element={<BranchDelete />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
