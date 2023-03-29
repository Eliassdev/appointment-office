import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Local Imports
import './index.css';

//Pages Imports
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { Login } from './pages/Login';
import { AboutUs } from './pages/AboutUs';

// Organizations Imports
import OrganizationsDashboard from './components/Organizations/OrganizationsDashboar';
import OrganizationForm from './components/Organizations/OrganizacionForm';

// Branch Imports
import { BranchDelete } from './components/BranchPanel/BranchDelete';
import { BranchDetail } from './components/BranchPanel/BranchDetail';
import BranchForm from './components/BranchPanel/BranchForm';
import { BranchPanel } from './components/BranchPanel/BranchPanel';
import { BranchUpdate } from './components/BranchPanel/BranchUpdate';

// Stylist Imports
import StylistTable from './components/StylistsForm/StylistTable';

//Services Imports
import ServicesForm from './components/ServicesForm/ServicesForm.component';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/register" element={<OrganizationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          {/*Organizations*/}
          <Route
            path="/dashboard/organizations"
            element={<OrganizationsDashboard />}
          />
          <Route
            path="/dashboard/organizations/update/:id"
            element={<OrganizationsDashboard />}
          />
          <Route
            path="/dashboard/organizations/delete/:id"
            element={<OrganizationsDashboard />}
          />
          {/*Branches*/}
          <Route path="/dashboard/branches" element={<BranchPanel />} />
          <Route path="/dashboard/branch/create" element={<BranchForm />} />
          <Route
            path="/dashboard/branch/update/:id"
            element={<BranchUpdate />}
          />
          <Route path="/dashboard/branch/:id" element={<BranchDetail />} />
          <Route
            path="/dashboard/branch/delete/:id"
            element={<BranchDelete />}
          />
          {/*Stylists*/}
          <Route path="/dashboard/stylists" element={<StylistTable />} />
          <Route path="/dashboard/stylist/create" element={<StylistTable />} />
          <Route
            path="/dashboard/stylist/update/:id"
            element={<StylistTable />}
          />
          <Route path="/dashboard/stylist/:id" element={<StylistTable />} />
          <Route
            path="/dashboard/stylist/delete/:id"
            element={<StylistTable />}
          />
          {/*Services*/}
          <Route path="/dashboard/services" element={<ServicesForm />} />
          <Route path="/dashboard/services/create" element={<ServicesForm />} />
          <Route
            path="/dashboard/services/update/:id"
            element={<ServicesForm />}
          />
          <Route
            path="/dashboard/services/delete/:id"
            element={<ServicesForm />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
