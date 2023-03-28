import React from "react";
import Logo from "../assets/Logo.png";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar/NavBar";

const Home = () => {
  return (
    <div className="w-full h-screen bg-slate-700">
      <NavBar />
      <h1>Soy el Home</h1>
      <Outlet />
    </div>
  );
};

export default Home;
