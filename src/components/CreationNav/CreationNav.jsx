import React from "react";
import Button from "../../CustomComponents/Button/Button.component";
import { useNavigate } from "react-router-dom";
const CreationNav = () => {
  const options = [
    { name: "", title: "Vista General", key: "1" },
    { name: "organizations", title: "Empresa", key: "2" },
    { name: "branches", title: "Sucursales", key: "3" },
    { name: "stylists", title: "Estilistas", key: "4" },
    { name: "services", title: "Servicios", key: "5" },
  ];
  const navigate = useNavigate();
  return (
    <div className="fixed left-0 h-screen w-60 bg-neutral-900 pt-8">
      <img
        src="https://res.cloudinary.com/duilsmrmx/image/upload/v1676288009/x1hvcivkowplk4kmfyxn.png"
        alt="logo"
        className="mb-4"
      />
      <h1></h1>
      {options.map((opt) => {
        return (
          <button
            onClick={() => {
              navigate(`/dashboard/${opt.name}`);
            }}
            key={opt.key}
            className="m-2 h-12 w-56 rounded-md bg-neutral-800 text-purple-400"
          >
            {opt.title}
          </button>
        );
      })}
      <Button
        buttonType={"main"}
        onClick={() => {
          navigate("/");
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default CreationNav;
