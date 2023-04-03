import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {CreationNav} from '../components/CreationNav/CreationNav';

const Dashboard = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-neutral-800">
      <CreationNav />
      <Outlet />
    </div>
  );
};

export default Dashboard;
