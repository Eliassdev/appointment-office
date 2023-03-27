import React from "react";
import Button from "../Buttons/Button.component";
import { Link } from "react-router-dom";

const OrganizationsDashboard = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl">Organizations Dashboard</h1>
      <div
        id="organizationsDazhboard_container"
        className="flex flex-col items-center rounded-md border-solid border-2 border-purple-400 w-1/2 h-1/2 m-auto p-8"
      >
        <div>
          <form action="submit" className="flex flex-col items-center">
            <input type="text" name="organization_name" id="" />
            <Button buttonType={"main"}>Find Organization</Button>
          </form>
          <Link to="/dashboard/organizations/register">
            <Button buttonType={"main"}>Register new Organization</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsDashboard;
