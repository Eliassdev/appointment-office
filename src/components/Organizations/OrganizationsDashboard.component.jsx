import React, { useState } from "react";
import Button from "../Buttons/Button.component";
import { Link } from "react-router-dom";

const OrganizationsDashboard = () => {
  const [organizationName, setOrganizationName] = useState("");

  const handleFindOrganization = e => {
    e.preventDefault();
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl">Organizations Dashboard</h1>
      <div
        id="organizationsDazhboard_container"
        className="flex flex-col items-center rounded-md border-solid border-2 border-purple-400 w-1/2 h-1/2 m-auto p-8"
      >
        <div className="flex flex-col items-center justify-center h-full w-full">
          <form className="flex flex-col items-center justify-center h-full w-full">
            <input
              type="text"
              value={organizationName}
              onChange={e => setOrganizationName(e.target.value)}
              id="organization_name"
              className="rounded-md border-solid border-2 border-purple-400 w-56 h-12 m-2"
              placeholder=" Nombre de la empresa..."
            />
            <Button
              buttonType={organizationName === "" ? "disabled" : "main"}
              onClick={handleFindOrganization}
              disabled={organizationName === ""}
            >
              Buscar Empresa
            </Button>
            <Link to="/dashboard/organizations/register">
              <Button buttonType={"main"}>Registrar nueva Empresa</Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsDashboard;
