import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import BranchForm from "../components/BranchPanel/BranchForm";
import CreationNav from "../components/CreationNav/CreationNav";
import OrganizationsDashboard from "../components/Organizations/OrganizationsDashboard.component";
import ServicesForm from "../components/ServicesForm/ServicesForm.component";
import StylistsForm from "../components/StylistsForm/StylistsForm.component";
import StylistTable from "../components/StylistsForm/StylistTable";

const Dashboard = () => {
  return (
    <div className="container-xl flex h-screen w-full bg-neutral-700">
      <CreationNav />
      <Outlet/>
    </div>
  );
};

export default Dashboard;
