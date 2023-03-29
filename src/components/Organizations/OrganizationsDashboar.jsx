import React, { useState } from "react";
import Button from "../../CustomComponents/Button/Button.component";
import { Link } from "react-router-dom";

const OrganizationsDashboard = () => {
  const [organizationName, setOrganizationName] = useState("");

  const handleFindOrganization = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-4xl">Organizations Dashboard</h1>
      <div
        id="organizationsDazhboard_container"
        className="m-auto flex h-1/2 w-1/2 flex-col items-center rounded-md border-2 border-solid border-purple-400 p-8"
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <form className="flex h-full w-full flex-col items-center justify-center">
            <input
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              id="organization_name"
              className="m-2 h-12 w-56 rounded-md border-2 border-solid border-purple-400"
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
