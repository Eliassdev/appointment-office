import React from 'react';
import { Outlet } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="h-screen w-full bg-slate-700">
      AboutUs
      <Outlet />
    </div>
  );
};

export default AboutUs;
