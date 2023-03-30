import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

export const AboutUs = () => {
  return (
    <div className="h-screen w-full bg-slate-700">
      AboutUs
      <Outlet />
    </div>
  );
};
