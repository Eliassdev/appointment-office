import React, { useState } from "react";
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
      <div className="ml-56  w-full py-8">
        <p className="text-lg text-white">
          Aca veriamos el panel general de informacion
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
