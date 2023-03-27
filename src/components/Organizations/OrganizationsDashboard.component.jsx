import React from "react";
import Button from "../Buttons/Button.component";
import { Link } from "react-router-dom";

const OrganizationsDashboard = () => {
  return (
    <>
      <div>
        <h1>Organizations Dashboard</h1>
        <div>
          <Button buttonType={"main"}>Find Organization</Button>
          <Link to="/dashboard/organizations/register">
            <button className="bg-neutral-800 w-56 h-12 m-2 text-purple-400 rounded-md">
              Register new Organization
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrganizationsDashboard;
